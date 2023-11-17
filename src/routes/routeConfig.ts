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

// Declare root navigator param list
export type RootNavigatorParamList = {
  HomeScreen: undefined;
};

// Declare auth navigator param list
export type AuthNavigatorParamList = {
  OnboardingScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: {otp: string} | undefined;
  ForgotPasswordScreen: undefined;
  VerificationOtpScreen: {email: string};
};

// Declare type of root navigation props with generic
export type RootStackNavigationScreenProps<
  T extends keyof RootNavigatorParamList,
> = NativeStackNavigationProp<RootNavigatorParamList, T>;

// Declare type of root route props with generic
export type RootStackRouteScreenProps<T extends keyof RootNavigatorParamList> =
  RouteProp<RootNavigatorParamList, T>;

// Declare type of auth navigation props with generic
export type AuthStackNavigationScreenProps<
  T extends keyof AuthNavigatorParamList,
> = NativeStackNavigationProp<AuthNavigatorParamList, T>;

// Declare type of auth route props with generic
export type AuthStackRouteScreenProps<T extends keyof AuthNavigatorParamList> =
  RouteProp<AuthNavigatorParamList, T>;

export type RootStackRoutesType = StackRoutesType<RootNavigatorParamList>;
export type AuthStackRoutesType = StackRoutesType<AuthNavigatorParamList>;
