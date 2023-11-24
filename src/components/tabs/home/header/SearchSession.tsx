import {startTransition, useCallback, useMemo, useState} from 'react';
import {View, StyleSheet, ViewStyle, StyleProp, TextInput} from 'react-native';
import {Icon, IconButton, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../../constants';
import {getColorOpacity} from '../../../../utils/colorOpacity';
import {fontFamily} from '../../../../themes';
import {Translation} from 'react-i18next';
import {useAppDispatch} from '../../../../store/hooks';
import {
  getCoffeesWithSearch,
  setSearchText,
} from '../../../../store/home/searchSlice';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function SearchSession({style}: Props) {
  const [searchText, setSearch] = useState('');

  const dispatch = useAppDispatch();

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // When is change will dispatch to search coffee
  const onChangeText = useCallback(
    (value: string) => {
      startTransition(() => {
        setSearch(value);
      });
      // Code to hanlde search
      dispatch(setSearchText(value));
      if (value.length > 0) {
        dispatch(getCoffeesWithSearch(value));
      }
    },
    [setSearch],
  );

  // Remove search text
  const removeSearchText = useCallback(() => {
    startTransition(() => {
      setSearch('');
      dispatch(setSearchText(''));
    });
  }, []);

  const icon = useMemo(
    () => (
      <Icon
        source={'magnify'}
        size={MyDimensions.iconLarge}
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
          size={MyDimensions.iconMedium}
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
