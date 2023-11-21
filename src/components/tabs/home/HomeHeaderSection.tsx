import {useMemo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import InfoUser from './InfoUser';

export default function HomeHeaderSection() {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <InfoUser />
      </View>
      {/* Carousel section */}
      <View style={styles.carouselView}>
        <Image
          style={styles.carousel}
          source={require('../../../assets/images/promo.png')}
          resizeMode="stretch"
        />
      </View>
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
      paddingBottom: 75 + MyDimensions.paddingLarge,
    },
    carouselView: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: MyDimensions.paddingLarge,
    },
    carousel: {width: '100%', height: 150},
  });
