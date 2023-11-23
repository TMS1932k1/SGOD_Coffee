import {ViewStyle, StyleProp, StyleSheet, FlatList, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import CoffeeItem from './CoffeeItem';
import {ActivityIndicator} from 'react-native-paper';
import {MutableRefObject, useCallback, useMemo} from 'react';
import {getLoadMoreCoffees} from '../../../../store/home/coffeesCategorySlice';
import {MyDimensions} from '../../../../constants';

interface Props {
  style?: StyleProp<ViewStyle>;
  refFetching?: MutableRefObject<any>;
}

export default function CoffeeCategorySection({style, refFetching}: Props) {
  const dispatch = useAppDispatch();

  const coffees = useAppSelector(state => state.coffeesCategoryState.coffees);
  const isLoading = useAppSelector(
    state => state.coffeesCategoryState.isLoading,
  );
  const totals = useAppSelector(state => state.coffeesCategoryState.totals);
  const page = useAppSelector(state => state.coffeesCategoryState.page);
  const currentIdCategory = useAppSelector(
    state => state.categoriesState.currentId,
  );

  const loadingView = useMemo(
    () => (
      <View style={[style, styles.container, styles.loading]}>
        <ActivityIndicator />
      </View>
    ),
    [style, styles],
  );

  // When user scroll flatlist endpoint with fetch api get more with category's id and page need load
  const loadMore = useCallback(() => {
    if (coffees.length < totals && currentIdCategory) {
      if (refFetching) {
        refFetching.current?.abort();
        refFetching.current = dispatch(
          getLoadMoreCoffees({idCategory: currentIdCategory, page: page + 1}),
        );
      } else {
        dispatch(
          getLoadMoreCoffees({idCategory: currentIdCategory, page: page + 1}),
        );
      }
    }
  }, [totals, coffees, currentIdCategory]);

  if (isLoading) {
    return loadingView;
  }

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={[styles.container, style]}
      data={coffees}
      keyExtractor={item => item.id}
      onEndReached={loadMore}
      ListFooterComponent={() =>
        coffees.length < totals && (
          <View style={styles.activityLoading}>
            <ActivityIndicator size={'small'} />
          </View>
        )
      }
      renderItem={({item, index}) => <CoffeeItem coffee={item} />}></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 239,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityLoading: {
    height: '100%',
    marginHorizontal: MyDimensions.paddingMedium,
    justifyContent: 'center',
  },
});
