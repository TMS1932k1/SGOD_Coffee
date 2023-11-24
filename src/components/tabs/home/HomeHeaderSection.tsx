import {useMemo} from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import InfoUser from './InfoUser';
import {useAppSelector} from '../../../store/hooks';
import PlaceholderInfoUser from './PlaceholderInfoUser';
import SearchSession from './SearchSession';
import CarouselSection from './events/CarouselSection';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function HomeHeaderSection({style}: Props) {
  const isLoading = useAppSelector(state => state.authState.isLoading);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        {!isLoading ? <InfoUser /> : <PlaceholderInfoUser />}
        <SearchSession style={styles.search} />
      </View>
      <CarouselSection style={styles.carouselView} />
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 380,
      alignItems: 'center',
    },
    header: {
      width: '100%',
      height: 300,
      justifyContent: 'flex-end',
      backgroundColor: colors.tertiary,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingBottom: 80 + MyDimensions.paddingMedium,
    },
    carouselView: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 160,
    },
    search: {
      marginTop: MyDimensions.paddingLarge,
    },
  });
