import {Pressable, StyleSheet} from 'react-native';
import {CustomText} from '../../../common';
import {Category} from '../../../../types/category';
import {MyDimensions} from '../../../../constants';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {useMemo} from 'react';

interface Props {
  isSelected?: boolean;
  category: Category;
  onPressItem?: () => void;
}

export default function CategoryItem({
  category,
  isSelected = false,
  onPressItem,
}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const item = useMemo(
    () => (
      <Pressable
        onPress={onPressItem}
        style={[
          styles.itemContainer,
          isSelected && styles.itemSelectedContainer,
        ]}>
        <CustomText
          style={[styles.textItem, isSelected && styles.textSelectedItem]}
          variant="subheading2">
          {category.name}
        </CustomText>
      </Pressable>
    ),
    [category, isSelected],
  );

  return item;
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    itemContainer: {
      height: 38,
      backgroundColor: colors.surface,
      marginRight: MyDimensions.paddingSmall,
      borderRadius: MyDimensions.borderRadiusSmall,
      paddingHorizontal: MyDimensions.paddingMedium,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderContainer: {
      width: 121,
    },
    itemSelectedContainer: {
      backgroundColor: colors.primary,
    },
    textItem: {
      color: colors.outline,
    },
    textSelectedItem: {
      color: colors.background,
    },
  });
