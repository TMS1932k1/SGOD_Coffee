import {View, StyleProp, ViewStyle, StyleSheet, Pressable} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import {getColorOpacity} from '../../../utils/colorOpacity';
import {CustomText} from '../../common';
import {
  ActivityIndicator,
  Icon,
  IconButton,
  useTheme,
} from 'react-native-paper';
import {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {Translation} from 'react-i18next';
import Animated, {
  FadeInUp,
  FadeOutUp,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import StoresModal from './StoresModal';
import {getFullAddressString} from '../../../utils/getFormat';
import {getStoresArray, setIsShip} from '../../../store/order/orderSlice';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../../types/stack';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function AddressOption({style}: Props) {
  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'OrderScreen'>>();

  const dispatch = useAppDispatch();

  const store = useAppSelector(state => state.orderState.store);
  const stores = useAppSelector(state => state.orderState.stores);
  const shipTo = useAppSelector(state => state.orderState.shipTo);
  const isLoading = useAppSelector(state => state.orderState.isLoadingStores);
  const isShip = useAppSelector(state => state.orderState.isShip);

  const heightAnimation = useSharedValue(isShip ? 236 : 150);

  const [isShowStoresModal, setShowStoresModal] = useState(false);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  useLayoutEffect(() => {
    if (!stores) {
      dispatch(getStoresArray());
    }
  }, [stores]);

  const addShipTo = useCallback(() => {
    navigation.navigate('ShipToScreen');
  }, [navigation]);

  // Handle when on click onsite
  const onClickOnSite = useCallback(() => {
    if (isShip) {
      heightAnimation.value = withTiming(heightAnimation.value - 86);
      dispatch(setIsShip(false));
    }
  }, [isShip]);

  // Handle when on click take away
  const onClickTakeAway = useCallback(() => {
    if (!isShip) {
      heightAnimation.value = withTiming(heightAnimation.value + 86);
      dispatch(setIsShip(true));
    }
  }, [isShip]);

  // Show modal to choose store
  const showStoresModal = useCallback(() => {
    setShowStoresModal(true);
  }, []);

  // Dismiss modal to choose store
  const dismissStoreModal = useCallback(() => {
    setShowStoresModal(false);
  }, []);

  const tilte = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>
            {`${t('onSite')} / ${t('ship')}`}
          </CustomText>
        )}
      </Translation>
    ),
    [styles],
  );

  const optionsView = useMemo(
    () => (
      <View style={styles.onsiteTakeAwayOption}>
        <IconButton
          icon={'food'}
          size={MyDimensions.iconLarge}
          iconColor={isShip ? colors.outline : colors.primary}
          onPress={onClickOnSite}
        />
        <IconButton
          icon={'truck'}
          size={MyDimensions.iconLarge}
          iconColor={!isShip ? colors.outline : colors.primary}
          onPress={onClickTakeAway}
        />
      </View>
    ),
    [onClickOnSite, onClickTakeAway, colors, isShip],
  );

  const addressStore = useMemo(
    () => (
      <View>
        <Translation>
          {t => (
            <CustomText style={styles.titleAddress} variant="body1">{`${t(
              'store',
            )}:`}</CustomText>
          )}
        </Translation>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          <Pressable style={styles.storeContainer} onPress={showStoresModal}>
            {store && (
              <CustomText
                style={styles.textAddress}
                variant="body1"
                numberOfLines={1}>
                {`${store!.name}, ${getFullAddressString(store!.location)}`}
              </CustomText>
            )}
            <Icon
              source={'map-marker'}
              size={MyDimensions.iconMedium}
              color={colors.outline}
            />
          </Pressable>
        )}
        <StoresModal
          visible={isShowStoresModal}
          onHideModal={dismissStoreModal}
        />
      </View>
    ),
    [styles, colors, store, isShowStoresModal, isLoading],
  );

  const shipView = useMemo(
    () => (
      <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
        <Translation>
          {t => (
            <CustomText style={styles.titleAddress} variant="body1">{`${t(
              'shipTo',
            )}:`}</CustomText>
          )}
        </Translation>
        <Pressable
          onPress={addShipTo}
          style={({pressed}) => [
            styles.adrressContainer,
            pressed && styles.opacity,
          ]}>
          <Translation>
            {t => (
              <CustomText
                style={styles.textAddress}
                variant="body1"
                numberOfLines={1}>
                {!shipTo ? t('addShipTo') : getFullAddressString(shipTo)}
              </CustomText>
            )}
          </Translation>
          <Icon
            source={'truck'}
            size={MyDimensions.iconMedium}
            color={colors.outline}
          />
        </Pressable>
      </Animated.View>
    ),
    [styles, shipTo],
  );

  return (
    <Animated.View
      style={[
        styles.onsiteTakeAwayContainer,
        {height: heightAnimation},
        style,
      ]}>
      <View style={styles.onsiteTakeAwayRow}>
        {tilte}
        {optionsView}
      </View>
      {addressStore}
      {isShip && shipView}
    </Animated.View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    onsiteTakeAwayContainer: {
      paddingHorizontal: MyDimensions.paddingSmall,
      marginTop: MyDimensions.paddingLarge,
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
    loading: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    adrressContainer: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      paddingHorizontal: MyDimensions.paddingMedium,
      borderRadius: MyDimensions.borderRadiusMedium,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: MyDimensions.paddingSmall,
      borderColor: getColorOpacity(colors.outline, 0.5),
      borderWidth: 1,
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
    titleAddress: {
      color: colors.onBackground,
      marginTop: MyDimensions.paddingSmall,
    },
    storeContainer: {
      width: '100%',
      height: 50,
      borderRadius: MyDimensions.borderRadiusSmall,
      borderWidth: 1,
      paddingHorizontal: MyDimensions.paddingMedium,
      marginTop: MyDimensions.paddingSmall,
      flexDirection: 'row',
      borderColor: getColorOpacity(colors.outline, 0.5),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    opacity: {
      opacity: 0.7,
    },
  });
