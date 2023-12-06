import {IconButton, useTheme} from 'react-native-paper';
import {MyDimensions} from '../../constants';
import {StyleSheet, View} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useMemo} from 'react';
import {CustomText} from '../common';
import {useAppSelector} from '../../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../types/stack';

export default function CartActionIcon() {
  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'OrderScreen'>>();

  const cart = useAppSelector(state => state.cartState.cart);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View>
      <IconButton
        icon={'cart'}
        size={MyDimensions.iconLarge}
        onPress={() => {
          navigation.navigate('HomeTabNavigator', {screen: 'CartScreen'});
        }}
      />
      {cart.length > 0 && (
        <View style={styles.badgeContainer}>
          <CustomText style={styles.text} variant="meta1">
            {cart.length}
          </CustomText>
        </View>
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    badgeContainer: {
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.error,
      borderRadius: MyDimensions.borderRadiusLarge,
      padding: 2,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    text: {
      color: colors.background,
      overflow: 'hidden',
    },
  });
