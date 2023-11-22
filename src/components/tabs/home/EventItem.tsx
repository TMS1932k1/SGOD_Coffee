import {View, StyleSheet, Pressable} from 'react-native';
import {Event} from '../../../types/event';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {MyDimensions} from '../../../constants';

interface Props {
  event: Event;
  onPress?: (event: Event) => void;
}

export default function EventItem({onPress, event}: Props) {
  return (
    <View style={styles.imageContainer}>
      <Pressable
        onPress={() => {
          if (onPress) onPress(event);
        }}>
        <ImageBlurLoading
          style={styles.image}
          source={{uri: event.imageUrl}}
          thumbnailSource={require('../../../assets/images/placeholderevent.jpg')}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 150,
    paddingHorizontal: MyDimensions.paddingLarge,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: MyDimensions.borderRadiusMedium,
    resizeMode: 'contain',
  },
});
