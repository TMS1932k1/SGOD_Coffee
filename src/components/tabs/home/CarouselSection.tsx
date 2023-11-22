import {View, ViewStyle, StyleProp, StyleSheet, Image} from 'react-native';
import {useAppSelector} from '../../../store/hooks';
import {useTheme} from 'react-native-paper';
import {useCallback, useMemo} from 'react';
import Swiper from 'react-native-swiper';
import {MyDimensions} from '../../../constants';
import EventItem from './EventItem';
import {HomeStackNavigationScreenProps} from '../../../types/stack';
import {useNavigation} from '@react-navigation/native';
import {Event} from '../../../types/event';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function CarouselSection({style}: Props) {
  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'HomeTabNavigator'>>();

  const events = useAppSelector(state => state.eventsState.events);

  const isLoading = useAppSelector(state => state.eventsState.isLoading);

  const colors = useTheme().colors;

  // Navigate to [EventDetailScreen] with [event: Event]
  const onPressEventItem = useCallback(
    (event: Event) => {
      navigation.navigate('EventDetailScreen', {event: event});
    },
    [navigation],
  );

  const placeHolder = useMemo(
    () => (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/placeholderevent.jpg')}
        />
      </View>
    ),
    [],
  );

  return (
    <View style={[styles.container, style]}>
      {isLoading || !events || events.length <= 0 ? (
        placeHolder
      ) : (
        <Swiper
          autoplay={true}
          autoplayTimeout={10}
          dotColor={colors.outline}
          activeDotColor={colors.primary}>
          {events.map(item => (
            <EventItem key={item.id} event={item} onPress={onPressEventItem} />
          ))}
        </Swiper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: MyDimensions.paddingLarge,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: MyDimensions.borderRadiusMedium,
    resizeMode: 'contain',
  },
});
