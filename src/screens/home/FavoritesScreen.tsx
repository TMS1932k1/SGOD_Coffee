import {useMemo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useAppSelector} from '../../store/hooks';
import {
  HeaderSection,
  ListFavoritesSection,
} from '../../components/tabs/favorites';
import {MyDimensions} from '../../constants';
import {Translation} from 'react-i18next';
import {CustomText} from '../../components/common';

export default function Favoritescreen() {
  const isLoading = useAppSelector(state => state.favoriteState.isLoading);
  const isLoadingUser = useAppSelector(state => state.authState.isLoading);
  const user = useAppSelector(state => state.authState.user);

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

  const notUserView = useMemo(
    () => (
      <View style={styles.centerContainer}>
        <Translation>
          {t => (
            <CustomText style={styles.textNote} variant="body1">
              {t('notUser')}
            </CustomText>
          )}
        </Translation>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <HeaderSection />
      {isLoadingUser || isLoading ? (
        loadingView
      ) : user ? (
        <ScrollView style={styles.scrollView}>
          <ListFavoritesSection />
        </ScrollView>
      ) : (
        notUserView
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: 110 + MyDimensions.navbarHeight,
    },
    scrollView: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textNote: {
      color: colors.outline,
    },
  });
