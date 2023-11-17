import {View, StatusBar, StyleSheet} from 'react-native';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, useTheme} from 'react-native-paper';
import {Translation} from 'react-i18next';
import {CustomText, HeaderSection, OtpInputsSection} from '../../components';
import {MyDimensions} from '../../constants';
import {useRoute} from '@react-navigation/native';
import {
  AuthStackNavigationScreenProps,
  AuthStackRouteScreenProps,
} from '../../routes';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {otpInputHelper} from '../../utils';
import {useAppDispatch} from '../../store/store';
import {postVerification} from '../../store/auth/authSlice';

interface Props {
  navigation: AuthStackNavigationScreenProps<'VerificationOtpScreen'>;
}

export default function VerificationOtpScreen({navigation: naviagtion}: Props) {
  const dispatch = useAppDispatch();

  const route = useRoute<AuthStackRouteScreenProps<'VerificationOtpScreen'>>();

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    // Decrease the countdown every second
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
      if (seconds <= 0) {
      }
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  const theme = useTheme();

  const colors = useMemo(() => theme.colors, [theme]);

  const styles = useMemo(() => styling(colors), [colors]);

  const email = useMemo(() => route.params.email, [route]);

  // Check fullfill to verify otp codes and pop [SignUpScreen]
  const onChangeOtpCodes = useCallback(
    (otp: Array<string | undefined>) => {
      if (otpInputHelper.checkFullfillOtp(otp)) {
        // Verify otp codes with otp codes and email
        dispatch(postVerification({otp: otp.join(''), email: email}));

        // Navigate to [SignUpScreen]
        naviagtion.navigate('SignUpScreen', {otp: otp.join('')});
      }
    },
    [naviagtion],
  );

  const resendOtp = useCallback(() => {
    setSeconds(30);
  }, []);

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
          <HeaderSection
            title={t('verification')}
            subtitle={t('verificationSub', {email: email})}
          />
        )}
      </Translation>
    ),
    [],
  );

  const otpInputs = useMemo(
    () => (
      <OtpInputsSection
        style={styles.otpInputs}
        numberLength={4}
        onChange={onChangeOtpCodes}
      />
    ),
    [onChangeOtpCodes],
  );

  return (
    <View style={styles.container}>
      {statusBar}
      {headerSection}
      {otpInputs}
      <Translation>
        {t => (
          <Button
            style={styles.countDownTimerBtn}
            onPress={seconds <= 0 ? resendOtp : undefined}>
            <CustomText variant="body2" style={styles.countDownText}>
              {seconds <= 0
                ? t('resendTitle')
                : t('resendCountDown', {time: seconds})}
            </CustomText>
          </Button>
        )}
      </Translation>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingLarge,
    },
    otpInputs: {
      marginTop: MyDimensions.paddingLarge,
    },
    countDownTimerBtn: {
      marginTop: MyDimensions.paddingLarge,
    },
    countDownText: {
      color: colors.outline,
    },
  });
