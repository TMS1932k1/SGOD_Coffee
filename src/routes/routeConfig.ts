import {
  ParamListBase,
  RouteConfig,
  StackNavigationState,
} from '@react-navigation/native';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// Declare stack routes array with generic
export type StackRoutesType<ParamList extends ParamListBase> = Array<
  RouteConfig<
    ParamList,
    keyof ParamList,
    StackNavigationState<ParamList>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap
  >
>;

// Declare onboarding navigator param list
export type OnboardingNavigatorParamList = {
  OnboardingScreen: undefined;
};

// Declare home navigator param list
export type HomeNavigatorParamList = {
  HomeScreen: undefined;
};

// Declare auth navigator param list
export type AuthNavigatorParamList = {
  SignInScreen: undefined;
  SignUpScreen: {otp: string} | undefined;
  ForgotPasswordScreen: undefined;
  VerificationOtpScreen: {email: string};
};
