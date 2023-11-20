import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {
  NavigatorScreenParams,
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

// Declare stack routes array with generic
export type TabRoutesType<ParamList extends ParamListBase> = Array<
  RouteConfig<
    ParamList,
    keyof ParamList,
    StackNavigationState<ParamList>,
    BottomTabNavigationOptions,
    BottomTabNavigationEventMap
  >
>;

// Declare onboarding navigator param list
export type OnboardingNavigatorParamList = {
  OnboardingScreen: undefined;
};

// Declare home navigator param list
export type HomeNavigatorParamList = {
  HomeTabNavigator: NavigatorScreenParams<TabNavigatorParamList>;
};

// Declare auth navigator param list
export type AuthNavigatorParamList = {
  SignInScreen: undefined;
  SignUpScreen: {otp: string} | undefined;
  ForgotPasswordScreen: undefined;
  VerificationOtpScreen: {email: string};
};

// Declare bottom navigation navigator param list
export type TabNavigatorParamList = {
  HomeScreen: undefined;
  FavoritesScreen: undefined;
  CartScreen: undefined;
  NoticesScreen: undefined;
};
