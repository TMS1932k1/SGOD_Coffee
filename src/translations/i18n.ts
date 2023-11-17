import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: {
        titleOnboarding: 'Coffee so good, your taste buds will love it.',
        subtitleOnboarding:
          'The best grain, the finest roast, the powerful flavor.',
        getStart: 'Get Started',
        signin: 'Sign in',
        signinSub: 'Welcome back',
        signup: 'Sign up',
        signupSub: 'Create an account here',
        placeholderEmail: 'Email address',
        placeholderPhone: 'Mobile Number',
        placeholderUsername: 'Create an account here',
        placeholderPassword: 'Password',
        forgotPassword: 'Forgot Password?',
        forgotPasswordSub: 'Enter your email address',
        emailInvalid: '* Your email is invalid!',
        passwordInvalid:
          '* Passwords must have least: a number, a letter and length from 8 to 32!',
        phoneInvalid: '* Your phone is invalid!',
        usenameInvalid: '* Your name must have min lenght more 3',
        newMember: 'New member?',
        termsTextBtn: 'By signing up you agree with our Terms of Use',
        alreadyMember: 'Already a member?',
        termsOfUseTitle: 'Terms of use',
        close: 'Close',
        continue: 'Continue',
        verification: 'Verification',
        verificationSub: 'Enter the OTP code we sent to\n{{email}}',
        resendCountDown: 'Resend in {{time}}s',
        resendTitle: 'Resend OTP code',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
