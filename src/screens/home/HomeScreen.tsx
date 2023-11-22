import {useMemo} from 'react';
import {StatusBar, StyleSheet, ScrollView, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  CategoriesSection,
  CoffeeCategorySection,
  HomeHeaderSection,
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
      <HomeHeaderSection />
      <CategoriesSection style={styles.categories} />
      <CoffeeCategorySection style={styles.coffees} />
    </ScrollView>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    categories: {
      marginTop: MyDimensions.paddingLarge,
      marginLeft: MyDimensions.paddingLarge,
    },
    coffees: {
      marginTop: MyDimensions.paddingMedium,
      marginHorizontal: MyDimensions.paddingLarge,
    },
  });
