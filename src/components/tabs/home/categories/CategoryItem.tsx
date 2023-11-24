import {Pressable, StyleSheet, View} from 'react-native';
import {CustomText} from '../../../common';
import {Category} from '../../../../types/category';
import {MyDimensions} from '../../../../constants';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import ImageBlurLoading from 'react-native-image-blur-loading';
import LinearGradient from 'react-native-linear-gradient';

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
        <View style={styles.imageContainer}>
          <ImageBlurLoading
            source={{uri: category.image}}
            style={[styles.imageContainer, styles.image]}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0.95, y: 0}}
            colors={[
              'transparent',
              isSelected ? colors.primary : colors.surface,
            ]}
            style={styles.linear}
          />
        </View>
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
      height: 40,
      flexDirection: 'row',
      backgroundColor: colors.surface,
      marginRight: MyDimensions.paddingSmall,
      borderRadius: MyDimensions.borderRadiusMedium,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderContainer: {
      width: 121,
    },
    imageContainer: {
      width: 60,
      height: '100%',
      borderTopLeftRadius: MyDimensions.borderRadiusMedium,
      borderBottomLeftRadius: MyDimensions.borderRadiusMedium,
    },
    image: {
      resizeMode: 'cover',
    },
    linear: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      right: 0,
    },
    itemSelectedContainer: {
      backgroundColor: colors.primary,
    },
    textItem: {
      flex: 1,
      color: colors.outline,
      paddingRight: MyDimensions.paddingMedium,
    },
    textSelectedItem: {
      color: colors.background,
    },
  });
