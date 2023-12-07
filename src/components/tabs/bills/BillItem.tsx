import {View, StyleSheet, Pressable} from 'react-native';
import {Bill} from '../../../types/bill';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {MyDimensions, billStatus} from '../../../constants';
import OrderBillItem from './OrderBillItem';
import {ContainedButton, CustomText} from '../../common';
import {Translation} from 'react-i18next';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {opacity} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

interface Props {
  bill: Bill;
  onDetail?: (bill: Bill) => void;
  onPressPay?: (bill: Bill) => void;
  onPressRemove?: (bill: Bill) => void;
}

export default function BillItem({
  bill,
  onPressPay,
  onPressRemove,
  onDetail,
}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <Pressable
      onPress={() => onDetail?.(bill)}
      style={({pressed}) => [pressed && styles.opacity]}>
      <Animated.View style={styles.container} entering={ZoomIn}>
        <Translation>
          {t => (
            <CustomText style={styles.idBillText} variant="body1">{`${t(
              'bill',
            )}: ${bill.id}`}</CustomText>
          )}
        </Translation>
        {bill.orders.map(order => (
          <OrderBillItem key={order.id} order={order} />
        ))}
        <View style={styles.lineDashed} />
        <Translation>
          {t => (
            <CustomText style={styles.text} variant="body2">
              {t('payMethodBill', {method: t(`${bill.payMetthod.title}`)})}
            </CustomText>
          )}
        </Translation>
        <Translation>
          {t => (
            <View style={styles.rowContainer}>
              <CustomText style={styles.priceText} variant="subheading1">
                {t('price', {price: bill.total.toLocaleString()})}
              </CustomText>
              <View style={styles.payBtnContainer}>
                {bill.status === billStatus[0] && (
                  <ContainedButton
                    style={styles.payBtn}
                    onPress={() => {
                      if (onPressPay) onPressPay(bill);
                    }}>
                    {t('pay')}
                  </ContainedButton>
                )}
                {bill.status.title === billStatus[1].title && (
                  <CustomText style={styles.disableText} variant="body1">
                    {t('confirmStatus')}
                  </CustomText>
                )}
                {bill.status.title === billStatus[2].title && (
                  <CustomText style={styles.disableText} variant="body1">
                    {t('shipStatus')}
                  </CustomText>
                )}
                {bill.status.title === billStatus[3].title && (
                  <ContainedButton style={styles.payBtn} onPress={() => {}}>
                    {t('review')}
                  </ContainedButton>
                )}
                {bill.status === billStatus[0] && (
                  <Pressable
                    style={styles.cancleBtn}
                    onPress={() => onPressRemove?.(bill)}>
                    <CustomText style={styles.disableText} variant="body1">
                      {t('cancle')}
                    </CustomText>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </Translation>
      </Animated.View>
    </Pressable>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: MyDimensions.paddingMedium,
      borderRadius: MyDimensions.borderRadiusMedium,
      backgroundColor: colors.surface,
      marginBottom: MyDimensions.paddingSmall,
    },
    idBillText: {
      marginBottom: MyDimensions.paddingMedium,
      color: colors.onBackground,
    },
    lineDashed: {
      borderBottomWidth: 1,
      borderColor: colors.outline,
      borderStyle: 'dashed',
      marginBottom: MyDimensions.paddingMedium,
    },
    text: {
      color: colors.onBackground,
    },
    rowContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      marginTop: MyDimensions.paddingMedium,
    },
    priceText: {
      flex: 3,
      color: colors.primary,
      overflow: 'hidden',
    },
    payBtnContainer: {
      flex: 4,
      alignItems: 'center',
    },
    payBtn: {
      height: 40,
      borderRadius: MyDimensions.borderRadiusSmall,
    },
    disableText: {
      color: colors.outline,
    },
    cancleBtn: {
      marginTop: MyDimensions.paddingSmall,
    },
    opacity: {
      opacity: 0.7,
    },
  });
