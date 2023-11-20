import {useCallback, useEffect, useMemo} from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {ActivityIndicator, Button, useTheme} from 'react-native-paper';
import {
  ButtonSection,
  CustomText,
  HeaderSection,
  InputSection,
} from '../../components';
import {Translation} from 'react-i18next';
import {MyDimensions} from '../../constants';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {Controller, useForm} from 'react-hook-form';
import {regexFormatHelper} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {postSignIn, removeErrors} from '../../store/auth/authSlice';
import {AuthStackTypes} from '../../types';

interface Props {
  navigation: AuthStackTypes.AuthStackNavigationScreenProps<'SignInScreen'>;
}

export default function SignInScreen({navigation}: Props) {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.authState.isLoading);
  const errorMes = useAppSelector(state => state.authState.errorMes);

  const colors = useMemo(() => theme.colors, [theme]);

  const styles = useMemo(() => styling(colors), [colors]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'tms1932k1@gmail.com',
      password: 'dt0932782114',
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

  // Navigate to [ForgotPasswordScreen]
  const navigateForgotPasswordScreen = useCallback(() => {
    navigation.navigate('ForgotPasswordScreen');
  }, []);

  // Navigate to [SignUpScreen]
  const navigateSignUpScreen = useCallback(() => {
    navigation.navigate('SignUpScreen');
  }, [navigation]);

  // Handle sign in account
  const signInWithEmailPasword = handleSubmit(data => {
    dispatch(postSignIn(data));
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
        {t => <HeaderSection title={t('signin')} subtitle={t('signinSub')} />}
      </Translation>
    ),
    [],
  );

  const forgetBtn = useMemo(
    () => (
      <Translation>
        {t => (
          <Button
            style={styles.forgotBtn}
            onPress={navigateForgotPasswordScreen}>
            <CustomText variant="body1" style={styles.forgetText}>
              {t('forgotPassword')}
            </CustomText>
          </Button>
        )}
      </Translation>
    ),
    [navigateForgotPasswordScreen],
  );

  const signUpBtn = useMemo(
    () => (
      <Translation>
        {t => (
          <Button style={styles.signUpBtn} onPress={navigateSignUpScreen}>
            <CustomText variant="body2" style={styles.signUpText}>
              {t('newMember')}{' '}
              <CustomText variant="body1" style={styles.forgetText}>
                {t('signup')}
              </CustomText>
            </CustomText>
          </Button>
        )}
      </Translation>
    ),
    [navigateSignUpScreen],
  );

  return (
    <View style={styles.container}>
      {statusBar}
      {headerSection}
      <ScrollView style={styles.inputsContainer}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: regexFormatHelper.regEmail,
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
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            pattern: regexFormatHelper.regPassword,
          }}
          render={({field: {onChange, value}}) => (
            <Translation>
              {t => (
                <InputSection
                  value={value}
                  error={errors.password ? t('passwordInvalid') : undefined}
                  onChangeText={onChange}
                  style={styles.inputMarginTop}
                  icon="lock"
                  placeholder={t('placeholderPassword')}
                  isCanSecureText={true}
                />
              )}
            </Translation>
          )}
        />
        {forgetBtn}
        {signUpBtn}
      </ScrollView>
      {!isLoading && (
        <Translation>
          {t => (
            <ButtonSection
              errorMes={errorMes}
              onPress={signInWithEmailPasword}
              style={styles.submitContainer}>
              {t('signin')}
            </ButtonSection>
          )}
        </Translation>
      )}
      {isLoading && <ActivityIndicator animating={true} />}
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
    inputsContainer: {
      flex: 1,
      marginTop: MyDimensions.paddingLarge,
    },
    inputMarginTop: {
      marginTop: MyDimensions.paddingMedium,
    },
    forgotBtn: {
      marginTop: MyDimensions.paddingLarge,
    },
    forgetText: {
      color: colors.primary,
    },
    signUpBtn: {
      marginTop: MyDimensions.paddingSmall,
    },
    signUpText: {
      color: colors.outline,
    },
    submitContainer: {
      marginTop: MyDimensions.paddingLarge,
    },
  });
