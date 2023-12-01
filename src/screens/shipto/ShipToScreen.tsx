import {StyleSheet, TextInput, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {useCallback, useEffect, useLayoutEffect, useMemo} from 'react';
import {Translation, useTranslation} from 'react-i18next';
import {
  ContainedButton,
  CustomStatusBar,
  CustomText,
} from '../../components/common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  setDistrict,
  setInit,
  setProvince,
} from '../../store/shipto/addressSlice';
import {fontFamily} from '../../themes';
import {District, FormShipTo, Province, Ward} from '../../types/address';
import {Location} from '../../types/order';
import {LocationDropdown, UserLocation} from '../../components/shipto';
import {HomeStackNavigationScreenProps} from '../../types/stack';
import {Controller, useForm} from 'react-hook-form';
import {setPhoneOrder, setShipTo} from '../../store/order/orderSlice';
import {regPhone} from '../../utils/regexFormat';

interface Props {
  navigation: HomeStackNavigationScreenProps<'ShipToScreen'>;
}

export default function ShipToScreen({navigation}: Props) {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
  } = useForm<FormShipTo>({
    defaultValues: {},
  });

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.authState.user);
  const currentLocation = useAppSelector(state => state.orderState.shipTo);
  const currentPhone = useAppSelector(state => state.orderState.phone);
  const provinces = useAppSelector(state => state.addressState.provinces);
  const districts = useAppSelector(state => state.addressState.districts);
  const wards = useAppSelector(state => state.addressState.wards);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  const {t} = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('addShipTo'),
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(setInit(currentLocation));
    if (currentLocation) {
      setValue('address', currentLocation.address);
      setValue('province', currentLocation.province);
      setValue('district', currentLocation.district);
      setValue('ward', currentLocation.ward);
    }
    if (currentPhone) {
      setValue('phone', currentPhone);
    }
  }, [currentLocation, currentPhone]);

  // Get user's location to set into state
  const getUserLocation = useCallback((location: Location, phone: string) => {
    dispatch(setInit(location));
    setValue('address', location.address);
    setValue('province', location.province);
    setValue('district', location.district);
    setValue('ward', location.ward);
    setValue('phone', phone);
  }, []);

  // Handle select province with hook form and state
  const selectProvince = useCallback(
    (province: Province, onchange: (item: Province) => void) => {
      dispatch(setProvince(province));
      onchange(province);
    },
    [],
  );

  // Handle select district with hook form and state
  const selectDistrict = useCallback(
    (district: District, onchange: (item: District) => void) => {
      dispatch(setDistrict(district));
      onchange(district);
    },
    [],
  );

  // Handle submit add address
  const onSubmit = handleSubmit(data => {
    navigation.pop();
    dispatch(
      setShipTo({
        address: data.address!,
        province: data.province!,
        district: data.district!,
        ward: data.ward!,
        long: 0,
        lat: 0,
      }),
    );
    dispatch(setPhoneOrder(data.phone!));
  });

  const inputHome = useMemo(
    () => (
      <View style={styles.inputContainer}>
        <Translation>
          {t => (
            <CustomText style={styles.inputTitle} variant="body1">
              {`${t('homeDetail')}:`}
            </CustomText>
          )}
        </Translation>
        <Translation>
          {t => (
            <Controller
              control={control}
              name="address"
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={[
                    styles.input,
                    styles.text,
                    errors.address ? styles.errorColor : styles.notErrorColor,
                  ]}
                  maxLength={50}
                  numberOfLines={1}
                  value={value}
                  keyboardType="default"
                  onChangeText={onChange}
                  placeholder={t('homeDetailHint')}
                  placeholderTextColor={
                    errors.address ? colors.error : colors.outline
                  }
                  cursorColor={colors.primary}
                />
              )}
            />
          )}
        </Translation>
      </View>
    ),
    [styles, colors, control, errors.address],
  );

  const inputPhone = useMemo(
    () => (
      <View style={styles.inputContainer}>
        <Translation>
          {t => (
            <CustomText style={styles.inputTitle} variant="body1">
              {`${t('phone')}:`}
            </CustomText>
          )}
        </Translation>
        <Translation>
          {t => (
            <Controller
              control={control}
              rules={{required: true, pattern: regPhone}}
              name="phone"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={[
                    styles.input,
                    styles.text,
                    errors.phone ? styles.errorColor : styles.notErrorColor,
                  ]}
                  maxLength={20}
                  numberOfLines={1}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  placeholder={t('placeholderPhone')}
                  placeholderTextColor={
                    errors.phone ? colors.error : colors.outline
                  }
                  cursorColor={colors.primary}
                />
              )}
            />
          )}
        </Translation>
      </View>
    ),
    [styles, colors, control, errors.phone],
  );

  const provincesView = useMemo(
    () => (
      <Translation>
        {t => (
          <Controller
            control={control}
            name="province"
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <LocationDropdown<Province>
                list={provinces}
                disable={provinces.length <= 0}
                onChange={item => selectProvince(item, onChange)}
                value={value}
                labelField="name"
                valueField="code"
                placeholder={t('placeHolderProvinces')}
                isError={errors.province ? true : false}
              />
            )}
          />
        )}
      </Translation>
    ),
    [styles, provinces, control, errors.province],
  );

  const districtsView = useMemo(
    () => (
      <Translation>
        {t => (
          <Controller
            control={control}
            name="district"
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <LocationDropdown<District>
                list={districts}
                disable={districts.length <= 0}
                onChange={item => selectDistrict(item, onChange)}
                value={value}
                labelField="name"
                valueField="code"
                placeholder={t('placeHolderDistricts')}
                isError={errors.district ? true : false}
              />
            )}
          />
        )}
      </Translation>
    ),
    [styles, districts, control, errors.district],
  );

  const wardsView = useMemo(
    () => (
      <Translation>
        {t => (
          <Controller
            control={control}
            name="ward"
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <LocationDropdown<Ward>
                list={wards}
                disable={wards.length <= 0}
                onChange={onChange}
                value={value}
                labelField="name"
                valueField="code"
                placeholder={t('placeHolderWards')}
                isError={errors.ward ? true : false}
              />
            )}
          />
        )}
      </Translation>
    ),
    [styles, wards, control, errors.ward],
  );

  const submitView = useMemo(
    () => (
      <Translation>
        {t => (
          <ContainedButton onPress={onSubmit} style={styles.submitBtn}>
            {t('add')}
          </ContainedButton>
        )}
      </Translation>
    ),
    [styles, control],
  );

  const userLocationView = useMemo(
    () =>
      user?.location && (
        <UserLocation
          user={user}
          style={styles.locationUser}
          onGet={getUserLocation}
        />
      ),
    [user, getUserLocation],
  );

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      {userLocationView}
      <View style={styles.contentContainer}>
        {inputPhone}
        {inputHome}
        {provincesView}
        {districtsView}
        {wardsView}
      </View>
      {submitView}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingLarge,
    },
    locationUser: {
      marginTop: MyDimensions.paddingMedium,
    },
    contentContainer: {
      flex: 1,
      marginTop: MyDimensions.paddingMedium,
      paddingHorizontal: MyDimensions.paddingSmall,
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
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputTitle: {
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
    errorColor: {
      color: colors.error,
    },
    notErrorColor: {
      color: colors.onBackground,
    },
  });
