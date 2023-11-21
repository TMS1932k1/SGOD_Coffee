import {useMemo} from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {ProgressBar, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from '../../common/CustomText';
import {MyApp, MyDimensions} from '../../../constants';
import {useAppSelector} from '../../../store/store';
import {Translation} from 'react-i18next';
import {getRankColor, getRankTitle} from '../../../utils/rankUser';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function InfoUser({style}: Props) {
  const user = useAppSelector(state => state.authState.user);

  const point = useMemo(() => user?.point ?? 0, [user]);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const rank = useMemo(() => {
    let rankTitle = getRankTitle(point);
    return (
      <View style={[styles.rank, {backgroundColor: getRankColor(rankTitle)}]}>
        <CustomText variant="body1">{rankTitle}</CustomText>
      </View>
    );
  }, [point]);

  const firstEmail = useMemo(
    () => (
      <View style={styles.firstEmailContainer}>
        <CustomText style={styles.textColor} variant="heading2">
          {user?.email.charAt(0).toUpperCase()}
        </CustomText>
      </View>
    ),
    [colors],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.pointContainer}>
        <View style={styles.rankContainer}>
          <Translation>
            {t => (
              <CustomText
                style={styles.textColor}
                variant="body1"
                numberOfLines={1}>
                {t('hi', {name: user?.name})}
              </CustomText>
            )}
          </Translation>
          {rank}
        </View>
        <CustomText
          style={[styles.textColor, styles.pointNumber]}
          variant="meta2">
          {`${point} / ${MyApp.maxPoint}`}
        </CustomText>
        <ProgressBar style={styles.progress} progress={point / 10000} />
      </View>
      {firstEmail}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    pointContainer: {
      width: 240,
    },
    rankContainer: {
      flexDirection: 'row',
    },
    firstEmailContainer: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: MyDimensions.borderRadiusMedium,
    },
    textColor: {
      color: colors.background,
    },
    pointNumber: {
      marginTop: 4,
    },
    progress: {
      backgroundColor: colors.outline,
    },
    rank: {
      backgroundColor: colors.primary,
      marginLeft: MyDimensions.paddingSmall,
      paddingHorizontal: MyDimensions.paddingSmall,
      borderRadius: MyDimensions.borderRadiusSmall,
    },
  });
