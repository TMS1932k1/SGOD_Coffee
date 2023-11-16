import {useCallback, useMemo} from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {AuthStackNavigationScreenProps} from '../../routes';
import {
  ContainedButton,
  CustomText,
  HeaderSection,
  InputSection,
} from '../../components';
import {Translation} from 'react-i18next';
import {MyDimensions} from '../../constants';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {Controller, useForm} from 'react-hook-form';
import {regexFormatHelper} from '../../utils';

interface Props {
  navigation: AuthStackNavigationScreenProps<'OnboardingScreen'>;
}

export default function SignInScreen({navigation}: Props) {
  const theme = useTheme();

  const colors = useMemo(() => theme.colors, [theme]);

  const styles = useMemo(() => styling(colors), [colors]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Navigate to [ForgotPasswordScreen]
  const navigateForgotPasswordScreen = useCallback(() => {}, []);

  // Navigate to [SignUpScreen]
  const navigateSignUpScreen = useCallback(() => {
    navigation.navigate('SignUpScreen');
  }, [navigation]);

  // Handle sign in account
  const signInWithEmailPasword = handleSubmit(data => {
    console.log({data});
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
      <Translation>
        {t => (
          <ContainedButton
            onPress={signInWithEmailPasword}
            style={styles.signInBtn}>
            {t('signin')}
          </ContainedButton>
        )}
      </Translation>
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
    signInBtn: {
      marginTop: MyDimensions.paddingLarge,
    },
  });
