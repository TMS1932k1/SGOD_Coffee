import {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {HeaderSection, ListBillsSection} from '../../components/tabs/bills';
import {useAppSelector} from '../../store/hooks';
import {CustomText} from '../../components/common';
import {Translation} from 'react-i18next';

export default function BillsScreen() {
  const isLoading = useAppSelector(state => state.billsState.isLoading);
  const user = useAppSelector(state => state.authState.user);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const loadingView = useMemo(
    () => (
      <View style={styles.centerContainer}>
        <ActivityIndicator />
      </View>
    ),
    [],
  );

  const contentView = useMemo(
    () => (isLoading ? loadingView : <ListBillsSection />),
    [isLoading],
  );

  const notUserView = useMemo(
    () => (
      <View style={styles.centerContainer}>
        <Translation>
          {t => (
            <CustomText style={styles.textNote} variant="body1">
              {t('billNotUser')}
            </CustomText>
          )}
        </Translation>
      </View>
    ),
    [],
  );

  const headerView = useMemo(() => <HeaderSection />, []);

  return (
    <View style={styles.container}>
      {headerView}
      {!user && !isLoading ? notUserView : contentView}
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
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textNote: {
      color: colors.outline,
    },
  });
