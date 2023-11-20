import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabNavigatorParamList} from '../routeConfig';
import {TabStackRoutesType} from '../../types';
import {
  CartScreen,
  FavoritesScreen,
  HomeScreen,
  NoticeScreen,
} from '../../screens';
import {MyDimensions} from '../../constants';
import {TabItem} from '../../components';
import {useTheme} from 'react-native-paper';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const tabRoutes: TabStackRoutesType = [
  {name: 'HomeScreen', component: HomeScreen},
  {name: 'FavoritesScreen', component: FavoritesScreen},
  {name: 'CartScreen', component: CartScreen},
  {name: 'NoticesScreen', component: NoticeScreen},
];

const tabScreens = tabRoutes.map(tabRoute => (
  <Tab.Screen key={tabRoute.name} {...tabRoute} />
));

export function HomeTabNavigator() {
  const colors = useTheme().colors;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
        tabBarIcon: ({focused, size}) => {
          if (route.name === 'HomeScreen') {
            return (
              <TabItem
                icon="home"
                size={MyDimensions.iconMedium}
                isCurrent={focused}
              />
            );
          }
          if (route.name === 'FavoritesScreen') {
            return <TabItem icon="heart" size={size} isCurrent={focused} />;
          }
          if (route.name === 'CartScreen') {
            return <TabItem icon="cart" size={size} isCurrent={focused} />;
          }
          if (route.name === 'NoticesScreen') {
            return <TabItem icon="bell-ring" size={size} isCurrent={focused} />;
          }
        },
        tabBarStyle: {
          height: 99,
          borderTopStartRadius: MyDimensions.borderRadiusLarge,
          borderTopEndRadius: MyDimensions.borderRadiusLarge,
          backgroundColor: colors.surface,
          elevation: 0,
          paddingHorizontal: MyDimensions.paddingMedium,
          position: 'absolute',
        },
      })}>
      {tabScreens}
    </Tab.Navigator>
  );
}
