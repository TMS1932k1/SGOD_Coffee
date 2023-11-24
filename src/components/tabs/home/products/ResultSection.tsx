import {useMemo} from 'react';
import {Translation} from 'react-i18next';
import {View, ViewStyle, StyleProp, StyleSheet} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from '../../../common';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {useAppSelector} from '../../../../store/hooks';
import {MyDimensions} from '../../../../constants';
import ProductsList from './ProductsList';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function ResultSection({style}: Props) {
  const searchText = useAppSelector(state => state.searchState.searchText);

  const products = useAppSelector(state => state.searchState.products);

  const isLoading = useAppSelector(state => state.searchState.isLoading);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const title = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText style={styles.title} variant="heading2" numberOfLines={1}>
            {t('result', {searchText: searchText})}
          </CustomText>
        )}
      </Translation>
    ),
    [styles, searchText],
  );

  const loadingView = useMemo(
    () => (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    ),
    [style, styles],
  );

  return (
    <View style={[styles.container, style]}>
      {title}
      {isLoading ? (
        loadingView
      ) : (
        <ProductsList style={styles.list} products={products} />
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: MyDimensions.paddingLarge,
    },
    title: {
      color: colors.onBackground,
      overflow: 'hidden',
    },
    list: {
      marginTop: MyDimensions.paddingMedium,
    },
    loading: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: MyDimensions.paddingLarge,
    },
  });
