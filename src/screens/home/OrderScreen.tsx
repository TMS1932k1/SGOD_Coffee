import {View, StyleSheet} from 'react-native';
import {
  HomeStackNavigationScreenProps,
  HomeStackRouteScreenProps,
} from '../../types/stack';
import {useCallback, useLayoutEffect, useMemo} from 'react';
import {CustomStatusBar} from '../../components/common';
import {IconButton, useTheme} from 'react-native-paper';
import {MyDimensions} from '../../constants';
import {useTranslation} from 'react-i18next';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {useRoute} from '@react-navigation/native';
import {OptionSection} from '../../components/order';

interface Props {
  navigation: HomeStackNavigationScreenProps<'OrderScreen'>;
}

export default function OrderScreen({navigation}: Props) {
  const {t} = useTranslation();

  const route = useRoute<HomeStackRouteScreenProps<'OrderScreen'>>();

  const product = useMemo(() => route.params.product, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('order'),
      headerTitleAlign: 'center',
      headerRight: () => (
        <IconButton
          icon={'cards-heart-outline'}
          size={MyDimensions.iconLarge}
          onPress={clickFavorite}
        />
      ),
    });
  }, [navigation, t]);

  // Add or delete product in favorites
  const clickFavorite = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <ImageBlurLoading style={styles.image} source={{uri: product.image}} />
      <OptionSection name={product.name} style={styles.options} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MyDimensions.paddingLarge,
    paddingVertical: MyDimensions.paddingMedium,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: MyDimensions.borderRadiusMedium,
  },
  options: {
    marginTop: MyDimensions.paddingSmall,
  },
});
