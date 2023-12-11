import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Product} from '../../../../types/product';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyColors, MyDimensions} from '../../../../constants';
import {
  ActivityIndicator,
  Icon,
  IconButton,
  useTheme,
} from 'react-native-paper';
import {useCallback, useMemo, useState} from 'react';
import {CustomText} from '../../../common';
import {getColorOpacity} from '../../../../utils/colorOpacity';
import {Translation} from 'react-i18next';
import Animated, {LinearTransition, ZoomIn} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {updateFavoriteAuth} from '../../../../store/auth/authSlice';
import {
  addFavorite,
  removeFavorite,
} from '../../../../store/favorite/favoriteSlice';

interface Props {
  style?: StyleProp<ViewStyle>;
  product: Product;
  onPress?: (product: Product) => void;
}

export default function ProductItem({style, product, onPress}: Props) {
  const [isLoadinhIcon, setLoadingIcon] = useState(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.authState.user);
  const isLoadingAuth = useAppSelector(state => state.authState.isLoading);

  const isFavorited = useMemo(
    () => user?.idFavorites.includes(product.id) ?? false,
    [user, product],
  );

  const onChangeFavorite = useCallback(() => {
    setLoadingIcon(true);
    const updateFavoriteUser = () => {
      return isFavorited
        ? dispatch(
            updateFavoriteAuth({
              userId: user!.id,
              favorites: [
                ...user!.idFavorites.filter(item => item !== product.id),
              ],
            }),
          )
        : dispatch(
            updateFavoriteAuth({
              userId: user!.id,
              favorites: [product.id, ...user!.idFavorites],
            }),
          );
    };

    updateFavoriteUser()
      .unwrap()
      .then(
        () => {
          // On fullfill
          dispatch(
            isFavorited ? removeFavorite(product.id) : addFavorite(product),
          );
          setLoadingIcon(false);
        },
        () => {
          // On rejected
          setLoadingIcon(false);
        },
      );
  }, [isFavorited, user, product]);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const iconFavorite = useMemo(
    () =>
      isLoadingAuth || isLoadinhIcon ? (
        <ActivityIndicator
          style={styles.loading}
          size={MyDimensions.iconMedium}
        />
      ) : (
        <IconButton
          icon={isFavorited && user ? 'cards-heart' : 'cards-heart-outline'}
          size={MyDimensions.iconMedium}
          iconColor={colors.primary}
          onPress={user ? onChangeFavorite : undefined}
        />
      ),
    [isLoadingAuth, isFavorited, onChangeFavorite, isLoadinhIcon],
  );

  const item = useMemo(
    () => (
      <Animated.View entering={ZoomIn} layout={LinearTransition.duration(300)}>
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
    [product, onPress, styles, iconFavorite],
  );

  return item;
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: 150,
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
    loading: {
      padding: MyDimensions.paddingSmall,
    },
    pressed: {
      opacity: 0.7,
    },
  });
