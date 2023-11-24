import {useCallback, useMemo, useRef} from 'react';
import {StatusBar, StyleSheet, ScrollView, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  CategoriesSection,
  CoffeeCategorySection,
  HomeHeaderSection,
  ResultSection,
  SpecialSection,
} from '../../components/tabs/home';
import {MyDimensions} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getLoadMoreSearchCoffees} from '../../store/home/searchSlice';

export default function HomeScreen() {
  const fetchingCoffeesCategoryPromise = useRef<any>();

  const dispath = useAppDispatch();

  const coffees = useAppSelector(state => state.searchState.coffees);
  const totals = useAppSelector(state => state.searchState.totals);
  const page = useAppSelector(state => state.searchState.page);
  const isLoading = useAppSelector(state => state.searchState.isLoading);

  const searchText = useAppSelector(state => state.searchState.searchText);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // When user scroll to endpoint with fetch api get more with page need load
  const loadMore = useCallback(() => {
    console.log(page + 1);

    dispath(getLoadMoreSearchCoffees(page + 1));
  }, [page]);

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
          refFetching={fetchingCoffeesCategoryPromise}
        />
        <CoffeeCategorySection
          style={styles.coffeesCategory}
          refFetching={fetchingCoffeesCategoryPromise}
        />
        <SpecialSection
          style={[styles.sectionContainer, styles.coffeeSpecial]}
        />
      </View>
    ),
    [styles, fetchingCoffeesCategoryPromise],
  );

  const homeheaderView = useMemo(() => <HomeHeaderSection />, []);

  const resultView = useMemo(
    () => <ResultSection style={styles.resultSection} />,
    [styles],
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {statusBar}
        {homeheaderView}
        {searchText ? resultView : notSearchView}
        {!isLoading && searchText && coffees.length < totals && (
          <View style={styles.activityLoading}>
            <ActivityIndicator size={'small'} />
          </View>
        )}
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
    coffeesCategory: {
      marginTop: MyDimensions.paddingMedium,
      marginLeft: MyDimensions.paddingLarge,
    },
    coffeeSpecial: {
      marginRight: MyDimensions.paddingLarge,
    },
    resultSection: {
      marginTop: MyDimensions.paddingLarge,
      marginHorizontal: MyDimensions.paddingLarge,
    },
    activityLoading: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      marginTop: MyDimensions.paddingMedium,
    },
  });
