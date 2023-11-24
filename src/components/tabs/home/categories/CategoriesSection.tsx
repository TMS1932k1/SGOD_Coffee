import {
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {MutableRefObject, useCallback, useMemo, useRef, useState} from 'react';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {MyDimensions} from '../../../../constants';
import CategoryItem from './CategoryItem';
import {getProductsWithCategory} from '../../../../store/home/productsCategorySlice';
import {setCurrentIndex} from '../../../../store/home/categoriesSlice';

interface Props {
  style?: StyleProp<ViewStyle>;
  refFetching?: MutableRefObject<any>;
}

export default function CategoriesSection({style, refFetching}: Props) {
  const dispatch = useAppDispatch();

  const currentIndexCategory = useAppSelector(
    state => state.categoriesState.currentIndex,
  );

  const isLoading = useAppSelector(state => state.categoriesState.isLoading);

  const categories = useAppSelector(state => state.categoriesState.categories);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // Set category's current index with [id: string]
  const onPressCategory = useCallback((id: string) => {
    if (refFetching) {
      refFetching.current?.abort();
      refFetching.current = dispatch(getProductsWithCategory(id));
    } else {
      dispatch(getProductsWithCategory(id));
    }
  }, []);

  const placeholder = useMemo(
    () => (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {[...new Array(3)].map((item, index) => (
          <View key={index} style={styles.placeholderContainer} />
        ))}
      </ScrollView>
    ),
    [styles],
  );

  return (
    <View style={[style]}>
      {isLoading ? (
        placeholder
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <CategoryItem
              category={item}
              isSelected={index === currentIndexCategory}
              onPressItem={() => {
                dispatch(setCurrentIndex(index));
                onPressCategory(item.id);
              }}
            />
          )}
        />
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    placeholderContainer: {
      height: 38,
      backgroundColor: colors.surface,
      marginRight: MyDimensions.paddingSmall,
      borderRadius: MyDimensions.borderRadiusSmall,
      paddingVertical: MyDimensions.paddingSmall,
      paddingHorizontal: MyDimensions.paddingMedium,
      justifyContent: 'center',
      alignItems: 'center',
      width: 121,
    },
  });
