import {useCallback, useMemo} from 'react';
import {View, StyleSheet, ViewStyle, StyleProp, Pressable} from 'react-native';
import {IconButton, ProgressBar, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from '../../../common/CustomText';
import {MyDimensions} from '../../../../constants';
import {Translation} from 'react-i18next';
import {
  getDetailNextRank,
  getRankColor,
  getRankTitle,
} from '../../../../utils/rankUser';
import {useAppSelector} from '../../../../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../../../types/stack';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function InfoUser({style}: Props) {
  const user = useAppSelector(state => state.authState.user);

  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'HomeTabNavigator'>>();

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const onScanQR = useCallback(() => {
    navigation.navigate('ScanScreen');
  }, [navigation]);

  const rank = useMemo(() => {
    let rankTitle = getRankTitle(user?.point ?? 0);
    return (
      rankTitle && (
        <View style={[styles.rank, {backgroundColor: getRankColor(rankTitle)}]}>
          <Translation>
            {t => <CustomText variant="body1">{t(`${rankTitle}`)}</CustomText>}
          </Translation>
        </View>
      )
    );
  }, [user]);

  const navigateToSignIn = useCallback(() => {
    navigation.navigate('SignInScreen');
  }, [navigation]);

  const contentHaveUser = useMemo(
    () => (
      <View style={styles.container}>
        <View style={styles.pointContainer}>
          <View style={styles.rankContainer}>
            <Translation>
              {t => (
                <CustomText
                  style={styles.textColor}
                  variant="subheading2"
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
                variant="meta1">
                {t('pointProgress', {
                  point: Math.min(
                    user?.point ?? 0,
                    getDetailNextRank(user?.point ?? 0).maxPoint,
                  ),
                  maxPoint: getDetailNextRank(user?.point ?? 0).maxPoint,
                })}
              </CustomText>
            )}
          </Translation>
          <ProgressBar
            style={styles.progress}
            progress={
              (user?.point ?? 0) / getDetailNextRank(user?.point ?? 0).maxPoint
            }
          />
        </View>
        <IconButton
          icon={'qrcode-scan'}
          size={MyDimensions.iconLarge}
          onPress={onScanQR}
          iconColor={colors.background}
        />
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
      alignItems: 'flex-start',
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
