import {useCallback, useMemo, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import {useTheme, Icon, IconButton} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {CustomText} from '../common/CustomText';

interface Props {
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  icon: string;
  placeholder?: string;
  iconSize?: number;
  keyboardType?: KeyboardTypeOptions;
  isCanSecureText?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function InputSection({
  error,
  value,
  onChangeText,
  style,
  icon,
  placeholder,
  keyboardType,
  isCanSecureText = false,
  iconSize = MyDimensions.iconSmall,
}: Props) {
  const [secureText, setSecureText] = useState(isCanSecureText);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const onChangeMode = useCallback(() => {
    setSecureText(!secureText);
  }, [secureText]);

  const iconView = useMemo(
    () => (
      <View style={styles.iconContainer}>
        <Icon source={icon} size={iconSize} color={colors.onBackground} />
      </View>
    ),
    [styles, icon, iconSize, colors],
  );

  return (
    <View style={style}>
      <View style={[styles.topView]}>
        {iconView}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureText}
            numberOfLines={1}
          />
          <View style={styles.eyeContainer}>
            {isCanSecureText && (
              <IconButton
                icon={!secureText ? 'eye-off' : 'eye'}
                size={MyDimensions.iconSmall}
                iconColor={colors.onBackground}
                onPress={onChangeMode}
              />
            )}
          </View>
        </View>
      </View>
      <CustomText variant="meta1" style={styles.errorText}>
        {error}
      </CustomText>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    topView: {
      flexDirection: 'row',
      height: 42,
      borderBottomColor: colors.outline,
      borderBottomWidth: 1,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRightColor: colors.outline,
      borderRightWidth: 1,
      marginBottom: 4,
      paddingHorizontal: MyDimensions.paddingSmall,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: MyDimensions.paddingSmall,
    },
    input: {
      flex: 1,
    },
    eyeContainer: {
      width: MyDimensions.iconSmall,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: colors.error,
      marginTop: 2,
    },
  });
