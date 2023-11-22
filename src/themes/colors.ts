import {MyColors} from '../constants';
import {getColorOpacity} from '../utils/colorOpacity';

export const lightColors = {
  primary: MyColors.default,
  onPrimary: MyColors.white,
  background: MyColors.offWhite,
  onBackground: MyColors.active,
  outline: MyColors.disabled,
  error: MyColors.error,
  surface: MyColors.white,
  onSurface: MyColors.active,
  tertiary: MyColors.weak,
  outlineVariant: getColorOpacity(MyColors.disabled, 0.3),
};
