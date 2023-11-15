import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {MyColors, MyDimensions} from '../../constants';
import {CustomText} from '../common/CustomText';
import ContainedButton from '../common/ContainedButton';
import LinearGradient from 'react-native-linear-gradient';
import {Translation} from 'react-i18next';

interface Props {
  style?: StyleProp<ViewStyle>;
  onGetStart?: () => void;
}

export default function WelcomeSection({style, onGetStart}: Props) {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.9}}
        colors={['transparent', MyColors.black]}
        style={styles.linear}
      />
      <View style={styles.backgroundContainer} />
      <View style={[styles.container, styles.contentContainer]}>
        <Translation>
          {t => (
            <CustomText style={styles.title} variant="heading1">
              {t('titleOnboarding')}
            </CustomText>
          )}
        </Translation>
        <Translation>
          {t => (
            <CustomText style={styles.subtitle} variant="body2">
              {t('subtitleOnboarding')}
            </CustomText>
          )}
        </Translation>
        <Translation>
          {t => (
            <ContainedButton style={styles.button} onPress={onGetStart}>
              {t('getStart')}
            </ContainedButton>
          )}
        </Translation>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  linear: {
    height: 90,
    width: '100%',
  },
  backgroundContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: MyColors.black,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: 305,
    textAlign: 'center',
    color: MyColors.white,
  },
  subtitle: {
    width: 250,
    textAlign: 'center',
    color: MyColors.disabled,
    marginTop: MyDimensions.paddingSmall,
  },
  button: {
    width: 315,
    marginTop: MyDimensions.paddingLarge,
  },
});
