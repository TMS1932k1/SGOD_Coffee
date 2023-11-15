import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {CustomText} from '../common/CustomText';
import {MyDimensions} from '../../constants';
import {useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';

interface Props {
  style?: StyleProp<ViewStyle>;
  title: string;
  subtitle: string;
}

export default function HeaderSection({title, subtitle, style}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={[styles.container, style]}>
      <CustomText style={styles.title} variant="heading2">
        {title}
      </CustomText>
      <CustomText style={styles.subtitle} variant="body2">
        {subtitle}
      </CustomText>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 120,
      justifyContent: 'center',
    },
    title: {
      color: colors.onBackground,
    },
    subtitle: {
      color: colors.outline,
      marginTop: MyDimensions.paddingMedium,
    },
  });
