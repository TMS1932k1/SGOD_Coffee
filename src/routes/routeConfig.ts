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
import {Event} from '../types/event';
import {Product} from '../types/product';
import {Order} from '../types/order';
import {Bill} from '../types/bill';
import {User} from '../types/auth';

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
  OrderScreen: {product: Product};
  SignInScreen: undefined;
  SignUpScreen: {otp: string} | undefined;
  ForgotPasswordScreen: undefined;
  VerificationOtpScreen: {email: string};
  EventDetailScreen: {event: Event};
  ShipToScreen: undefined;
  ConfirmScreen: {orders: Order[]};
  PayScreen: {bill: Bill};
  ScanScreen: undefined;
  DetailBillScreen: {bill: Bill};
  ProfileScreen: undefined;
  EditProfileScreen: {user: User} | undefined;
  ReviewScreen: Order[];
};

// Declare bottom navigation navigator param list
export type TabNavigatorParamList = {
  HomeScreen: undefined;
  FavoritesScreen: undefined;
  CartScreen: undefined;
  BillsScreen: {index: number} | undefined;
};
