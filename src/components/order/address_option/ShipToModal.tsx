import {StyleSheet, TextInput, View} from 'react-native';
import {Modal, Portal, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import {useCallback, useEffect, useMemo} from 'react';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {Translation} from 'react-i18next';
import {ContainedButton, CustomText, Line} from '../../common';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  setAddress,
  setDistrict,
  setInit,
  setProvince,
  setWard,
} from '../../../store/order/addressSlice';
import {Dropdown} from 'react-native-element-dropdown';
import {fontFamily} from '../../../themes';
import {District, Province, Ward} from '../../../types/address';
import {setShipTo} from '../../../store/order/orderSlice';

interface Props {
  visible?: boolean;
  onHideModal?: () => void;
}

export default function ShipToModal({visible = false, onHideModal}: Props) {
  const dispatch = useAppDispatch();

  const address = useAppSelector(state => state.addressState.address);

  const provinces = useAppSelector(state => state.addressState.provinces);
  const province = useAppSelector(state => state.addressState.province);

  const districts = useAppSelector(state => state.addressState.districts);
  const district = useAppSelector(state => state.addressState.district);

  const wards = useAppSelector(state => state.addressState.wards);
  const ward = useAppSelector(state => state.addressState.ward);

  const errorMes = useAppSelector(state => state.addressState.errorMes);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  useEffect(() => {
    if (visible) dispatch(setInit());
  }, [visible]);

  // Set selected province in dropdown to state
  const selectProvince = useCallback((province: Province) => {
    dispatch(setProvince(province));
  }, []);

  // Set selected district in dropdown to state
  const selectDistrict = useCallback((district: District) => {
    dispatch(setDistrict(district));
  }, []);

  // Set selected ward in dropdown to state
  const selectWard = useCallback((ward: Ward) => {
    dispatch(setWard(ward));
  }, []);

  // Set address to state when text input change text
  const changeAddress = useCallback((text: string) => {
    dispatch(setAddress(text));
  }, []);

  // Check fullfill info of shipto to can next handle
  const checkFullfill = useCallback(
    () => (province && district && ward && address ? true : false),
    [province, district, ward, address],
  );

  // Get address string
  const getAddressString = useCallback(() => {
    return [address, ward!.name, district!.name, province!.name].join(', ');
  }, [province, district, ward, address]);

  const inputHome = useMemo(
    () => (
      <View style={styles.inputHomeContainer}>
        <Translation>
          {t => (
            <CustomText style={styles.inputHomeTitle} variant="body1">
              {`${t('homeDetail')}:`}
            </CustomText>
          )}
        </Translation>
        <Translation>
          {t => (
            <TextInput
              style={[styles.input, styles.text]}
              maxLength={50}
              numberOfLines={1}
              value={address}
              keyboardType="default"
              onChangeText={changeAddress}
              placeholder={t('homeDetailHint')}
              placeholderTextColor={colors.outline}
              cursorColor={colors.primary}
            />
          )}
        </Translation>
      </View>
    ),
    [styles, colors, address, changeAddress],
  );

  const provincesView = useMemo(
    () => (
      <Translation>
        {t => (
          <Dropdown
            style={styles.dropdownContainer}
            placeholderStyle={styles.text}
            selectedTextStyle={styles.textSelect}
            data={provinces}
            disable={provinces.length <= 0}
            labelField="name"
            valueField="code"
            value={province}
            maxHeight={300}
            keyboardAvoiding={true}
            onChange={selectProvince}
            showsVerticalScrollIndicator={false}
            placeholder={t('placeHolderProvinces')}
          />
        )}
      </Translation>
    ),
    [styles, provinces, selectProvince, province],
  );

  const districtsView = useMemo(
    () => (
      <Translation>
        {t => (
          <Dropdown
            style={styles.dropdownContainer}
            placeholderStyle={styles.text}
            selectedTextStyle={styles.textSelect}
            data={districts}
            disable={districts.length <= 0}
            labelField="name"
            valueField="code"
            value={district}
            maxHeight={300}
            keyboardAvoiding={true}
            onChange={selectDistrict}
            showsVerticalScrollIndicator={false}
            placeholder={t('placeHolderDistricts')}
          />
        )}
      </Translation>
    ),
    [styles, districts, selectDistrict, district],
  );

  const wardsView = useMemo(
    () => (
      <Translation>
        {t => (
          <Dropdown
            style={styles.dropdownContainer}
            placeholderStyle={styles.text}
            selectedTextStyle={styles.textSelect}
            data={wards}
            disable={wards.length <= 0}
            labelField="name"
            valueField="code"
            value={ward}
            maxHeight={300}
            keyboardAvoiding={true}
            onChange={selectWard}
            showsVerticalScrollIndicator={false}
            placeholder={t('placeHolderWards')}
          />
        )}
      </Translation>
    ),
    [styles, wards, selectWard, ward],
  );

  const submitView = useMemo(
    () => (
      <Translation>
        {t => (
          <ContainedButton
            onPress={() => {
              if (onHideModal) onHideModal();
              dispatch(
                setShipTo({address: getAddressString(), lat: 0, long: 0}),
              );
            }}
            disabled={!checkFullfill()}
            style={styles.submitBtn}>
            {t('add')}
          </ContainedButton>
        )}
      </Translation>
    ),
    [styles, checkFullfill, getAddressString],
  );

  return (
    <Portal>
      <Modal style={styles.container} visible={visible} onDismiss={onHideModal}>
        <Animated.View entering={ZoomIn}>
          <View style={styles.modal}>
            <Translation>
              {t => (
                <CustomText style={styles.title} variant="subheading1">
                  {t('addShipTo')}
                </CustomText>
              )}
            </Translation>
            <Line style={styles.line} />
            {errorMes ? (
              <View style={styles.errorContainer}>
                <Translation>
                  {t => (
                    <CustomText style={styles.errorText} variant="body2">
                      {t('errorAddress')}
                    </CustomText>
                  )}
                </Translation>
              </View>
            ) : (
              <View style={styles.contentContainer}>
                {inputHome}
                {provincesView}
                {districtsView}
                {wardsView}
                {submitView}
              </View>
            )}
          </View>
        </Animated.View>
      </Modal>
    </Portal>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      width: 360,
      backgroundColor: colors.background,
      borderRadius: MyDimensions.borderRadiusMedium,
      alignItems: 'center',
      padding: MyDimensions.paddingMedium,
    },
    line: {
      marginTop: MyDimensions.paddingSmall,
    },
    title: {
      color: colors.onBackground,
    },
    errorContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      color: colors.error,
    },
    contentContainer: {
      width: '100%',
      marginTop: MyDimensions.paddingMedium,
      alignItems: 'center',
    },
    loadingContainer: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
      borderRadius: MyDimensions.borderRadiusSmall,
    },
    dropdownContainer: {
      width: '100%',
      height: 50,
    },
    submitBtn: {
      marginTop: MyDimensions.paddingMedium,
    },
    inputHomeContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputHomeTitle: {
      marginRight: MyDimensions.paddingSmall,
      color: colors.onBackground,
    },
    input: {
      flex: 1,
    },
    text: {
      fontSize: 16,
      fontFamily: fontFamily.mulishRegular,
      overflow: 'scroll',
    },
    textSelect: {
      fontSize: 16,
      fontFamily: fontFamily.mulishRegular,
      color: colors.onBackground,
    },
  });
