import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabNavigatorParamList, TabRoutesType} from '../../routes/routeConfig';
import {RouteProp} from '@react-navigation/native';

// Declare type of root navigation props with generic
export type TabNavigationScreenProps<T extends keyof TabNavigatorParamList> =
  BottomTabNavigationProp<TabNavigatorParamList, T>;

// Declare type of root route props with generic
export type TabRouteScreenProps<T extends keyof TabNavigatorParamList> =
  RouteProp<TabNavigatorParamList, T>;

export type TabStackRoutesType = TabRoutesType<TabNavigatorParamList>;
