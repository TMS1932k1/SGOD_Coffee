import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

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
};
