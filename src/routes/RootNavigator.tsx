import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useMemo} from 'react';
import {
  AuthNavigatorParamList,
  HomeNavigatorParamList,
  OnboardingNavigatorParamList,
} from './routeConfig';
import {
  ForgotPasswordScreen,
  OnboardingScreen,
  SignInScreen,
  SignUpScreen,
  VerificationOtpScreen,
} from '../screens';
import {useTheme} from 'react-native-paper';
import {useAppSelector} from '../store/store';
import {
  AuthStackRoutesType,
  HomeStackRoutesType,
  OnboardingStackRoutesType,
} from '../types';
import {} from '../screens';
import {HomeTabNavigator} from './home/HomeTabNavigator';

const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();
const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();
const OnboardingStack =
  createNativeStackNavigator<OnboardingNavigatorParamList>();

const onboardingStackRoutes: OnboardingStackRoutesType = [
  {name: 'OnboardingScreen', component: OnboardingScreen},
];

const authStackRoutes: AuthStackRoutesType = [
  {name: 'SignInScreen', component: SignInScreen},
  {name: 'SignUpScreen', component: SignUpScreen},
  {name: 'ForgotPasswordScreen', component: ForgotPasswordScreen},
  {name: 'VerificationOtpScreen', component: VerificationOtpScreen},
];

const homeStackRoutes: HomeStackRoutesType = [
  {name: 'HomeTabNavigator', component: HomeTabNavigator},
];

export default function RootNavigator() {
  const colors = useTheme().colors;
  const user = useAppSelector(state => state.authState.user);
  const isFirstOpenApp = useAppSelector(state => state.appState.isFirstOpenApp);

  const onboardingScreenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      orientation: 'portrait',
      headerShown: false,
    }),
    [],
  );

  const authScreenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      orientation: 'portrait',
      headerShadowVisible: false,
      headerTitle: '',
      headerTintColor: colors.onBackground,
      headerStyle: {
        backgroundColor: colors.background,
      },
      navigationBarColor: colors.background,
      contentStyle: {
        backgroundColor: colors.background,
      },
    }),
    [colors],
  );

  const homeScreenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      orientation: 'portrait',
      headerShown: false,
      navigationBarColor: colors.surface,
    }),
    [colors],
  );

  const onboardingStackScreens = useMemo(
    () =>
      onboardingStackRoutes.map(stackRoute => (
        <OnboardingStack.Screen key={stackRoute.name} {...stackRoute} />
      )),
    [],
  );

  const homeStackScreens = useMemo(
    () =>
      homeStackRoutes.map(stackRoute => (
        <HomeStack.Screen key={stackRoute.name} {...stackRoute} />
      )),
    [],
  );

  const authStackScreens = useMemo(
    () =>
      authStackRoutes.map(stackRoute => (
        <AuthStack.Screen key={stackRoute.name} {...stackRoute} />
      )),
    [],
  );

  return (
    <NavigationContainer>
      {isFirstOpenApp ? (
        <OnboardingStack.Navigator screenOptions={onboardingScreenOptions}>
          {onboardingStackScreens}
        </OnboardingStack.Navigator>
      ) : !user ? (
        <AuthStack.Navigator screenOptions={authScreenOptions}>
          {authStackScreens}
        </AuthStack.Navigator>
      ) : (
        <HomeStack.Navigator screenOptions={homeScreenOptions}>
          {homeStackScreens}
        </HomeStack.Navigator>
      )}
    </NavigationContainer>
  );
}
