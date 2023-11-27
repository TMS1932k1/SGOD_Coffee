import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import AddressOption from './AddressOption';
import AmountOption from './AmountOption';

interface Props {
  name: string;
  style?: StyleProp<ViewStyle>;
}

export default function OptionSection({style, name}: Props) {
  return (
    <View style={[styles.container, style]}>
      <AmountOption name={name} />
      <AddressOption />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
