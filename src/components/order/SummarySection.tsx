import {useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {Translation} from 'react-i18next';
import {CustomText} from '../common';

export default function SummarySection() {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const title = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>
            {t('total').toLocaleUpperCase()}
          </CustomText>
        )}
      </Translation>
    ),
    [styles],
  );

  const detailRowView = useCallback(() => {
    return <View />;
  }, []);

  return <View style={styles.container}>{title}</View>;
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: MyDimensions.paddingSmall,
      marginVertical: MyDimensions.paddingLarge,
    },
    title: {
      color: colors.onBackground,
    },
    detailRow: {},
  });
