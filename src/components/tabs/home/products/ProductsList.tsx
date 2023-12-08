import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {MyDimensions} from '../../../../constants';
import {Product} from '../../../../types/product';
import ProductItem from './ProductItem';

interface Props {
  style?: StyleProp<ViewStyle>;
  products: Product[];
  onPress?: (product: Product) => void;
}

export default function ProductsList({products, style, onPress}: Props) {
  return (
    <View style={[styles.container, style]}>
      {products.map(item => (
        <ProductItem
          key={item.id}
          product={item}
          style={styles.item}
          onPress={onPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: MyDimensions.paddingMedium,
  },
  item: {
    marginBottom: MyDimensions.paddingMedium,
    marginHorizontal: MyDimensions.paddingSmall,
  },
});
