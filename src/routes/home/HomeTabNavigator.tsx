import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabNavigatorParamList} from '../routeConfig';
import {
  BillsScreen,
  CartScreen,
  FavoritesScreen,
  HomeScreen,
} from '../../screens/home';
import {MyDimensions} from '../../constants';
import {useTheme} from 'react-native-paper';
import {
  HomeStackNavigationScreenProps,
  TabStackRoutesType,
} from '../../types/stack';
import {useLayoutEffect} from 'react';
import {TabItem} from '../../components/tabs';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const tabRoutes: TabStackRoutesType = [
  {name: 'HomeScreen', component: HomeScreen},
  {name: 'FavoritesScreen', component: FavoritesScreen},
  {name: 'CartScreen', component: CartScreen},
  {name: 'BillsScreen', component: BillsScreen},
];

const tabScreens = tabRoutes.map(tabRoute => (
  <Tab.Screen key={tabRoute.name} {...tabRoute} />
));

interface Props {
  navigation: HomeStackNavigationScreenProps<'HomeTabNavigator'>;
}

export function HomeTabNavigator({navigation}: Props) {
  const colors = useTheme().colors;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      navigationBarColor: colors.surface,
    });
  }, [navigation, colors]);

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
                size={MyDimensions.iconLarge}
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
          if (route.name === 'BillsScreen') {
            return (
              <TabItem
                icon="clipboard-text-multiple"
                size={size}
                isCurrent={focused}
              />
            );
          }
        },
        tabBarStyle: {
          height: 99 + MyDimensions.navbarHeight,
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
