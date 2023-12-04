import {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  NativeScrollEvent,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  CategoriesSection,
  ProductsCategorySection,
  HomeHeaderSection,
  ResultSection,
} from '../../components/tabs/home';
import {MyDimensions} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {postMoreProductsWithCategory} from '../../store/home/productsCategorySlice';
import {postMoreProductsWithSearch} from '../../store/home/searchSlice';

export default function HomeScreen() {
  const fetchingProductsCategoryPromise = useRef<any>();

  const dispatch = useAppDispatch();

  const searchText = useAppSelector(state => state.searchState.searchText);

  // Page for product category
  const pageProductCategory = useAppSelector(
    state => state.productsCategoryState.page,
  );
  const totalProductCategory = useAppSelector(
    state => state.productsCategoryState.totalPage,
  );
  const isLoadingCategory = useAppSelector(
    state => state.productsCategoryState.isLoading,
  );

  // Page for product category
  const pageProductSearch = useAppSelector(state => state.searchState.page);
  const totalProductSearch = useAppSelector(
    state => state.searchState.totalPage,
  );
  const isLoadingSearch = useAppSelector(state => state.searchState.isLoading);

  const categoryId = useAppSelector(state => state.categoriesState.currentId);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // Check position is endpoint of endpoint
  const isEndScrollView = useCallback(
    (nativeEvent: NativeScrollEvent): boolean => {
      const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
      return layoutMeasurement.height + contentOffset.y >= contentSize.height;
    },
    [searchText],
  );

  // Load more with category id
  const loadMoreProductCategory = useCallback(() => {
    if (categoryId) {
      fetchingProductsCategoryPromise.current?.abort();
      fetchingProductsCategoryPromise.current = dispatch(
        postMoreProductsWithCategory({
          idCategory: categoryId,
          page: pageProductCategory + 1,
        }),
      );
    }
  }, [categoryId, pageProductCategory]);

  // Load more with search text
  const loadMoreProductSearch = useCallback(() => {
    if (searchText) {
      fetchingProductsCategoryPromise.current?.abort();
      fetchingProductsCategoryPromise.current = dispatch(
        postMoreProductsWithSearch({
          search: searchText,
          page: pageProductSearch + 1,
        }),
      );
    }
  }, [searchText, pageProductSearch]);

  const statusBar = useMemo(
    () => (
      <StatusBar barStyle="light-content" backgroundColor={colors.tertiary} />
    ),
    [colors],
  );

  const notSearchView = useMemo(
    () => (
      <View>
        <CategoriesSection
          style={styles.sectionContainer}
          refFetching={fetchingProductsCategoryPromise}
        />
        <ProductsCategorySection style={styles.productsCategory} />
      </View>
    ),
    [styles, fetchingProductsCategoryPromise],
  );

  const homeheaderView = useMemo(() => <HomeHeaderSection />, []);

  const resultView = useMemo(
    () => <ResultSection style={styles.resultSection} />,
    [styles],
  );

  return (
    <View style={styles.container}>
      {statusBar}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (isEndScrollView(nativeEvent)) {
            if (
              searchText &&
              !isLoadingSearch &&
              pageProductSearch < totalProductSearch
            ) {
              loadMoreProductSearch();
            } else if (
              !isLoadingCategory &&
              pageProductCategory < totalProductCategory
            ) {
              loadMoreProductCategory();
            }
          }
        }}>
        {homeheaderView}
        {searchText ? resultView : notSearchView}
      </ScrollView>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: 110,
    },
    sectionContainer: {
      marginTop: MyDimensions.paddingLarge,
      marginLeft: MyDimensions.paddingLarge,
    },
    productsCategory: {
      paddingHorizontal: MyDimensions.paddingLarge,
    },
    resultSection: {
      marginTop: MyDimensions.paddingLarge,
    },
    activityLoading: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      marginTop: MyDimensions.paddingMedium,
    },
  });
