import {useMemo} from 'react';
import {StatusBar, StyleSheet, ScrollView, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  CategoriesSection,
  CoffeeCategorySection,
  HomeHeaderSection,
  RecommendSection,
} from '../../components/tabs/home';
import {MyDimensions} from '../../constants';

export default function HomeScreen() {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const statusBar = useMemo(
    () => (
      <StatusBar barStyle="light-content" backgroundColor={colors.tertiary} />
    ),
    [colors],
  );

  return (
    <ScrollView style={styles.container}>
      {statusBar}
      <HomeHeaderSection />
      <CategoriesSection style={styles.sectionContainer} />
      <CoffeeCategorySection style={styles.coffeesCategory} />
      <RecommendSection style={styles.sectionContainer} />
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
  });
