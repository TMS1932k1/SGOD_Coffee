import {ViewStyle, StyleProp, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../../../store/hooks';
import {ActivityIndicator} from 'react-native-paper';
import {MyDimensions} from '../../../../constants';
import ProductsList from './ProductsList';
import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../../../types/stack';
import {Product} from '../../../../types/product';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function ProductsCategorySection({style}: Props) {
  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'HomeTabNavigator'>>();

  const products = useAppSelector(
    state => state.productsCategoryState.products,
  );

  const onCLickItem = useCallback(
    (product: Product) => {
      navigation.navigate('OrderScreen', {product: product});
    },
    [navigation],
  );

  const isLoading = useAppSelector(
    state => state.productsCategoryState.isLoading,
  );

  const loadingView = useMemo(
    () => (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    ),
    [style, styles],
  );

  if (isLoading) {
    return loadingView;
  }

  return (
    <ProductsList products={products} style={style} onPress={onCLickItem} />
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: MyDimensions.paddingLarge,
  },
});
