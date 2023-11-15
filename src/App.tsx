import {SafeAreaView, StyleSheet} from 'react-native';

import {RootNavigator} from './routes';

function App(): JSX.Element {
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
