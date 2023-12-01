import {useRoute} from '@react-navigation/native';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  HomeStackNavigationScreenProps,
  HomeStackRouteScreenProps,
} from '../../types/stack';
import {useLayoutEffect, useMemo} from 'react';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {MyDimensions} from '../../constants';
import {CustomStatusBar, CustomText} from '../../components/common';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {TimeItem} from '../../components/event';
import {Translation} from 'react-i18next';

interface Props {
  navigation: HomeStackNavigationScreenProps<'EventDetailScreen'>;
}

export default function EventDetailScreen({navigation}: Props) {
  const route = useRoute<HomeStackRouteScreenProps<'EventDetailScreen'>>();

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const event = useMemo(() => route.params.event, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

  const image = useMemo(
    () => (
      <ImageBlurLoading source={{uri: event.imageUrl}} style={styles.image} />
    ),
    [event],
  );

  return (
    <ScrollView style={styles.scrollView}>
      <CustomStatusBar />
      <CustomText style={styles.title} variant="heading1">
        {event.title}
      </CustomText>
      {image}
      <Translation>
        {t => (
          <CustomText style={styles.subTitle} variant="subheading1">
            {`${t('timeline')}:`}
          </CustomText>
        )}
      </Translation>
      <View style={styles.contentContainer}>
        <TimeItem timeline={event.timeline} />
      </View>
      <Translation>
        {t => (
          <CustomText style={styles.subTitle} variant="subheading1">
            {`${t('description')}:`}
          </CustomText>
        )}
      </Translation>
      <View style={styles.contentContainer}>
        <CustomText style={styles.description} variant="body2">
          {event.decription}
        </CustomText>
      </View>
    </ScrollView>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingMedium,
    },
    title: {
      color: colors.primary,
    },
    image: {
      width: '100%',
      height: 230,
      resizeMode: 'stretch',
      borderRadius: MyDimensions.borderRadiusMedium,
      marginTop: MyDimensions.paddingMedium,
    },
    subTitle: {
      marginTop: MyDimensions.paddingMedium,
      color: colors.onBackground,
    },
    contentContainer: {
      marginTop: MyDimensions.paddingSmall,
    },
    description: {
      textAlign: 'justify',
      color: colors.onBackground,
    },
  });
