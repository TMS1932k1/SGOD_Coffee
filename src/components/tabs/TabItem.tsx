import {StyleSheet, View} from 'react-native';
import {Icon, useTheme} from 'react-native-paper';
import {MyDimensions} from '../../constants';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useMemo} from 'react';

interface Props {
  icon: string;
  size?: number;
  isCurrent?: boolean;
}

export default function TabItem({
  icon,
  size = MyDimensions.iconSmall,
  isCurrent = false,
}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={styles.container}>
      <Icon
        source={icon}
        size={size}
        color={isCurrent ? colors.primary : colors.outline}
      />
      {isCurrent && <View style={[styles.line, {width: size / 2}]} />}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      height: 5,
      borderRadius: 5,
      marginTop: 2,
      backgroundColor: colors.primary,
    },
  });
