import {useMemo} from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from '../common';
import {fontFamily} from '../../themes';
import {MyDimensions} from '../../constants';

interface Props {
  style?: StyleProp<ViewStyle>;
  title: string;
  isError?: boolean;
  placeholder?: string;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  onChange?: () => void;
}

export default function InputProfileSession({
  style,
  title,
  placeholder,
  value,
  onChange,
  keyboardType,
  isError = false,
}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={[style]}>
      <CustomText style={styles.titleText} variant="subheading2">
        {title}
      </CustomText>
      <TextInput
        style={[styles.text, isError ? styles.inputError : styles.input]}
        maxLength={20}
        numberOfLines={1}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={isError ? colors.error : colors.outline}
        cursorColor={colors.primary}
      />
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    titleText: {
      color: colors.onBackground,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: colors.outline,
      marginTop: MyDimensions.paddingSmall,
      paddingVertical: MyDimensions.paddingSmall,
    },
    inputError: {
      borderColor: colors.error,
      borderBottomWidth: 1,
      marginTop: MyDimensions.paddingSmall,
      paddingVertical: MyDimensions.paddingSmall,
    },
    text: {
      fontSize: 16,
      fontFamily: fontFamily.mulishRegular,
      overflow: 'scroll',
    },
  });
