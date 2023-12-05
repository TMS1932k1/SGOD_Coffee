import {View, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import {
  HomeStackNavigationScreenProps,
  HomeStackRouteScreenProps,
} from '../../types/stack';
import {useCallback, useLayoutEffect, useMemo} from 'react';
import {
  ContainedButton,
  CustomStatusBar,
  TextButton,
} from '../../components/common';
import {IconButton, useTheme} from 'react-native-paper';
import {MyDimensions} from '../../constants';
import {Translation, useTranslation} from 'react-i18next';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {useRoute} from '@react-navigation/native';
import {OptionSection, SummarySection} from '../../components/order';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setInitOrder} from '../../store/order/orderSlice';
import {addOrder} from '../../store/cart/cartSlice';
import {Order} from '../../types/order';

interface Props {
  navigation: HomeStackNavigationScreenProps<'OrderScreen'>;
}

export default function OrderScreen({navigation}: Props) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.authState.user);
  const order = useAppSelector(state => state.orderState.order);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const {t} = useTranslation();

  const route = useRoute<HomeStackRouteScreenProps<'OrderScreen'>>();

  const product = useMemo(() => route.params.product, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('order'),
      headerTitleAlign: 'center',
      headerRight: () => (
        <IconButton
          icon={'cards-heart-outline'}
          size={MyDimensions.iconLarge}
          onPress={clickFavorite}
        />
      ),
    });
  }, [navigation, t]);

  // Set init order
  useLayoutEffect(() => {
    dispatch(setInitOrder(product));
  }, [product]);

  // Add or delete product in favorites
  const clickFavorite = useCallback(() => {}, []);

  // Navigate to [PayScreen]
  const buyNow = useCallback(() => {
    navigation.navigate('ConfirmScreen', {
      orders: [{...order, id: Date.now().toString()} as Order],
    });
  }, [order]);

  // Add order to cart
  const addCart = useCallback(() => {
    if (order) dispatch(addOrder({...order, id: Date.now().toString()}));
  }, [order]);

  const productOptions = useMemo(
    () => (
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <ImageBlurLoading style={styles.image} source={{uri: product.image}} />
        <OptionSection name={product.name} type={product.type} />
        <SummarySection />
      </ScrollView>
    ),
    [product],
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <CustomStatusBar />
      {productOptions}
      <View style={styles.submitContainer}>
        <Translation>
          {t => (
            <TextButton style={styles.addCartContainer} onPress={addCart}>
              {t('addList')}
            </TextButton>
          )}
        </Translation>
        <Translation>
          {t => (
            <ContainedButton
              style={styles.buyBtn}
              onPress={buyNow}
              disabled={user ? false : true}>
              {t('buyNow')}
            </ContainedButton>
          )}
        </Translation>
      </View>
    </KeyboardAvoidingView>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingVertical: MyDimensions.paddingMedium,
    },
    scrollContainer: {
      flex: 1,
    },
    submitContainer: {
      flexDirection: 'row',
      paddingTop: MyDimensions.paddingMedium,
      paddingBottom: MyDimensions.paddingLarge,
    },
    buyBtn: {
      flex: 2,
    },
    addCartContainer: {
      flex: 1,
      justifyContent: 'center',
      marginRight: MyDimensions.paddingLarge,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: MyDimensions.borderRadiusMedium,
    },
  });
