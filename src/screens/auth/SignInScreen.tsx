import {useCallback, useLayoutEffect, useMemo} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
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

interface Props {
  navigation: AuthStackNavigationScreenProps<'OnboardingScreen'>;
}

export default function SignInScreen({navigation}: Props) {
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
    });
  }, [navigation]);

  // Navigate to [ForgotPasswordScreen]
  const navigateForgotPasswordScreen = useCallback(() => {}, []);

  // Navigate to [SignUpScreen]
  const navigateSignUpScreen = useCallback(() => {}, []);

  // Handle sign in account
  const onSignIn = useCallback(() => {}, []);

  const colors = useMemo(() => theme.colors, [theme]);
  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={styles.inputsContainer}>
        <Translation>
          {t => <HeaderSection title={t('signin')} subtitle={t('signinSub')} />}
        </Translation>
        <Translation>
          {t => (
            <InputSection
              style={styles.inputMarginTop}
              icon="email"
              placeholder={t('placeholderEmail')}
            />
          )}
        </Translation>
        <Translation>
          {t => (
            <InputSection
              style={styles.inputMarginTop}
              icon="lock"
              placeholder={t('placeholderPassword')}
              isCanSecureText={true}
            />
          )}
        </Translation>
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
        <Translation>
          {t => (
            <Button style={styles.signUpBtn} onPress={navigateSignUpScreen}>
              <CustomText variant="body1" style={styles.signUpText}>
                New member?{' '}
                <CustomText variant="body1" style={styles.forgetText}>
                  Sign up
                </CustomText>
              </CustomText>
            </Button>
          )}
        </Translation>
      </View>
      <Translation>
        {t => (
          <ContainedButton onPress={onSignIn}>{t('signin')}</ContainedButton>
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
    },
    inputMarginTop: {
      marginTop: MyDimensions.paddingLarge,
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
  });
