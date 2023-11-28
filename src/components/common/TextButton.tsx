import {ReactNode, useMemo} from 'react';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from './CustomText';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress?: () => void;
}

export default function TextButton({onPress, style, children}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <Pressable
      style={({pressed}) => [style, (pressed || !onPress) && styles.opacity]}
      onPress={onPress}>
      <CustomText style={styles.text} variant="subheading2">
        {children}
      </CustomText>
    </Pressable>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    text: {
      color: colors.primary,
      textAlign: 'center',
    },
    opacity: {
      opacity: 0.7,
    },
  });
