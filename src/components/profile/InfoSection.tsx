import {useCallback, useMemo} from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import {Icon, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {CustomText} from '../common';
import {Translation} from 'react-i18next';
import {useAppSelector} from '../../store/hooks';
import {getFullAddressString} from '../../utils/getFormat';
import {getRankTitle} from '../../utils/rankUser';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../types/stack';

export default function InfoSection() {
  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'ProfileScreen'>>();

  const user = useAppSelector(state => state.authState.user);
  const bills = useAppSelector(state => state.billsState.bills);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const onEditProfile = useCallback(() => {
    navigation.navigate('EditProfileScreen', {user: user!});
  }, [navigation]);

  const detailRowView = useCallback(
    (title: String, priceAdd: string) => {
      return (
        <View style={styles.detailRow}>
          <CustomText style={styles.textColor} variant="body1">
            {`${title}:`}
          </CustomText>
          <CustomText style={styles.textColor} variant="body1">
            {priceAdd}
          </CustomText>
        </View>
      );
    },
    [styles],
  );

  return (
    <Translation>
      {t => (
        <View style={styles.container}>
          <View style={styles.section}>
            <CustomText variant="subheading2" style={styles.sectionText}>
              {t('profile')}
            </CustomText>
            <Pressable onPress={onEditProfile}>
              <Icon
                source={'account-edit'}
                size={MyDimensions.iconMedium}
                color={colors.primary}
              />
            </Pressable>
          </View>
          {detailRowView(t('placeholderUsername'), user!.name)}
          {detailRowView(t('placeholderEmail'), user!.email)}
          {detailRowView(t('placeholderPhone'), user!.phone)}
          {!user!.location && (
            <View style={styles.columnContainer}>
              <CustomText style={styles.textColor} variant="body1">
                {t('address')}:
              </CustomText>
              <View style={styles.addAddressContainer}>
                <Icon
                  source={'map'}
                  size={MyDimensions.iconMedium}
                  color={colors.primary}
                />
                <CustomText
                  variant="body1"
                  style={[styles.textColor, styles.addressText]}>
                  {getFullAddressString(user!.location!)}
                </CustomText>
              </View>
            </View>
          )}
          <View style={styles.section}>
            <CustomText variant="subheading2" style={styles.sectionText}>
              {t('member')}
            </CustomText>
          </View>
          {detailRowView(t('memberPoint'), t('point', {point: user!.point}))}
          {detailRowView(
            t('rank'),
            t(`${getRankTitle(user!.point)}`) ?? t('emptyRank'),
          )}
          {detailRowView(
            t('countBillTitle'),
            t('countBill', {count: bills.length}),
          )}
          <View style={styles.columnContainer}>
            <CustomText style={styles.textColor} variant="body1">
              {t('qr')}:
            </CustomText>
            <View style={styles.qrContainer}>
              <Image
                source={require('../../assets/images/qr.jpg')}
                style={styles.qrImage}
              />
            </View>
          </View>
        </View>
      )}
    </Translation>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingMedium,
    },
    section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      paddingBottom: 2,
      borderColor: colors.outline,
      marginTop: MyDimensions.paddingLarge,
    },
    sectionText: {
      color: colors.outline,
    },
    detailRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: MyDimensions.paddingMedium,
      alignItems: 'center',
    },
    textColor: {
      color: colors.onBackground,
    },
    columnContainer: {
      marginTop: MyDimensions.paddingMedium,
      marginBottom: MyDimensions.paddingLarge,
    },
    addressText: {
      paddingLeft: MyDimensions.paddingSmall,
    },
    addAddressContainer: {
      width: '100%',
      borderWidth: 1,
      borderColor: colors.outline,
      padding: MyDimensions.paddingMedium,
      borderRadius: MyDimensions.borderRadiusSmall,
      marginTop: MyDimensions.paddingSmall,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    qrContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: MyDimensions.paddingMedium,
    },
    qrImage: {
      width: 200,
      height: 200,
    },
  });
