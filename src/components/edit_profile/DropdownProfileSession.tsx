import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {fontFamily} from '../../themes';
import {useTheme} from 'react-native-paper';
import {useMemo} from 'react';

interface Props<T> {
  style?: StyleProp<ViewStyle>;
  list: T[];
  disable: boolean;
  value?: T;
  placeholder: string;
  valueField: keyof T;
  labelField: keyof T;
  isError?: boolean;
  onChange: (item: T) => void;
}

export default function DropdownProfileSession<T>({
  style,
  list,
  disable,
  value,
  valueField,
  labelField,
  placeholder,
  isError = false,
  onChange,
}: Props<T>) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  return (
    <Dropdown
      style={[styles.dropdownContainer, style]}
      placeholderStyle={[styles.text, isError && styles.errorTextColor]}
      selectedTextStyle={styles.textSelect}
      data={list}
      disable={disable}
      labelField={labelField}
      valueField={valueField}
      value={value}
      maxHeight={300}
      keyboardAvoiding={true}
      onChange={onChange}
      showsVerticalScrollIndicator={false}
      placeholder={placeholder}
    />
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    dropdownContainer: {
      width: '100%',
      height: 50,
    },
    text: {
      fontSize: 16,
      fontFamily: fontFamily.mulishRegular,
      overflow: 'scroll',
    },
    textSelect: {
      fontSize: 16,
      fontFamily: fontFamily.mulishRegular,
      color: colors.onBackground,
    },
    errorTextColor: {
      color: colors.error,
    },
  });
