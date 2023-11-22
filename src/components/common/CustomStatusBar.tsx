import {StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function CustomStatusBar() {
  const theme = useTheme();

  const colors = useTheme().colors;

  return (
    <StatusBar
      barStyle={theme.dark ? 'light-content' : 'dark-content'}
      backgroundColor={colors.background}
    />
  );
}
