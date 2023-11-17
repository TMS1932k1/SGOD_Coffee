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

  // Callback return new otp array
  const updateOtpArray = useCallback(
    (text: string, index: number) => {
      otpArray[index] = text.trim() !== '' ? text : undefined;
      if (onChange) onChange(otpArray);
    },
    [otpArray, onChange],
  );

  // Auto focus next input OTP code
  const onChangeText = useCallback(
    (text: string, index: number) => {
      // Set new otp array
      updateOtpArray(text, index);

      if (text.length > 0) {
        return inputRef.current[index + 1]?.focus();
      }
      return inputRef.current[index - 1]?.focus();
    },
    [inputRef, updateOtpArray],
  );

  // Auto focus previous OTP code when press backspacce
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
