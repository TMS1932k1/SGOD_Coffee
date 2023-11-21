import {SafeAreaView, StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {useEffect} from 'react';
import {useAppDispatch} from './store/store';
import {setFirstOpenApp} from './store/app/appSlice';
import {postfetchUserByToken} from './store/auth/authSlice';
import {getData} from './utils/asyncStorage';
import RootNavigator from './routes/RootNavigator';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      const isFirstOpenApp = await getData('@isFirstOpenApp');

      if (isFirstOpenApp !== undefined) {
        dispatch(setFirstOpenApp());
      }

      const userToken = await getData<string>('@userToken');
      if (userToken) {
        await dispatch(postfetchUserByToken(userToken)).unwrap();
      }
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <RootNavigator />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
