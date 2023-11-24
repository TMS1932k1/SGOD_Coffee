import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function PlaceholderInfoUser() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
  },
});
