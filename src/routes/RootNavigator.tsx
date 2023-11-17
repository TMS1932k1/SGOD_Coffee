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
import {
  ForgotPasswordScreen,
  OnboardingScreen,
  SignInScreen,
  SignUpScreen,
  VerificationOtpScreen,
} from '../screens';
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
  {name: 'ForgotPasswordScreen', component: ForgotPasswordScreen},
  {name: 'VerificationOtpScreen', component: VerificationOtpScreen},
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
      {true ? (
        <AuthStack.Navigator screenOptions={authScreenOptions}>
          {authStackScreens}
        </AuthStack.Navigator>
      ) : (
        <RootStack.Navigator>{rootStackScreens}</RootStack.Navigator>
      )}
    </NavigationContainer>
  );
}
