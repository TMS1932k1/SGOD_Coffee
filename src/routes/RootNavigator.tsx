import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useMemo} from 'react';
import {
  AuthNavigatorParamList,
  AuthStackRoutesType,
  RootNavigatorParamList,
  RootStackRoutesType,
} from './routeConfig';
import {OnboardingScreen, SignInScreen, SignUpScreen} from '../screens';
import {useTheme} from 'react-native-paper';
import HomeScreen from '../screens/home/HomeScreen';

const RootStack = createNativeStackNavigator<RootNavigatorParamList>();
const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();

const rootStackRoutes: RootStackRoutesType = [
  {name: 'HomeScreen', component: HomeScreen},
];

const authStackRoutes: AuthStackRoutesType = [
  {name: 'OnboardingScreen', component: OnboardingScreen},
  {name: 'SignInScreen', component: SignInScreen},
  {name: 'SignUpScreen', component: SignUpScreen},
];

export default function RootNavigator() {
  const colors = useTheme().colors;

  const rootStackScreens = useMemo(
    () =>
      rootStackRoutes.map(stackRoute => (
        <RootStack.Screen key={stackRoute.name} {...stackRoute} />
      )),
    [rootStackRoutes],
  );

  const authStackScreens = useMemo(
    () =>
      authStackRoutes.map(stackRoute => (
        <AuthStack.Screen key={stackRoute.name} {...stackRoute} />
      )),
    [authStackRoutes],
  );

  const screenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      orientation: 'portrait',
      headerShadowVisible: false,
      headerTintColor: colors.primary,
      headerStyle: {
        backgroundColor: colors.background,
      },
      contentStyle: {
        backgroundColor: colors.background,
      },
    }),
    [colors],
  );

  return (
    <NavigationContainer>
      {true ? (
        <AuthStack.Navigator screenOptions={screenOptions}>
          {authStackScreens}
        </AuthStack.Navigator>
      ) : (
        <RootStack.Navigator>{rootStackScreens}</RootStack.Navigator>
      )}
    </NavigationContainer>
  );
}
