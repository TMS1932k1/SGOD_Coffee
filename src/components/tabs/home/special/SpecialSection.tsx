import {View, ViewStyle, StyleProp, StyleSheet} from 'react-native';
import {CustomText} from '../../../common';
import {Translation} from 'react-i18next';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {MyDimensions} from '../../../../constants';
import {useAppSelector} from '../../../../store/hooks';
import ImageBlurLoading from 'react-native-image-blur-loading';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function SpecialSection({style}: Props) {
  const isLoading = useAppSelector(
    state => state.coffeesSpecialState.isLoading,
  );

  const coffees = useAppSelector(state => state.coffeesSpecialState.coffees);
  const specialText = useAppSelector(
    state => state.coffeesSpecialState.specialText,
  );

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const loadingView = useMemo(
    () => (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator />
      </View>
    ),
    [styles],
  );

  const title = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText style={styles.title} variant="heading2">
            {t('special')}
          </CustomText>
        )}
      </Translation>
    ),
    [styles],
  );

  return (
    <View style={[style]}>
      {title}
      {isLoading ? (
        loadingView
      ) : (
        <View style={[styles.container, styles.specialContainer]}>
          <View style={styles.infoSpecial}>
            <CustomText style={styles.specialText} variant="subheading1">
              {specialText}
            </CustomText>
          </View>
          <View style={styles.imageContainer}>
            <Swiper
              autoplay={true}
              autoplayTimeout={10}
              dotColor={colors.outline}
              onIndexChanged={index => {}}
              activeDotColor={colors.primary}>
              {coffees.map(item => (
                <ImageBlurLoading
                  key={item.id}
                  source={{uri: item.image}}
                  style={styles.image}
                />
              ))}
            </Swiper>
            <LinearGradient
              start={{x: 0.9, y: 0}}
              end={{x: 0, y: 0}}
              colors={['transparent', colors.primary]}
              style={styles.linearGradieContainer}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    title: {
      color: colors.onBackground,
    },
    container: {
      width: '100%',
      height: 160,
      marginTop: MyDimensions.paddingMedium,
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: MyDimensions.borderRadiusLarge,
      borderTopLeftRadius: MyDimensions.borderRadiusLarge,
      borderBottomRightRadius: MyDimensions.borderRadiusLarge,
    },
    specialContainer: {
      flexDirection: 'row',
    },
    imageContainer: {
      flex: 5,
      borderBottomRightRadius: MyDimensions.borderRadiusLarge,
      borderTopRightRadius: MyDimensions.borderRadiusLarge,
      overflow: 'hidden',
    },
    linearGradieContainer: {
      width: '30%',
      height: '100%',
      position: 'absolute',
      left: 0,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    infoSpecial: {
      flex: 3,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      borderTopLeftRadius: MyDimensions.borderRadiusLarge,
      paddingVertical: MyDimensions.paddingMedium,
      paddingLeft: MyDimensions.paddingMedium,
    },
    specialText: {
      color: colors.background,
    },
  });
