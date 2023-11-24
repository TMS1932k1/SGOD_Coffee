import {ViewStyle, StyleProp, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../../../store/hooks';
import {ActivityIndicator} from 'react-native-paper';
import {MyDimensions} from '../../../../constants';
import ProductsList from './ProductsList';
import {useMemo} from 'react';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function ProductsCategorySection({style}: Props) {
  const products = useAppSelector(
    state => state.productsCategoryState.products,
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

  return <ProductsList products={products} style={style} />;
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: MyDimensions.paddingLarge,
  },
});
