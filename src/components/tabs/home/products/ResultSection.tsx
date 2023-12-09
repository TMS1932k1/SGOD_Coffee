import {useCallback, useMemo} from 'react';
import {Translation} from 'react-i18next';
import {View, ViewStyle, StyleProp, StyleSheet} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from '../../../common';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {useAppSelector} from '../../../../store/hooks';
import {MyDimensions} from '../../../../constants';
import ProductsList from './ProductsList';
import {Product} from '../../../../types/product';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../../../types/stack';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function ResultSection({style}: Props) {
  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'HomeTabNavigator'>>();

  const searchText = useAppSelector(state => state.searchState.searchText);

  const products = useAppSelector(state => state.searchState.products);

  const isLoading = useAppSelector(state => state.searchState.isLoading);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const onCLickItem = useCallback(
    (product: Product) => {
      navigation.navigate('OrderScreen', {product: product});
    },
    [navigation],
  );

  const title = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText style={styles.title} variant="heading2" numberOfLines={1}>
            {t('result', {searchText: searchText})}
          </CustomText>
        )}
      </Translation>
    ),
    [styles, searchText],
  );

  const loadingView = useMemo(
    () => (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    ),
    [style, styles],
  );

  return (
    <View style={[style]}>
      {title}
      {isLoading ? (
        loadingView
      ) : (
        <ProductsList
          style={styles.list}
          products={products}
          onPress={onCLickItem}
        />
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    title: {
      color: colors.onBackground,
      overflow: 'hidden',
      marginHorizontal: MyDimensions.paddingLarge,
    },
    list: {
      marginTop: MyDimensions.paddingMedium,
    },
    loading: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: MyDimensions.paddingLarge,
    },
  });
