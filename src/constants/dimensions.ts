import {Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight;

export const MyDimensions = {
  paddingSmall: 8,
  paddingMedium: 16,
  paddingLarge: 32,
  iconSmall: 14,
  iconMedium: 20,
  iconLarge: 26,
  borderRadiusSmall: 10,
  borderRadiusMedium: 16,
  borderRadiusLarge: 36,
  widthWindow: width,
  heightWindow: height,
  navbarHeight: navbarHeight,
};
