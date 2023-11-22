import {startTransition, useCallback, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextInput,
  Keyboard,
} from 'react-native';
import {Icon, IconButton, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import {getColorOpacity} from '../../../utils/colorOpacity';
import {fontFamily} from '../../../themes';
import {Translation} from 'react-i18next';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function SearchSession({style}: Props) {
  const [searchText, setSearchText] = useState('');

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // When is change will dispatch to search coffee
  const onChangeText = useCallback(
    (value: string) => {
      startTransition(() => {
        setSearchText(value);
      });
      // Code to hanlde search
    },
    [setSearchText],
  );

  // Remove search text
  const removeSearchText = useCallback(() => {
    startTransition(() => {
      setSearchText('');
    });
  }, []);

  const icon = useMemo(
    () => (
      <Icon
        source={'magnify'}
        size={MyDimensions.iconMedium}
        color={colors.background}
      />
    ),
    [colors],
  );

  return (
    <View style={[styles.container, style]}>
      {icon}
      <Translation>
        {t => (
          <TextInput
            value={searchText}
            style={styles.input}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={colors.outline}
            numberOfLines={1}
            keyboardType="default"
            cursorColor={colors.primary}
            maxLength={30}
            onChangeText={onChangeText}
          />
        )}
      </Translation>

      {searchText.length > 0 && (
        <IconButton
          icon={'close-circle-outline'}
          iconColor={colors.outline}
          size={MyDimensions.iconSmall}
          onPress={removeSearchText}
        />
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 52,
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: MyDimensions.paddingMedium,
      backgroundColor: getColorOpacity(colors.outline, 0.2),
      borderRadius: MyDimensions.borderRadiusMedium,
    },
    input: {
      flex: 1,
      marginHorizontal: MyDimensions.paddingSmall,
      color: colors.background,
      fontSize: 16,
      fontFamily: fontFamily.mulishRegular,
    },
  });
