import {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {HeaderSection, ListCartSection} from '../../components/tabs/cart';
import {useAppSelector} from '../../store/hooks';
import {MyDimensions} from '../../constants';

export default function CartScreen() {
  const isLoading = useAppSelector(state => state.cartState.isLoading);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const loadingView = useMemo(
    () => (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <HeaderSection />
      {isLoading ? loadingView : <ListCartSection />}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: 160 + MyDimensions.navbarHeight,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
