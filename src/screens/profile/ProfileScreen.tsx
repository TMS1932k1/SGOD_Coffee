import {View, StatusBar, StyleSheet} from 'react-native';
import {HomeStackNavigationScreenProps} from '../../types/stack';
import {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {HeaderRankSession, InfoSection} from '../../components/profile';
import {ConfirmModal, TextButton} from '../../components/common';
import {MyDimensions} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import {Translation} from 'react-i18next';
import {useAppDispatch} from '../../store/hooks';
import {logoutAuth} from '../../store/auth/authSlice';
import {removeAllBills} from '../../store/bill/billsSlice';
import {removeAllFavorites} from '../../store/favorite/favoriteSlice';

interface Props {
  navigation: HomeStackNavigationScreenProps<'ProfileScreen'>;
}

export default function ProfileScreen({navigation}: Props) {
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: {
        backgroundColor: colors.primary,
      },
    });
  }, [navigation, colors]);

  const onLogOut = useCallback(() => {
    dispatch(removeAllBills());
    dispatch(removeAllFavorites());
    dispatch(logoutAuth());
    navigation.pop();
  }, [navigation]);

  const onShowModal = useCallback(() => {
    setVisible(true);
  }, []);

  const onHideModal = useCallback(() => {
    setVisible(false);
  }, []);

  const statusBar = useMemo(
    () => (
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    ),
    [colors],
  );

  const view = useMemo(
    () => (
      <ScrollView
        style={styles.infoSection}
        showsVerticalScrollIndicator={false}>
        <HeaderRankSession />
        <InfoSection />
      </ScrollView>
    ),
    [styles],
  );

  return (
    <View style={styles.container}>
      {statusBar}
      {view}
      <Translation>
        {t => (
          <TextButton style={styles.logout} onPress={onShowModal}>
            {t('logout')}
          </TextButton>
        )}
      </Translation>
      <Translation>
        {t => (
          <ConfirmModal
            visible={visible}
            title={t('confirm')}
            content={t('confirmTitle')}
            onConfirm={onLogOut}
            onHideModal={onHideModal}
          />
        )}
      </Translation>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      marginBottom: MyDimensions.paddingLarge,
    },
    infoSection: {
      flex: 1,
    },
    logout: {
      padding: MyDimensions.paddingSmall,
    },
  });
