import {useMemo, useRef} from 'react';
import {StatusBar, StyleSheet, ScrollView, Animated} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  CategoriesSection,
  CoffeeCategorySection,
  HomeHeaderSection,
  SpecialSection,
} from '../../components/tabs/home';
import {MyDimensions} from '../../constants';

export default function HomeScreen() {
  const fetchingCoffeesCategoryPromise = useRef<any>();

  const scrollOffSetY = useRef(new Animated.Value(0)).current;

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const statusBar = useMemo(
    () => (
      <StatusBar barStyle="light-content" backgroundColor={colors.tertiary} />
    ),
    [colors],
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {statusBar}
      <HomeHeaderSection />
      <CategoriesSection
        style={styles.sectionContainer}
        refFetching={fetchingCoffeesCategoryPromise}
      />
      <CoffeeCategorySection
        style={styles.coffeesCategory}
        refFetching={fetchingCoffeesCategoryPromise}
      />
      <SpecialSection style={[styles.sectionContainer, styles.coffeeSpecial]} />
    </ScrollView>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      marginBottom: 130,
    },
  });
