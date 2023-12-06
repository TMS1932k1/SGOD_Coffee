import {useCallback, useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Icon, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {Translation} from 'react-i18next';
import {ConfirmModal, CustomText} from '../../common';
import BillItem from './BillItem';
import {Bill} from '../../../types/bill';
import {postPayBill, removeBill} from '../../../store/bill/billsSlice';

export default function ListBillsSection() {
  const dispatch = useAppDispatch();

  const bills = useAppSelector(state => state.billsState.billsFilter);
  const filterStatus = useAppSelector(state => state.billsState.filterStatus);

  const [showConfirmData, setConfigData] = useState<{
    isShow: boolean;
    itemRemove?: Bill;
  }>({isShow: false});

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const onPayBill = useCallback((bill: Bill) => {
    dispatch(postPayBill(bill));
  }, []);

  const onRemoveBill = useCallback(() => {
    if (showConfirmData.itemRemove)
      dispatch(removeBill([showConfirmData.itemRemove]));
  }, [showConfirmData]);

  const onShowModal = useCallback((bill: Bill) => {
    setConfigData({isShow: true, itemRemove: bill});
  }, []);

  const hideShowModal = useCallback(() => {
    setConfigData({isShow: false});
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

  const scrollView = useMemo(
    () => (
      <ScrollView showsVerticalScrollIndicator={false}>
        {bills.map(bill => (
          <BillItem
            key={bill.id}
            bill={bill}
            onPressPay={onPayBill}
            onPressRemove={onShowModal}
          />
        ))}
      </ScrollView>
    ),
    [styles, bills, onPayBill, onShowModal],
  );

  const confirmDialog = useMemo(
    () => (
      <Translation>
        {t => (
          <ConfirmModal
            title={t('confirm')}
            content={t('confirmTitle')}
            visible={showConfirmData.isShow}
            onHideModal={hideShowModal}
            onConfirm={onRemoveBill}
          />
        )}
      </Translation>
    ),
    [showConfirmData, hideShowModal],
  );

  return (
    <View style={styles.container}>
      {bills.length <= 0 ? emptyView : scrollView}
      {confirmDialog}
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
