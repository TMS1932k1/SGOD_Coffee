import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  AuthNavigatorParamList,
  StackRoutesType,
} from '../../routes/routeConfig';

// Declare type of auth navigation props with generic
export type AuthStackNavigationScreenProps<
  T extends keyof AuthNavigatorParamList,
> = NativeStackNavigationProp<AuthNavigatorParamList, T>;

// Declare type of auth route props with generic
export type AuthStackRouteScreenProps<T extends keyof AuthNavigatorParamList> =
  RouteProp<AuthNavigatorParamList, T>;

export type AuthStackRoutesType = StackRoutesType<AuthNavigatorParamList>;
