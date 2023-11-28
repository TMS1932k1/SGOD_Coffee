import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from './CustomText';
import {ReactNode} from 'react';

interface Props {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  children: ReactNode;
}

export default function ContainedButton({
  style,
  disabled = false,
  onPress,
  children,
  textStyle,
}: Props) {
  const colors = useTheme().colors;
  const styles = styling(colors);

  return (
    <Button
      style={[styles.button, style]}
      mode="contained"
      onPress={onPress}
      disabled={disabled}>
      <CustomText style={[styles.text, textStyle]} variant="subheading2">
        {children}
      </CustomText>
    </Button>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    button: {
      width: '100%',
      height: 62,
      justifyContent: 'center',
    },
    text: {
      color: colors.onPrimary,
    },
  });
