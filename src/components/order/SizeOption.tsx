import {View, StyleSheet, Pressable} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {getColorOpacity} from '../../utils/colorOpacity';
import {Icon, useTheme} from 'react-native-paper';
import {useCallback, useMemo, useState} from 'react';
import {CustomText} from '../common';
import {Translation} from 'react-i18next';
import {Volume} from '../../types/order';

export default function SizeOption() {
  const [indexVolume, setIndexVolume] = useState(0);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const cupIcons: Volume[] = useMemo(
    () => [
      {ml: '250', size: 22},
      {ml: '350', size: 28},
      {ml: '450', size: 34},
    ],
    [],
  );

  // Handle click select sizes option with index
  const onSelectSize = useCallback((index: number) => {
    setIndexVolume(index);
  }, []);

  const title = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>
            {t('volume')}
          </CustomText>
        )}
      </Translation>
    ),
    [styles],
  );

  return (
    <View style={styles.row}>
      {title}
      <View style={styles.sizesContainer}>
        {cupIcons.map((item, index) => (
          <Pressable
            style={styles.size}
            key={index}
            onPress={() => onSelectSize(index)}>
            <Icon
              source={'cup'}
              size={item.size}
              color={indexVolume === index ? colors.primary : colors.outline}
            />
            <CustomText style={styles.text} variant="body1">
              {item.ml}
            </CustomText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: MyDimensions.paddingSmall,
      marginTop: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingSmall,
      borderBottomColor: getColorOpacity(colors.outline, 0.5),
      borderBottomWidth: 1,
      alignItems: 'center',
    },
    sizesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    size: {
      height: 60,
      marginHorizontal: MyDimensions.paddingSmall,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    text: {
      marginTop: MyDimensions.paddingSmall,
      color: colors.onBackground,
    },
    title: {
      color: colors.onBackground,
    },
  });
