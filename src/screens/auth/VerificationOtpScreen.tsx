import {View, StyleSheet} from 'react-native';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {Button, useTheme} from 'react-native-paper';
import {Translation} from 'react-i18next';
import {MyDimensions} from '../../constants';
import {useRoute} from '@react-navigation/native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {postVerification} from '../../store/auth/authSlice';
import {checkFullfillOtp} from '../../utils/otpInput';
import {useAppDispatch} from '../../store/hooks';
import {
  HomeStackNavigationScreenProps,
  HomeStackRouteScreenProps,
} from '../../types/stack';
import {AuthHeaderSection, OtpInputsSection} from '../../components/auth';
import {CustomStatusBar, CustomText} from '../../components/common';

interface Props {
  navigation: HomeStackNavigationScreenProps<'VerificationOtpScreen'>;
}

export default function VerificationOtpScreen({navigation}: Props) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

  const route = useRoute<HomeStackRouteScreenProps<'VerificationOtpScreen'>>();

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

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const email = useMemo(() => route.params.email, [route]);

  // Check fullfill to verify otp codes and pop [SignUpScreen]
  const onChangeOtpCodes = useCallback(
    (otp: Array<string | undefined>) => {
      if (checkFullfillOtp(otp)) {
        // Verify otp codes with otp codes and email
        dispatch(postVerification({otp: otp.join(''), email: email}));

        // Navigate to [SignUpScreen]
        navigation.navigate('SignUpScreen', {otp: otp.join('')});
      }
    },
    [navigation],
  );

  const resendOtp = useCallback(() => {
    setSeconds(30);
  }, []);

  const headerSection = useMemo(
    () => (
      <Translation>
        {t => (
          <AuthHeaderSection
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
      <CustomStatusBar />
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
