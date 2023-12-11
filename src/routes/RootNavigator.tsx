import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useMemo} from 'react';
import {
  HomeNavigatorParamList,
  OnboardingNavigatorParamList,
} from './routeConfig';
import {useTheme} from 'react-native-paper';
import {HomeTabNavigator} from './home/HomeTabNavigator';
import {HomeStackRoutesType, OnboardingStackRoutesType} from '../types/stack';
import {
  ForgotPasswordScreen,
  SignInScreen,
  SignUpScreen,
  VerificationOtpScreen,
} from '../screens/auth';
import {OnboardingScreen} from '../screens/onboarding';
import {useAppSelector} from '../store/hooks';
import {EventDetailScreen} from '../screens/event';
import {ConfirmScreen} from '../screens/confirm';
import {ShipToScreen} from '../screens/shipto';
import {OrderScreen} from '../screens/order';
import {PayScreen} from '../screens/pay';
import {ScanScreen} from '../screens/scan';
import {DetailBillScreen} from '../screens/detail_bill';
import {ProfileScreen} from '../screens/profile';
import {EditProfileScreen} from '../screens/edit_profile';
import {ReviewScreen} from '../screens/review';

const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();

const OnboardingStack =
  createNativeStackNavigator<OnboardingNavigatorParamList>();

const onboardingStackRoutes: OnboardingStackRoutesType = [
  {name: 'OnboardingScreen', component: OnboardingScreen},
];

const homeStackRoutes: HomeStackRoutesType = [
  {name: 'HomeTabNavigator', component: HomeTabNavigator},
  {name: 'SignInScreen', component: SignInScreen},
  {name: 'SignUpScreen', component: SignUpScreen},
  {name: 'ForgotPasswordScreen', component: ForgotPasswordScreen},
  {name: 'VerificationOtpScreen', component: VerificationOtpScreen},
  {name: 'EventDetailScreen', component: EventDetailScreen},
  {name: 'OrderScreen', component: OrderScreen},
  {name: 'ShipToScreen', component: ShipToScreen},
  {name: 'ConfirmScreen', component: ConfirmScreen},
  {name: 'PayScreen', component: PayScreen},
  {name: 'ScanScreen', component: ScanScreen},
  {name: 'DetailBillScreen', component: DetailBillScreen},
  {name: 'ProfileScreen', component: ProfileScreen},
  {name: 'EditProfileScreen', component: EditProfileScreen},
  {name: 'ReviewScreen', component: ReviewScreen},
];

export default function RootNavigator() {
  const colors = useTheme().colors;
  const isFirstOpenApp = useAppSelector(state => state.appState.isFirstOpenApp);

  const onboardingScreenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      orientation: 'portrait',
      headerShown: false,
    }),
    [],
  );

  const homeScreenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      orientation: 'portrait',
      headerShadowVisible: false,
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

  return (
    <NavigationContainer>
      {isFirstOpenApp ? (
        <OnboardingStack.Navigator screenOptions={onboardingScreenOptions}>
          {onboardingStackScreens}
        </OnboardingStack.Navigator>
      ) : (
        <HomeStack.Navigator screenOptions={homeScreenOptions}>
          {homeStackScreens}
        </HomeStack.Navigator>
      )}
    </NavigationContainer>
  );
}
