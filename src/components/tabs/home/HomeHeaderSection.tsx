import {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import InfoUser from './InfoUser';
import {useAppSelector} from '../../../store/hooks';
import PlaceholderInfoUser from './PlaceholderInfoUser';
import SearchSession from './SearchSession';
import CarouselSection from './CarouselSection';

export default function HomeHeaderSection() {
  const isLoading = useAppSelector(state => state.authState.isLoading);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={styles.container}>
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
      height: 350,
      alignItems: 'center',
    },
    header: {
      width: '100%',
      height: 275,
      justifyContent: 'flex-end',
      backgroundColor: colors.tertiary,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingBottom: 75 + MyDimensions.paddingMedium,
    },
    carouselView: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 150,
      paddingHorizontal: MyDimensions.paddingLarge,
    },
    carousel: {width: '100%', height: 150},
    search: {
      marginTop: MyDimensions.paddingMedium,
    },
  });
