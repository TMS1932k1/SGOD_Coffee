import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import AddressOption from './address_option/AddressOption';
import AmountOption from './AmountOption';
import VolumeOption from './VolumeOption';
import {TypeProduct} from '../../types/product';
import NoteOption from './NoteOption';

interface Props {
  name: string;
  type: TypeProduct;
  style?: StyleProp<ViewStyle>;
}

export default function OptionSection({style, name, type}: Props) {
  return (
    <View style={[styles.container, style]}>
      <AmountOption name={name} />
      {type === 'drink' && <VolumeOption />}
      <AddressOption />
      <NoteOption />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
