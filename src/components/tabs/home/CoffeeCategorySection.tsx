import {View, ViewStyle, StyleProp} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function CoffeeCategorySection({style}: Props) {
  return <View style={[style, {height: 100}]}></View>;
}
