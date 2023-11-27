import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {getColorOpacity} from '../../utils/colorOpacity';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {CustomText} from '../common';
import {IconButton, useTheme} from 'react-native-paper';
import {useCallback, useMemo, useState} from 'react';
import {Translation} from 'react-i18next';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function AddressOption({style}: Props) {
  const [isShip, setIsShip] = useState(false);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // Handle when on click onsite
  const onClickOnSite = useCallback(() => {
    setIsShip(false);
  }, []);

  // Handle when on click take away
  const onClickTakeAway = useCallback(() => {
    setIsShip(true);
  }, []);

  const tilte = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>{`${t(
            'onSite',
          )} / ${t('takeAway')}`}</CustomText>
        )}
      </Translation>
    ),
    [styles],
  );

  return (
    <View style={[styles.onsiteTakeAwayContainer, style]}>
      <View style={styles.onsiteTakeAwayRow}>
        {tilte}
        <View style={styles.onsiteTakeAwayOption}>
          <IconButton
            icon={'food'}
            size={MyDimensions.iconLarge}
            iconColor={isShip ? colors.outline : colors.onBackground}
            onPress={onClickOnSite}
          />
          <IconButton
            icon={'truck'}
            size={MyDimensions.iconLarge}
            iconColor={!isShip ? colors.outline : colors.onBackground}
            onPress={onClickTakeAway}
          />
        </View>
      </View>
      {isShip && (
        <View style={styles.adrressContainer}>
          <ImageBlurLoading
            source={{uri: 'https://i.stack.imgur.com/8KmHl.png'}}
            style={styles.imageMap}
          />
          <View style={styles.addressChangeContainer}>
            <CustomText
              style={styles.textAddress}
              variant="body1"
              numberOfLines={1}>
              {'Số 10, Đường 232, Thành phố Thủ Đức, Thành phố Hồ Chí Minh'}
            </CustomText>
            <IconButton icon={'map'} size={MyDimensions.iconMedium} />
          </View>
        </View>
      )}
      {!isShip && (
        <View style={styles.shopContainer}>
          <CustomText
            style={styles.textAddress}
            variant="body1"
            numberOfLines={1}>
            {'SGarden, 52 Trần Lựu, Quận 2, Thành phố Hồ Chí Minh'}
          </CustomText>
          <IconButton
            icon={'arrow-down-drop-circle-outline'}
            size={MyDimensions.iconMedium}
            iconColor={colors.outline}
          />
        </View>
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    onsiteTakeAwayContainer: {
      paddingHorizontal: MyDimensions.paddingSmall,
      marginTop: MyDimensions.paddingMedium,
      paddingBottom: MyDimensions.paddingSmall,
      borderBottomColor: getColorOpacity(colors.outline, 0.5),
      borderBottomWidth: 1,
    },
    title: {
      color: colors.onBackground,
    },
    onsiteTakeAwayRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    onsiteTakeAwayOption: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    adrressContainer: {
      width: '100%',
      borderRadius: MyDimensions.borderRadiusMedium,

      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: getColorOpacity(colors.outline, 0.5),
      borderWidth: 1,
    },
    imageMap: {
      width: '100%',
      height: 120,
      borderTopRightRadius: MyDimensions.borderRadiusMedium,
      borderTopLeftRadius: MyDimensions.borderRadiusMedium,
    },
    addressChangeContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: MyDimensions.paddingSmall,
    },
    textAddress: {
      flex: 1,
      overflow: 'hidden',
      color: colors.onBackground,
    },
    shopContainer: {
      width: '100%',
      height: 50,
      borderRadius: MyDimensions.borderRadiusSmall,
      borderWidth: 1,
      paddingHorizontal: MyDimensions.paddingMedium,
      flexDirection: 'row',
      borderColor: getColorOpacity(colors.outline, 0.5),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
