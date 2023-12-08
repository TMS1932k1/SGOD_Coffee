import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {MyDimensions} from '../../../constants';
import {useCallback} from 'react';
import {ProductItem} from '../home';
import {Product} from '../../../types/product';
import {useAppSelector} from '../../../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../../types/stack';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function ListFavoritesSection({style}: Props) {
  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'HomeTabNavigator'>>();

  const favorites = useAppSelector(state => state.favoriteState.favorites);

  const onPress = useCallback(
    (product: Product) => {
      navigation.navigate('OrderScreen', {product: product});
    },
    [navigation],
  );

  return (
    <View style={[styles.container, style]}>
      {favorites.map(item => (
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
