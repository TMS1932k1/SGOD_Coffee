import {useMemo, useRef} from 'react';
import {StatusBar, StyleSheet, ScrollView, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  CategoriesSection,
  ProductsCategorySection,
  HomeHeaderSection,
  ResultSection,
} from '../../components/tabs/home';
import {MyDimensions} from '../../constants';
import {useAppSelector} from '../../store/hooks';

export default function HomeScreen() {
  const fetchingCoffeesCategoryPromise = useRef<any>();

  const searchText = useAppSelector(state => state.searchState.searchText);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

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
        <ProductsCategorySection style={styles.productsCategory} />
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
