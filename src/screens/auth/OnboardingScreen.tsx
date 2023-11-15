import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {useCallback, useLayoutEffect, useMemo} from 'react';
import {WelcomeSection} from '../../components';
import {AuthStackNavigationScreenProps} from '../../routes';
import {MyColors} from '../../constants';

interface Props {
  navigation: AuthStackNavigationScreenProps<'OnboardingScreen'>;
}

export default function OnboardingScreen({navigation}: Props) {
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  // Navigate to [SignInScreen]
  const getStart = useCallback(() => {
    navigation.navigate('SignInScreen');
  }, [navigation]);

  const image = useMemo(
    () => (
      <Image
        style={[styles.image]}
        source={require('../../assets/images/onboarding.png')}
        resizeMode="cover"
      />
    ),
    [],
  );

  const welcomeSection = useMemo(
    () => <WelcomeSection style={styles.welcome} onGetStart={getStart} />,
    [getStart],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={MyColors.black} />
      {image}
      {welcomeSection}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 580,
  },
  welcome: {
    position: 'absolute',
    height: 362,
    bottom: 0,
  },
});
