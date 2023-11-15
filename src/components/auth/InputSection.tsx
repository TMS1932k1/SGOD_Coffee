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

interface Props {
  icon: string;
  placeholder?: string;
  iconSize?: number;
  keyboardType?: KeyboardTypeOptions;
  isCanSecureText?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function InputSection({
  style,
  icon,
  placeholder,
  keyboardType,
  isCanSecureText = false,
  iconSize = MyDimensions.iconSmall,
}: Props) {
  const [secureText, setSecureText] = useState(true);

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
    <View style={[styles.container, style]}>
      {iconView}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
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
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
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
  });
