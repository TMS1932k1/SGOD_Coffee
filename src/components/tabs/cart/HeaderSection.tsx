import {useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import {CustomText, TextButton} from '../../common';
import {Translation} from 'react-i18next';
import {useAppSelector} from '../../../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../../types/stack';

export default function HeaderSection() {
  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'HomeTabNavigator'>>();

  const selects = useAppSelector(state => state.cartState.selects);

  const user = useAppSelector(state => state.authState.user);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // Navigate to [PayScreen] with [selects]
  const onPay = useCallback(() => {
    navigation.navigate('PayScreen', {orders: selects});
  }, [navigation, selects]);

  return (
    <View style={styles.container}>
      <Translation>
        {t => (
          <View style={styles.row}>
            <CustomText style={styles.titleText} variant="heading2">
              {t('myOrders')}
            </CustomText>
            <TextButton
              onPress={selects.length <= 0 || !user ? undefined : onPay}>
              {t('pay')}
            </TextButton>
          </View>
        )}
      </Translation>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 140,
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
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
  });
