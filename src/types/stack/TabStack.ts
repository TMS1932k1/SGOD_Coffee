import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabNavigatorParamList, TabRoutesType} from '../../routes/routeConfig';

// Declare type of root navigation props with generic
export type TabNavigationScreenProps<T extends keyof TabNavigatorParamList> =
  BottomTabNavigationProp<TabNavigatorParamList, T>;

export type TabStackRoutesType = TabRoutesType<TabNavigatorParamList>;
