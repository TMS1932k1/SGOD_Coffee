import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {getColorOpacity} from '../../utils/colorOpacity';
import {IconButton, useTheme} from 'react-native-paper';
import {useCallback, useMemo} from 'react';
import {CustomText} from '../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setAmount} from '../../store/order/orderSlice';

interface Props {
  name: string;
  style?: StyleProp<ViewStyle>;
}

export default function AmountOption({style, name}: Props) {
  const dispatch = useAppDispatch();

  const amount = useAppSelector(state => state.orderState.amount);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // Inscrease amount
  const inscreaseAmount = useCallback(() => {
    dispatch(setAmount(amount + 1));
  }, [amount]);

  // Descreate amount, min is 1
  const descreaseAmount = useCallback(() => {
    if (amount > 1) {
      dispatch(setAmount(amount - 1));
    }
  }, [amount]);

  const title = useMemo(
    () => (
      <CustomText variant="subheading2" style={styles.title}>
        {name}
      </CustomText>
    ),
    [styles],
  );

  return (
    <View style={[styles.row, style]}>
      {title}
      <View style={styles.amountContainer}>
        <IconButton
          icon={'minus'}
          size={MyDimensions.iconSmall}
          onPress={descreaseAmount}
        />
        <CustomText variant="subheading2">{amount}</CustomText>
        <IconButton
          icon={'plus'}
          size={MyDimensions.iconSmall}
          onPress={inscreaseAmount}
        />
      </View>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: MyDimensions.paddingSmall,
      marginTop: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingSmall,
      borderBottomColor: getColorOpacity(colors.outline, 0.5),
      borderBottomWidth: 1,
      alignItems: 'center',
    },
    title: {
      color: colors.onBackground,
    },
    amountContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.outline,
      borderRadius: MyDimensions.borderRadiusLarge,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });
