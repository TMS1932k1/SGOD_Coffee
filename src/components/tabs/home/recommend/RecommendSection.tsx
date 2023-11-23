import {View, Text, ViewStyle, StyleProp} from 'react-native';
import {CustomText} from '../../../common';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function RecommendSection({style}: Props) {
  return <View style={[style]}></View>;
}
