import {View, StyleSheet} from 'react-native';
import {Bill} from '../../../types/bill';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {MyDimensions, billStatus} from '../../../constants';
import OrderBillItem from './OrderBillItem';
import {ContainedButton, CustomText} from '../../common';
import {Translation} from 'react-i18next';
import Animated, {ZoomIn} from 'react-native-reanimated';

interface Props {
  bill: Bill;
  onPressPay?: (bill: Bill) => void;
}

export default function BillItem({bill, onPressPay}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
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
              {bill.status === billStatus[1] && (
                <CustomText style={styles.disableText} variant="body1">
                  {t('confirmStatus')}
                </CustomText>
              )}
              {bill.status === billStatus[2] && (
                <CustomText style={styles.disableText} variant="body1">
                  {t('shipStatus')}
                </CustomText>
              )}
              {bill.status === billStatus[3] && (
                <CustomText style={styles.disableText} variant="body1">
                  {t('doneStatus')}
                </CustomText>
              )}
            </View>
          </View>
        )}
      </Translation>
    </Animated.View>
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
      marginBottom: MyDimensions.paddingSmall,
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
    },
    payBtnContainer: {
      flex: 4,
      alignItems: 'flex-end',
    },
    payBtn: {
      height: 40,
      borderRadius: MyDimensions.borderRadiusSmall,
    },
    disableText: {
      color: colors.outline,
    },
  });
