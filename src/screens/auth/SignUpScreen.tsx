import {useCallback, useEffect, useMemo, useState} from 'react';
import {Translation} from 'react-i18next';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {ActivityIndicator, Button, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  ButtonSection,
  CustomText,
  HeaderSection,
  SignUpInputs,
  TermsModal,
} from '../../components';
import {MyDimensions} from '../../constants';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {postSignUp, removeErrors} from '../../store/auth/authSlice';
import {AuthStackNavigationScreenProps} from '../../types';

interface Props {
  navigation: AuthStackNavigationScreenProps<'SignUpScreen'>;
}

export default function SignUpScreen({navigation}: Props) {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

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
      username: 'Son',
      phone: '0932782114',
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

  // Show term of use modal view
  const showTermOfUseModal = useCallback(() => setVisible(true), []);

  // Hide term of use modal view
  const hideTermOfUseModal = useCallback(() => setVisible(false), []);

  // Handle sign up account
  const signUpWithEmailPasword = handleSubmit(data => {
    dispatch(postSignUp(data))
      .unwrap()
      .then(result => {
        if (!result) {
          navigation.navigate('VerificationOtpScreen', {email: data.email});
        }
      });
  });

  // Navigate pop to [SignInScreen]
  const navigateSignInScreen = useCallback(() => {
    navigation.navigate('SignInScreen');
  }, [navigation]);

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
        {t => <HeaderSection title={t('signup')} subtitle={t('signupSub')} />}
      </Translation>
    ),
    [],
  );

  const termsBtn = useMemo(
    () => (
      <Translation>
        {t => (
          <Button style={styles.termsBtn} onPress={showTermOfUseModal}>
            <CustomText variant="body2" style={styles.textColor}>
              {t('termsTextBtn')}
            </CustomText>
          </Button>
        )}
      </Translation>
    ),
    [],
  );

  const signInBtn = useMemo(
    () => (
      <Translation>
        {t => (
          <Button style={styles.signInBtn} onPress={navigateSignInScreen}>
            <CustomText variant="body2" style={styles.signInText}>
              {t('alreadyMember')}{' '}
              <CustomText variant="body1" style={styles.textColor}>
                {t('signin')}
              </CustomText>
            </CustomText>
          </Button>
        )}
      </Translation>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {statusBar}
      {headerSection}
      <ScrollView style={styles.inputsContainer}>
        <SignUpInputs control={control} errors={errors} />
        {termsBtn}
        {signInBtn}
      </ScrollView>
      {!isLoading && (
        <Translation>
          {t => (
            <ButtonSection
              errorMes={errorMes}
              onPress={signUpWithEmailPasword}
              style={styles.submitContainer}>
              {t('signup')}
            </ButtonSection>
          )}
        </Translation>
      )}
      {isLoading && <ActivityIndicator animating={true} />}
      <TermsModal visible={visible} onHideModal={hideTermOfUseModal} />
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
    termsBtn: {
      marginTop: MyDimensions.paddingLarge,
    },
    textColor: {
      color: colors.primary,
    },
    signInBtn: {
      marginTop: MyDimensions.paddingSmall,
    },
    signInText: {
      color: colors.outline,
    },
    submitContainer: {
      marginTop: MyDimensions.paddingLarge,
    },
  });
