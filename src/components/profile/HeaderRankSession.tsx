import {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {CustomText} from '../common';
import {useAppSelector} from '../../store/hooks';
import {getRankPromo} from '../../utils/rankUser';
import {Translation} from 'react-i18next';

export default function HeaderRankSession() {
  const user = useAppSelector(state => state.authState.user);
  const bills = useAppSelector(state => state.billsState.bills);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  return (
    <View style={styles.container}>
      <View style={styles.nameUserContainer}>
        <View style={styles.firstCharContainer}>
          <CustomText style={styles.firstCharText} variant="heading1">
            {user!.name.charAt(0)}
          </CustomText>
        </View>
        <View>
          <CustomText variant="subheading1">{user!.name}</CustomText>
          <CustomText variant="body2">{user!.email} </CustomText>
        </View>
      </View>
      <Translation>
        {t => (
          <View style={styles.achievementContainer}>
            <View style={styles.achievementItem}>
              <Icon
                source={'hand-coin'}
                color={colors.background}
                size={MyDimensions.iconMedium}
              />
              <CustomText variant="body2" style={styles.achievementText}>
                {t(`point`, {point: user!.point ?? 0})}
              </CustomText>
            </View>

            <View style={styles.line} />
            <View style={styles.achievementItem}>
              <Icon
                source={'clipboard-text'}
                color={colors.background}
                size={MyDimensions.iconMedium}
              />
              <CustomText variant="body2" style={styles.achievementText}>
                {t(`countBill`, {count: bills.length})}
              </CustomText>
            </View>
            <View style={styles.line} />
            <View style={styles.achievementItem}>
              <Icon
                source={'sale'}
                color={colors.background}
                size={MyDimensions.iconMedium}
              />
              <CustomText variant="body2" style={styles.achievementText}>
                {getRankPromo(user!.point)}%
              </CustomText>
            </View>
          </View>
        )}
      </Translation>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.primary,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingMedium,
    },
    nameUserContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    firstCharContainer: {
      width: 46,
      height: 46,
      borderRadius: MyDimensions.borderRadiusLarge,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: MyDimensions.paddingMedium,
    },
    firstCharText: {
      color: colors.primary,
    },
    achievementContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: MyDimensions.paddingMedium,
    },
    rankText: {
      color: colors.background,
    },
    line: {
      backgroundColor: colors.background,
      height: 40,
      width: 1,
    },
    achievementItem: {
      alignItems: 'center',
    },
    achievementText: {
      marginTop: MyDimensions.paddingSmall,
      color: colors.background,
    },
  });
