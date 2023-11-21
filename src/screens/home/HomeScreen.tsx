import {useMemo} from 'react';
import {StatusBar, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {HomeHeaderSection} from '../../components/tabs/home';

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
    </ScrollView>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
