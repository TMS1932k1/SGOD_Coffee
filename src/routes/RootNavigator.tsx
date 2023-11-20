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
import HomeScreen from '../screens/home/HomeScreen';
import {useAppSelector} from '../store/store';
import {
  AuthStackRoutesType,
  HomeStackRoutesType,
  OnboardingStackRoutesType,
} from '../types';

const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();
const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();
const OnboardingStack =
  createNativeStackNavigator<OnboardingNavigatorParamList>();

const onboardingStackRoutes: OnboardingStackRoutesType = [
  {name: 'OnboardingScreen', component: OnboardingScreen},
];

const homeStackRoutes: HomeStackRoutesType = [
  {name: 'HomeScreen', component: HomeScreen},
];

const authStackRoutes: AuthStackRoutesType = [
  {name: 'SignInScreen', component: SignInScreen},
  {name: 'SignUpScreen', component: SignUpScreen},
  {name: 'ForgotPasswordScreen', component: ForgotPasswordScreen},
  {name: 'VerificationOtpScreen', component: VerificationOtpScreen},
];

export default function RootNavigator() {
  const colors = useTheme().colors;
  const user = useAppSelector(state => state.authState.user);
  const isFirstOpenApp = useAppSelector(state => state.appState.isFirstOpenApp);

  const onboardingStackScreens = useMemo(
    () =>
      onboardingStackRoutes.map(stackRoute => (
        <OnboardingStack.Screen key={stackRoute.name} {...stackRoute} />
      )),
    [onboardingStackRoutes],
  );

  const homeStackScreens = useMemo(
    () =>
      homeStackRoutes.map(stackRoute => (
        <HomeStack.Screen key={stackRoute.name} {...stackRoute} />
      )),
    [homeStackRoutes],
  );

  const authStackScreens = useMemo(
    () =>
      authStackRoutes.map(stackRoute => (
        <AuthStack.Screen key={stackRoute.name} {...stackRoute} />
      )),
    [authStackRoutes],
  );

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
      contentStyle: {
        backgroundColor: colors.background,
      },
    }),
    [colors],
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
        <HomeStack.Navigator>{homeStackScreens}</HomeStack.Navigator>
      )}
    </NavigationContainer>
  );
}
