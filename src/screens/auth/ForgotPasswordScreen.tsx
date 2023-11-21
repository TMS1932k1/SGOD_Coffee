import {View, StyleSheet, StatusBar} from 'react-native';
import {useEffect, useMemo} from 'react';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {MyDimensions} from '../../constants';
import {Translation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {postforgotPassword, removeErrors} from '../../store/auth/authSlice';
import {regEmail} from '../../utils/regexFormat';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {HomeStackNavigationScreenProps} from '../../types/stack';
import {
  AuthHeaderSection,
  ButtonSection,
  InputSection,
} from '../../components/auth';

interface Props {
  navigation: HomeStackNavigationScreenProps<'ForgotPasswordScreen'>;
}

export default function ForgotPasswordScreen({navigation}: Props) {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.authState.isLoading);
  const errorMes = useAppSelector(state => state.authState.errorMes);

  const colors = useMemo(() => theme.colors, [theme]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'tms1932k1@gmail.com',
    },
  });

  // Remove errorMes before navigate
  useEffect(() => {
    navigation.addListener('transitionStart', event => {
      dispatch(removeErrors());
    });
    navigation.addListener('beforeRemove', event => {
      dispatch(removeErrors());
    });
  }, [navigation]);

  // Handle get password by email input
  const onGetPasswordByEmail = handleSubmit(data => {
    dispatch(postforgotPassword(data))
      .unwrap()
      .then(result => {
        if (!result) {
          dispatch(removeErrors());
          navigation.navigate('SignInScreen');
        }
      });
  });

  const statusBar = useMemo(
    () => (
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
    ),
    [colors, theme],
  );

  const headerSection = useMemo(
    () => (
      <Translation>
        {t => (
          <AuthHeaderSection
            title={t('forgotPassword')}
            subtitle={t('forgotPasswordSub')}
          />
        )}
      </Translation>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {statusBar}
      {headerSection}
      <View style={styles.inputsContainer}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: regEmail,
          }}
          render={({field: {onChange, value}}) => (
            <Translation>
              {t => (
                <InputSection
                  value={value}
                  error={errors.email ? t('emailInvalid') : undefined}
                  onChangeText={onChange}
                  icon="email"
                  placeholder={t('placeholderEmail')}
                />
              )}
            </Translation>
          )}
        />
      </View>
      {!isLoading && (
        <Translation>
          {t => (
            <ButtonSection
              errorMes={errorMes}
              onPress={onGetPasswordByEmail}
              style={styles.submitContainer}>
              {t('continue')}
            </ButtonSection>
          )}
        </Translation>
      )}
      {isLoading && <ActivityIndicator animating={true} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MyDimensions.paddingLarge,
    paddingBottom: MyDimensions.paddingLarge,
  },
  inputsContainer: {
    flex: 1,
    marginTop: MyDimensions.paddingLarge,
  },
  submitContainer: {
    marginTop: MyDimensions.paddingLarge,
  },
});
