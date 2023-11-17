import {
  ParamListBase,
  RouteConfig,
  RouteProp,
  StackNavigationState,
} from '@react-navigation/native';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// Declare stack routes array with generic
type StackRoutesType<ParamList extends ParamListBase> = Array<
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

// Declare type of root navigation props with generic
export type HomeStackNavigationScreenProps<
  T extends keyof HomeNavigatorParamList,
> = NativeStackNavigationProp<HomeNavigatorParamList, T>;

// Declare type of root route props with generic
export type HomeStackRouteScreenProps<T extends keyof HomeNavigatorParamList> =
  RouteProp<HomeNavigatorParamList, T>;

// Declare type of auth navigation props with generic
export type AuthStackNavigationScreenProps<
  T extends keyof AuthNavigatorParamList,
> = NativeStackNavigationProp<AuthNavigatorParamList, T>;

// Declare type of auth route props with generic
export type AuthStackRouteScreenProps<T extends keyof AuthNavigatorParamList> =
  RouteProp<AuthNavigatorParamList, T>;

export type OnboardingStackRoutesType =
  StackRoutesType<OnboardingNavigatorParamList>;
export type HomeStackRoutesType = StackRoutesType<HomeNavigatorParamList>;
export type AuthStackRoutesType = StackRoutesType<AuthNavigatorParamList>;
