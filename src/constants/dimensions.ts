import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const MyDimensions = {
  paddingSmall: 8,
  paddingMedium: 16,
  paddingLarge: 32,
  iconSmall: 20,
  iconMedium: 26,
  borderRadiusSmall: 10,
  borderRadiusMedium: 16,
  borderRadiusLarge: 32,
  widthWindow: width,
  heightWindow: height,
};
