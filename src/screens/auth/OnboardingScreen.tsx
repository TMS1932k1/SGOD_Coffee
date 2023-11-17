import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {useCallback, useEffect, useMemo} from 'react';
import {WelcomeSection} from '../../components';
import {MyColors} from '../../constants';
import {asyncStorageHelper} from '../../utils';
import {useAppDispatch} from '../../store/store';
import {setFirstOpenApp} from '../../store/app/appSlice';

export default function OnboardingScreen() {
  const dispatch = useAppDispatch();

  // Set isFirstOpenApp in local storage
  const saveFirstOpenApp = useCallback(async () => {
    const isFirstOpenApp = await asyncStorageHelper.getData('@isFirstOpenApp');
    if (isFirstOpenApp === undefined) {
      console.log('First');
      await asyncStorageHelper.saveObject('@isFirstOpenApp', {open: 'opened'});
    }
  }, []);

  useEffect(() => {
    saveFirstOpenApp();
  }, [saveFirstOpenApp]);

  // Set app state: firstOpenApp
  const getStart = useCallback(() => {
    dispatch(setFirstOpenApp());
  }, []);

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
