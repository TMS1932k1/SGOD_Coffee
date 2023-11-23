import {Pressable, StyleSheet, View} from 'react-native';
import {Coffee} from '../../../../types/coffee';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyColors, MyDimensions} from '../../../../constants';
import {Icon, IconButton, useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {CustomText} from '../../../common';
import {getColorOpacity} from '../../../../utils/colorOpacity';

interface Props {
  coffee: Coffee;
  onPress?: (coffee: Coffee) => void;
  onPressAddFavorite?: (coffee: Coffee) => void;
}

export default function CoffeeItem({
  coffee,
  onPress,
  onPressAddFavorite,
}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const item = useMemo(
    () => (
      <Pressable
        style={({pressed}) => [styles.container, pressed && styles.pressed]}
        onPress={() => {
          if (onPress) onPress(coffee);
        }}>
        <ImageBlurLoading source={{uri: coffee.image}} style={styles.image} />
        {coffee.rate && (
          <View style={styles.rate}>
            <Icon
              source={'star'}
              size={MyDimensions.iconSmall}
              color={MyColors.warning}
            />
            <CustomText style={styles.rateText} variant="body1">
              {coffee.rate}
            </CustomText>
          </View>
        )}

        <View style={styles.infoContainer}>
          <CustomText style={styles.name} variant="subheading1">
            {coffee.name}
          </CustomText>
          <CustomText style={styles.classify} variant="body1">
            {coffee.classify}
          </CustomText>
          <View style={styles.priceConatainer}>
            <CustomText style={styles.name} variant="subheading1">
              {`$ ${coffee.price}`}
            </CustomText>
            <IconButton
              icon={'cards-heart-outline'}
              size={MyDimensions.iconMedium}
              iconColor={colors.primary}
              onPress={() => {
                if (onPressAddFavorite) onPressAddFavorite(coffee);
              }}
            />
          </View>
        </View>
      </Pressable>
    ),
    [coffee, onPress, onPressAddFavorite, styles],
  );

  return item;
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: 149,
      flex: 1,
      padding: 4,
      marginRight: MyDimensions.paddingSmall,
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
    classify: {
      color: colors.outline,
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
