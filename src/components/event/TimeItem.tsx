import {StyleSheet, View} from 'react-native';
import {CustomText} from '../common';
import {useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {getFormatDateWithString} from '../../utils/getFormat';
import {Timeline} from '../../types/event';
import {Translation} from 'react-i18next';

interface Props {
  timeline?: Timeline;
}

export default function TimeItem({timeline}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={styles.container}>
      <Translation>
        {t => (
          <CustomText style={styles.text} variant="body2">
            {timeline
              ? t('timelineCtx', {
                  start: getFormatDateWithString(timeline.start),
                  end: getFormatDateWithString(timeline.deadline),
                })
              : t('everyTime')}
          </CustomText>
        )}
      </Translation>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.outlineVariant,
      borderRadius: MyDimensions.borderRadiusSmall,
      paddingHorizontal: MyDimensions.paddingSmall,
      paddingVertical: 4,
    },
    text: {
      color: colors.onBackground,
    },
  });
