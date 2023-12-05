import {useMemo} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {getColorOpacity} from '../../utils/colorOpacity';
import {CustomText} from '../common';
import {Translation} from 'react-i18next';
import {useAppSelector} from '../../store/hooks';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function PointPlusSection({style}: Props) {
  const addPoint = useAppSelector(state => state.confirmState.addPoint);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={[styles.container, style]}>
      <Translation>
        {t => (
          <CustomText style={styles.text} variant="body2">
            {t('changeTotal', {point: addPoint})}
          </CustomText>
        )}
      </Translation>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      borderColor: colors.primary,
      borderWidth: 2,
      borderRadius: MyDimensions.borderRadiusSmall,
      padding: MyDimensions.paddingSmall,
      backgroundColor: getColorOpacity(colors.primary, 0.5),
      alignItems: 'center',
    },
    text: {
      color: colors.onBackground,
    },
  });
