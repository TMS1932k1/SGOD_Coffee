import {SafeAreaView, StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {useEffect} from 'react';
import {setFirstOpenApp} from './store/app/appSlice';
import {postfetchUserByToken} from './store/auth/authSlice';
import {getData} from './utils/asyncStorage';
import RootNavigator from './routes/RootNavigator';
import {useAppDispatch} from './store/hooks';
import {getEvents} from './store/home/eventsSlice';
import {getCategories} from './store/home/categoriesSlice';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {loadStorageCart} from './store/cart/cartSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      dispatch(getEvents());
      dispatch(getCategories());
      dispatch(loadStorageCart());

      const isFirstOpenApp = await getData('@isFirstOpenApp');

      if (isFirstOpenApp !== undefined) {
        dispatch(setFirstOpenApp());
      }

      const userToken = await getData<string>('@userToken');

      if (userToken) {
        dispatch(postfetchUserByToken(userToken));
      }
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.rootContainer}>
        <RootNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
