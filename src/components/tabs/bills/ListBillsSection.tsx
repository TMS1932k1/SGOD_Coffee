import {useCallback, useMemo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Icon, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {Translation} from 'react-i18next';
import {CustomText} from '../../common';
import BillItem from './BillItem';
import {Bill} from '../../../types/bill';
import {postPayBill} from '../../../store/bill/billsSlice';

export default function ListBillsSection() {
  const dispatch = useAppDispatch();

  const bills = useAppSelector(state => state.billsState.billsFilter);
  const filterStatus = useAppSelector(state => state.billsState.filterStatus);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const onPayBill = useCallback((bill: Bill) => {
    dispatch(postPayBill(bill));
  }, []);

  const emptyView = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Icon source={'clipboard-outline'} size={50} color={colors.outline} />
        <Translation>
          {t => (
            <CustomText style={styles.emptyText} variant="subheading2">
              {t('emptyBill', {
                status: t(`${filterStatus.title}`).toLowerCase(),
              })}
            </CustomText>
          )}
        </Translation>
      </View>
    ),
    [filterStatus],
  );

  return (
    <View style={styles.container}>
      {bills.length <= 0 ? (
        emptyView
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {bills.map(bill => (
            <BillItem key={bill.id} bill={bill} onPressPay={onPayBill} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingVertical: MyDimensions.paddingMedium,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      marginTop: MyDimensions.paddingSmall,
      color: colors.outline,
    },
  });
