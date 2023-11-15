import {DefaultTheme} from 'react-native-paper';
import {lightColors} from './colors';
import {fonts} from './fonts';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...lightColors,
  },
  fonts,
};

export default {lightTheme};
