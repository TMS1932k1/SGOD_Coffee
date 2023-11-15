import {useLayoutEffect, useMemo} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';
import {AuthStackNavigationScreenProps} from '../../routes';

interface Props {
  navigation: AuthStackNavigationScreenProps<'OnboardingScreen'>;
}

export default function SignInScreen({navigation}: Props) {
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
    });
  }, [navigation]);

  const colors = useMemo(() => theme.colors, [theme]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
});
