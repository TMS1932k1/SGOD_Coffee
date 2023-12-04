import {useCallback, useMemo, useRef} from 'react';
import {
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {fontFamily} from '../../themes';
import {MyDimensions} from '../../constants';

interface Props {
  numberLength: number;
  onChange?: (otp: Array<string | undefined>) => void;
  style?: StyleProp<ViewStyle>;
}

export default function OtpInputsSection({
  style,
  numberLength,
  onChange,
}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const otpArray = [...new Array<string | undefined>(numberLength)];

  const inputRef = useRef<Array<NonNullable<TextInput>>>([]);

  /**
   * Assign new value into OTP array, then will callback by [onChange]
   *
   * @param index - index of array need assign new value
   * @param text - text to assign to index
   */
  const updateOtpArray = useCallback(
    (text: string, index: number) => {
      otpArray[index] = text.trim() !== '' ? text : undefined;
      if (onChange) onChange(otpArray);
    },
    [otpArray, onChange],
  );

  // Auto focus next input OTP code
  /**
   * Assign new value into OTP array by function [updateOtpArray]
   * Then check length of text, if length > 0 will focus next index else focus previous index by ref [inputRef]
   *
   * @param index - index of array need assign new value
   * @param text - text to assign to index
   */
  const onChangeText = useCallback(
    (text: string, index: number) => {
      // Assign new value into OTP array
      updateOtpArray(text, index);

      // Check length of text to handle focus
      if (text.length > 0) {
        inputRef.current[index + 1]?.focus();
      }
      inputRef.current[index - 1]?.focus();
    },
    [inputRef, updateOtpArray],
  );

  /**
   * Check key press event,
   * If key is 'Backspace' will call function [onChangeText] with param [''] and [index]
   *
   * @param event - Key press events of [TextInput]
   * @param index - index of array need backspace value
   */
  const onBackSpace = useCallback(
    (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number,
    ) => {
      const {nativeEvent} = event;
      if (nativeEvent.key === 'Backspace') {
        onChangeText('', index);
      }
    },
    [onChangeText],
  );

  return (
    <View style={[styles.container, style]}>
      {[...otpArray].map((item, index) => (
        <TextInput
          ref={ref => {
            if (ref && !inputRef.current.includes(ref)) {
              inputRef.current = [...inputRef.current, ref];
            }
          }}
          cursorColor={colors.primary}
          testID={`OTP${index}`}
          key={index}
          style={[styles.input]}
          maxLength={1}
          keyboardType="numeric"
          contextMenuHidden
          onChangeText={value => onChangeText(value, index)}
          onKeyPress={event => onBackSpace(event, index)}
        />
      ))}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    input: {
      width: 48,
      height: 61,
      fontSize: 24,
      fontFamily: fontFamily.mulishBold,
      backgroundColor: colors.surface,
      color: colors.onSurface,
      borderRadius: MyDimensions.borderRadiusSmall,
      textAlign: 'center',
    },
  });
