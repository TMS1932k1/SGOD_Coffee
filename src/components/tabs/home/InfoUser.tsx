import {useCallback, useMemo} from 'react';
import {View, StyleSheet, ViewStyle, StyleProp, Pressable} from 'react-native';
import {ProgressBar, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from '../../common/CustomText';
import {MyApp, MyDimensions} from '../../../constants';
import {Translation} from 'react-i18next';
import {getRankColor, getRankTitle} from '../../../utils/rankUser';
import {useAppSelector} from '../../../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../../types/stack';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function InfoUser({style}: Props) {
  const user = useAppSelector(state => state.authState.user);

  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'HomeTabNavigator'>>();

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const rank = useMemo(() => {
    let rankTitle = getRankTitle(user?.point ?? 0);
    return (
      <View style={[styles.rank, {backgroundColor: getRankColor(rankTitle)}]}>
        <CustomText variant="body1">{rankTitle}</CustomText>
      </View>
    );
  }, [user]);

  const navigateToSignIn = useCallback(() => {
    navigation.navigate('SignInScreen');
  }, [navigation]);

  const firstEmail = useMemo(
    () => (
      <View style={styles.firstEmailContainer}>
        <CustomText style={styles.textColor} variant="heading2">
          {user?.email.charAt(0).toUpperCase()}
        </CustomText>
      </View>
    ),
    [colors, user],
  );

  const contentHaveUser = useMemo(
    () => (
      <View style={styles.container}>
        <View style={styles.pointContainer}>
          <View style={styles.rankContainer}>
            <Translation>
              {t => (
                <CustomText
                  style={styles.textColor}
                  variant="body1"
                  numberOfLines={1}>
                  {t('hi', {name: user?.name})}
                </CustomText>
              )}
            </Translation>
            {rank}
          </View>
          <Translation>
            {t => (
              <CustomText
                style={[styles.textColor, styles.pointNumber]}
                variant="meta2">
                {t('pointProgress', {
                  point: user?.point ?? 0,
                  maxPoint: MyApp.maxPoint,
                })}
              </CustomText>
            )}
          </Translation>
          <ProgressBar
            style={styles.progress}
            progress={(user?.point ?? 0) / 10000}
          />
        </View>
        {firstEmail}
      </View>
    ),
    [styles, user],
  );

  const welcomeView = useMemo(
    () => (
      <View>
        <Translation>
          {t => (
            <CustomText style={styles.textColor} variant="subheading1">
              {t('helloGuess')}
            </CustomText>
          )}
        </Translation>
        <Pressable
          onPress={navigateToSignIn}
          style={({pressed}) => [pressed && styles.pressed]}>
          <Translation>
            {t => (
              <CustomText style={styles.signin} variant="body2">
                {t('helloGuessSub')}
              </CustomText>
            )}
          </Translation>
        </Pressable>
      </View>
    ),
    [styles, navigateToSignIn],
  );

  return <View style={style}>{user ? contentHaveUser : welcomeView}</View>;
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    pointContainer: {
      width: 240,
    },
    rankContainer: {
      flexDirection: 'row',
    },
    firstEmailContainer: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: MyDimensions.borderRadiusMedium,
    },
    textColor: {
      color: colors.background,
    },
    pointNumber: {
      marginTop: 4,
    },
    progress: {
      marginTop: 2,
      backgroundColor: colors.outline,
    },
    rank: {
      backgroundColor: colors.primary,
      marginLeft: MyDimensions.paddingSmall,
      paddingHorizontal: MyDimensions.paddingSmall,
      borderRadius: MyDimensions.borderRadiusSmall,
    },
    signin: {
      color: colors.primary,
      marginTop: MyDimensions.paddingSmall,
    },
    pressed: {
      opacity: 0.7,
    },
  });
