import {useMemo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';

interface Props {
  style?: StyleProp<ViewStyle>;
  type?: 'default' | 'vertical';
}

export default function Line({type = 'default', style}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  return (
    <View
      style={[
        type === 'vertical' ? styles.verticalView : styles.horizontalView,
        style,
      ]}
    />
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    horizontalView: {
      width: '100%',
      height: 1,
      backgroundColor: colors.outline,
    },
    verticalView: {
      width: 1,
      height: '100%',
      backgroundColor: colors.outline,
    },
  });
