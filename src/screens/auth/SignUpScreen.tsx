import {useCallback, useMemo, useState} from 'react';
import {Translation} from 'react-i18next';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {
  ContainedButton,
  CustomText,
  HeaderSection,
  SignUpInputs,
  TermsModal,
} from '../../components';
import {MyDimensions} from '../../constants';
import {useForm} from 'react-hook-form';
import {AuthStackNavigationScreenProps} from '../../routes';

interface Props {
  navigation: AuthStackNavigationScreenProps<'OnboardingScreen'>;
}

export default function SignUpScreen({navigation}: Props) {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  const colors = useMemo(() => theme.colors, [theme]);

  const styles = useMemo(() => styling(colors), [colors]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      phone: '',
      email: '',
      password: '',
    },
  });

  // Show term of use modal view
  const showTermOfUseModal = useCallback(() => setVisible(true), []);

  // Hide term of use modal view
  const hideTermOfUseModal = useCallback(() => setVisible(false), []);

  // Handle sign up account
  const signUpWithEmailPasword = handleSubmit(data => {
    console.log({data});
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

  const inputsView = useMemo(
    () => <SignUpInputs control={control} errors={errors} />,
    [errors, control],
  );

  return (
    <View style={styles.container}>
      {statusBar}
      {headerSection}
      <ScrollView style={styles.inputsContainer}>
        {inputsView}
        {termsBtn}
        {signInBtn}
      </ScrollView>
      <Translation>
        {t => (
          <ContainedButton
            onPress={signUpWithEmailPasword}
            style={styles.signUpBtn}>
            {t('signup')}
          </ContainedButton>
        )}
      </Translation>
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
    signUpBtn: {
      marginTop: MyDimensions.paddingLarge,
    },
  });
