import {useMemo} from 'react';
import {Translation} from 'react-i18next';
import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from '../common';
import {MyDimensions} from '../../constants';
import {getRankPromo, getRankTitle} from '../../utils/rankUser';

interface Props {
  point: number;
  style?: StyleProp<ViewStyle>;
}

export default function PointPromoSection({style, point}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const tilte = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>
            {t('promoMember')}
          </CustomText>
        )}
      </Translation>
    ),
    [styles],
  );

  return (
    <View style={[styles.container, style]}>
      {tilte}
      <View style={styles.rowContainer}>
        <Translation>
          {t => (
            <CustomText style={styles.promoText} variant="body1">{`${t(
              'memberIs',
              {
                rank: t(`${getRankTitle(point)}`).toLowerCase(),
                promo: getRankPromo(point),
              },
            )}`}</CustomText>
          )}
        </Translation>
      </View>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    title: {
      color: colors.onBackground,
    },
    rowContainer: {
      marginTop: MyDimensions.paddingMedium,
    },
    promoText: {
      color: colors.primary,
      paddingHorizontal: MyDimensions.paddingSmall,
    },
  });
