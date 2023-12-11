import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {
  HomeStackNavigationScreenProps,
  HomeStackRouteScreenProps,
} from '../../types/stack';
import {useCallback, useEffect, useLayoutEffect, useMemo} from 'react';
import {ContainedButton, CustomStatusBar} from '../../components/common';
import {useTranslation} from 'react-i18next';
import {MyDimensions} from '../../constants';
import {Controller, useForm} from 'react-hook-form';
import {EditUserForm} from '../../types/auth';
import {
  DropdownProfileSession,
  InputProfileSession,
} from '../../components/edit_profile';
import {regEmail, regPhone} from '../../utils/regexFormat';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {District, Province, Ward} from '../../types/address';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  setDistrict,
  setInit,
  setProvince,
} from '../../store/shipto/addressSlice';
import {updateUser} from '../../store/auth/authSlice';

interface Props {
  navigation: HomeStackNavigationScreenProps<'EditProfileScreen'>;
}

export default function EditProfileScreen({navigation}: Props) {
  const {t} = useTranslation();
  const route = useRoute<HomeStackRouteScreenProps<'EditProfileScreen'>>();

  const dispatch = useAppDispatch();

  const provinces = useAppSelector(state => state.addressState.provinces);
  const districts = useAppSelector(state => state.addressState.districts);
  const wards = useAppSelector(state => state.addressState.wards);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<EditUserForm>({
    defaultValues: {},
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('editProfile'),
    });
  }, [navigation, route]);

  useEffect(() => {
    const user = route.params?.user;
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);

      setValue('address', user.location?.address);

      dispatch(setInit(user?.location));
      if (user.location) {
        setValue('address', user.location.address);
        setValue('province', user.location.province);
        setValue('district', user.location.district);
        setValue('ward', user.location.ward);
      }
    }
  }, [route]);

  // Handle select province with hook form and state
  const selectProvince = useCallback(
    (province: Province, onchange: (item: Province) => void) => {
      dispatch(setProvince(province));
      setValue('district', undefined);
      setValue('ward', undefined);
      onchange(province);
    },
    [],
  );

  // Handle select district with hook form and state
  const selectDistrict = useCallback(
    (district: District, onchange: (item: District) => void) => {
      dispatch(setDistrict(district));
      setValue('ward', undefined);
      onchange(district);
    },
    [],
  );

  const onSubmit = handleSubmit(data => {
    navigation.navigate('HomeTabNavigator', {screen: 'HomeScreen'});
    const isUpdateAddress =
      data.address && data.province && data.district && data.ward
        ? true
        : false;

    dispatch(
      updateUser({
        user: route.params!.user,
        attrs: isUpdateAddress
          ? {
              name: data.name,
              email: data.email,
              phone: data.phone,
              location: {
                address: data.address!,
                province: data.province!,
                district: data.district!,
                ward: data.ward!,
                long: 0,
                lat: 0,
              },
            }
          : {
              name: data.name,
              email: data.email,
              phone: data.phone,
            },
      }),
    );
  });

  const inputProfileView = useMemo(
    () => (
      <View>
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputProfileSession
              title={t('username')}
              placeholder={t('placeholderUsername')}
              value={value}
              onChange={onChange}
              keyboardType="default"
              isError={errors.name ? true : false}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: regEmail,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputProfileSession
              style={styles.inputContainer}
              title={t('email')}
              placeholder={t('placeholderEmail')}
              value={value}
              onChange={onChange}
              keyboardType="default"
              isError={errors.email ? true : false}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          rules={{
            required: true,
            pattern: regPhone,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputProfileSession
              style={styles.inputContainer}
              title={t('phone')}
              placeholder={t('placeholderPhone')}
              value={value}
              onChange={onChange}
              keyboardType="numeric"
              isError={errors.phone ? true : false}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({field: {onChange, onBlur, value}}) => (
            <InputProfileSession
              style={styles.inputContainer}
              title={t('address')}
              placeholder={t('placeholderAddress')}
              value={value}
              onChange={onChange}
              keyboardType="default"
              isError={errors.address ? true : false}
            />
          )}
        />
      </View>
    ),
    [control, styles, t, errors],
  );

  const dropdownsView = useMemo(
    () => (
      <View>
        <Controller
          control={control}
          name="province"
          render={({field: {onChange, onBlur, value}}) => (
            <DropdownProfileSession<Province>
              list={provinces}
              onChange={item => selectProvince(item, onChange)}
              disable={false}
              valueField="code"
              labelField="name"
              value={value}
              placeholder={t('placeHolderProvinces')}
              style={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="district"
          render={({field: {onChange, onBlur, value}}) => (
            <DropdownProfileSession<District>
              list={districts}
              onChange={item => selectDistrict(item, onChange)}
              disable={false}
              valueField="code"
              labelField="name"
              value={value}
              placeholder={t('placeHolderDistricts')}
              style={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="ward"
          render={({field: {onChange, onBlur, value}}) => (
            <DropdownProfileSession<Ward>
              list={wards}
              onChange={onChange}
              disable={false}
              valueField="code"
              labelField="name"
              value={value}
              placeholder={t('placeHolderWards')}
              style={styles.inputContainer}
            />
          )}
        />
      </View>
    ),
    [styles, t, provinces, wards, districts],
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.contentView} behavior="padding">
        <CustomStatusBar />
        <ScrollView style={styles.contentView}>
          {inputProfileView}
          {dropdownsView}
        </ScrollView>
      </KeyboardAvoidingView>
      <ContainedButton onPress={onSubmit}>{t('save')}</ContainedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MyDimensions.paddingLarge,
    paddingTop: MyDimensions.paddingMedium,
    paddingBottom: MyDimensions.navbarHeight + MyDimensions.paddingMedium,
  },
  contentView: {
    flex: 1,
  },
  inputContainer: {
    marginTop: MyDimensions.paddingMedium,
  },
});
