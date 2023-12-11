import {View, StyleSheet, Pressable} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions, billStatus} from '../../../constants';
import {Icon, useTheme} from 'react-native-paper';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch} from '../../../store/hooks';
import {CustomText} from '../../common';
import {Translation} from 'react-i18next';
import {setFilterStatus} from '../../../store/bill/billsSlice';
import {useIsFocused} from '@react-navigation/native';
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated';

export default function HeaderSection() {
  const [indexCurrent, setIndexCurrent] = useState(0);

  const dispatch = useAppDispatch();

  const isFocus = useIsFocused();

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  useEffect(() => {
    if (!isFocus) {
      dispatch(setFilterStatus(billStatus[0]));
      setIndexCurrent(0);
    }
  }, [isFocus]);

  const onClickStatus = useCallback((index: number) => {
    dispatch(setFilterStatus(billStatus[index]));
    setIndexCurrent(index);
  }, []);

  return (
    <View style={styles.container}>
      <Translation>
        {t => (
          <CustomText style={styles.titleText} variant="heading2">
            {t('bill')}
          </CustomText>
        )}
      </Translation>
      <View style={styles.rowContainer}>
        {billStatus.map((status, index) => (
          <Pressable
            key={status.title}
            style={styles.statusContainer}
            onPress={() => {
              if (onClickStatus) onClickStatus(index);
            }}>
            <Icon
              source={status.icon}
              size={MyDimensions.iconLarge}
              color={colors.primary}
            />
            {indexCurrent === index && (
              <Animated.View
                entering={ZoomIn.duration(300)}
                exiting={ZoomOut.duration(200)}>
                <Translation>
                  {t => (
                    <CustomText style={styles.statusText} variant="body2">
                      {t(`${status.title}`)}
                    </CustomText>
                  )}
                </Translation>
              </Animated.View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: colors.tertiary,
      borderBottomLeftRadius: MyDimensions.borderRadiusLarge,
      borderBottomRightRadius: MyDimensions.borderRadiusLarge,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingMedium,
    },
    titleText: {
      color: colors.background,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: MyDimensions.paddingLarge,
    },
    statusContainer: {
      alignItems: 'center',
    },
    statusText: {
      color: colors.primary,
      marginTop: MyDimensions.paddingSmall,
    },
  });
