import {Platform} from 'react-native';
import {configureFonts} from 'react-native-paper';

export const fontFamily = {
  mulishRegular: 'mulish_regular',
  mulishBold: 'mulish_bold',
  mulishSemiBold: 'mulish_semi_bold',
};

const baseFont = {
  fontFamily: Platform.select({
    ios: fontFamily.mulishRegular,
    default: fontFamily.mulishRegular,
  }),
};

const baseVariants = configureFonts({config: baseFont});

const customVariants = {
  heading1: {
    fontFamily: fontFamily.mulishBold,
    fontSize: 34,
  },
  heading2: {
    fontFamily: fontFamily.mulishBold,
    fontSize: 24,
  },
  subheading1: {
    fontFamily: fontFamily.mulishBold,
    fontSize: 18,
  },
  subheading2: {
    fontFamily: fontFamily.mulishSemiBold,
    fontSize: 16,
  },
  body1: {
    fontFamily: fontFamily.mulishSemiBold,
    fontSize: 14,
  },
  body2: {
    fontFamily: fontFamily.mulishRegular,
    fontSize: 14,
  },
  meta1: {
    fontFamily: fontFamily.mulishRegular,
    fontSize: 12,
  },
  meta2: {
    fontFamily: fontFamily.mulishRegular,
    fontSize: 10,
  },
  meta3: {
    fontFamily: fontFamily.mulishSemiBold,
    fontSize: 10,
  },
};

export const fonts = configureFonts({
  config: {
    ...baseVariants,
    ...customVariants,
  },
});
