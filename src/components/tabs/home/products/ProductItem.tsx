import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Product} from '../../../../types/product';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyColors, MyDimensions} from '../../../../constants';
import {Icon, IconButton, useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {CustomText} from '../../../common';
import {getColorOpacity} from '../../../../utils/colorOpacity';
import {Translation} from 'react-i18next';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {useAppSelector} from '../../../../store/hooks';

interface Props {
  style?: StyleProp<ViewStyle>;
  product: Product;
  onPress?: (coffee: Product) => void;
  onPressAddFavorite?: (coffee: Product) => void;
}

export default function ProductItem({
  style,
  product,
  onPress,
  onPressAddFavorite,
}: Props) {
  const user = useAppSelector(state => state.authState.user);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const iconFavorite = useMemo(
    () => (
      <IconButton
        icon={
          user?.idFavorites.includes(product.id)
            ? 'cards-heart'
            : 'cards-heart-outline'
        }
        size={MyDimensions.iconMedium}
        iconColor={colors.primary}
        onPress={() => {
          if (onPressAddFavorite) onPressAddFavorite(product);
        }}
      />
    ),
    [user],
  );

  const item = useMemo(
    () => (
      <Animated.View entering={ZoomIn}>
        <Pressable
          style={({pressed}) => [
            styles.container,
            style,
            pressed && styles.pressed,
          ]}
          onPress={() => {
            if (onPress) onPress(product);
          }}>
          <ImageBlurLoading
            source={{uri: product.image}}
            style={styles.image}
          />
          {product.rate && (
            <View style={styles.rate}>
              <Icon
                source={'star'}
                size={MyDimensions.iconSmall}
                color={MyColors.warning}
              />
              <CustomText style={styles.rateText} variant="body1">
                {product.rate}
              </CustomText>
            </View>
          )}
          <View style={styles.infoContainer}>
            <CustomText style={styles.name} variant="subheading2">
              {product.name}
            </CustomText>
            <View style={styles.priceConatainer}>
              <Translation>
                {t => (
                  <CustomText style={styles.name} variant="body1">
                    {t('price', {price: product.price.toLocaleString()})}
                  </CustomText>
                )}
              </Translation>
              {iconFavorite}
            </View>
          </View>
        </Pressable>
      </Animated.View>
    ),
    [product, onPress, onPressAddFavorite, styles],
  );

  return item;
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: 152,
      height: 220,
      padding: 4,
      borderRadius: MyDimensions.borderRadiusMedium,
      backgroundColor: colors.surface,
    },
    rate: {
      flexDirection: 'row',
      position: 'absolute',
      top: 4,
      left: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getColorOpacity(MyColors.black, 0.7),
      paddingRight: MyDimensions.paddingMedium,
      paddingLeft: MyDimensions.paddingSmall,
      paddingVertical: 1,
      borderTopLeftRadius: MyDimensions.borderRadiusSmall,
      borderBottomRightRadius: MyDimensions.borderRadiusSmall,
    },
    rateText: {
      color: MyColors.white,
      marginLeft: 2,
    },
    image: {
      width: '100%',
      height: 132,
      borderRadius: MyDimensions.borderRadiusMedium - 4,
      resizeMode: 'cover',
    },
    infoContainer: {
      flex: 1,
      padding: MyDimensions.paddingSmall,
    },
    name: {
      color: colors.onBackground,
      overflow: 'hidden',
    },
    priceConatainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    pressed: {
      opacity: 0.7,
    },
  });
