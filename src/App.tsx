import {SafeAreaView, StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {RootNavigator} from './routes';
import {useEffect} from 'react';
import {asyncStorageHelper} from './utils';
import {useAppDispatch} from './store/store';
import {setFirstOpenApp} from './store/app/appSlice';
import {setUser} from './store/auth/authSlice';
import {User} from './types';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      const isFirstOpenApp = await asyncStorageHelper.getData(
        '@isFirstOpenApp',
      );

      if (isFirstOpenApp !== undefined) {
        dispatch(setFirstOpenApp());
      }

      const user = await asyncStorageHelper.getData<User>('@user');
      if (user) {
        dispatch(setUser(user));
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
