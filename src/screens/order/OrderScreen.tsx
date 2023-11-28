import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
import {OptionSection} from '../../components/order';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useAppSelector} from '../../store/hooks';

interface Props {
  navigation: HomeStackNavigationScreenProps<'OrderScreen'>;
}

export default function OrderScreen({navigation}: Props) {
  const user = useAppSelector(state => state.authState.user);

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

  // Add or delete product in favorites
  const clickFavorite = useCallback(() => {}, []);

  // Add order to cart
  const addCart = useCallback(() => {}, []);

  const productOptions = useMemo(
    () => (
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <ImageBlurLoading style={styles.image} source={{uri: product.image}} />
        <OptionSection name={product.name} type={product.type} />
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
              {t('addCart')}
            </TextButton>
          )}
        </Translation>
        <Translation>
          {t => (
            <ContainedButton
              style={styles.buyBtn}
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
      paddingVertical: MyDimensions.paddingLarge,
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
