import {View, StyleSheet, FlatList} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {Icon, useTheme} from 'react-native-paper';
import {MyDimensions} from '../../../constants';
import {ConfirmModal, CustomText, Line, TextButton} from '../../common';
import {Translation} from 'react-i18next';
import OrderItem from './OrderItem';
import {SelectType} from '../../../types/cart';
import {
  cancleSelect,
  removeOrder,
  removeSelects,
  setAllSelects,
  updateSelects,
} from '../../../store/cart/cartSlice';
import {Order} from '../../../types/order';
import {useIsFocused} from '@react-navigation/native';

export default function ListCartSection() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cartState.cart);
  const selects = useAppSelector(state => state.cartState.selects);
  const user = useAppSelector(state => state.authState.user);

  const isFocus = useIsFocused();

  const [selectType, setSelectType] = useState<SelectType>('none');
  const [showConfirmDialog, setConfigDialog] = useState(false);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  useEffect(() => {
    if (!isFocus) {
      setSelectType('none');
      dispatch(cancleSelect());
    }
  }, [isFocus]);

  const onPressSelect = useCallback((selectType: SelectType) => {
    setSelectType(selectType);
    if (selectType === 'none') {
      dispatch(cancleSelect());
    } else if (selectType === 'selectAll') {
      dispatch(setAllSelects());
    }
  }, []);

  const onRemoveSelects = useCallback(() => {
    dispatch(removeSelects());
  }, []);

  const onShowDialog = useCallback(() => {
    setConfigDialog(true);
  }, []);

  const hideShowDialog = useCallback(() => {
    setConfigDialog(false);
  }, []);

  const onPressCheckboxItem = useCallback((order: Order) => {
    dispatch(updateSelects(order));
  }, []);

  const onPressDelItem = useCallback((order: Order) => {
    dispatch(removeOrder([order]));
  }, []);

  const emptyView = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Icon source={'cart-outline'} size={50} color={colors.outline} />
        <Translation>
          {t => (
            <CustomText style={styles.emptyText} variant="subheading2">
              {t('emptyCart')}
            </CustomText>
          )}
        </Translation>
      </View>
    ),
    [],
  );

  const noteAuthView = useMemo(
    () =>
      !user && (
        <View style={styles.noteAuthContainer}>
          <Translation>
            {t => (
              <CustomText style={styles.noteAuthText} variant="body2">
                {t('noteAuth')}
              </CustomText>
            )}
          </Translation>
        </View>
      ),
    [user],
  );

  const selectView = useMemo(
    () => (
      <View style={[styles.filter]}>
        {selectType !== 'none' ? (
          <Translation>
            {t => (
              <TextButton onPress={onShowDialog} disable={selects.length <= 0}>
                {t('remove')}
              </TextButton>
            )}
          </Translation>
        ) : (
          <View />
        )}
        <Translation>
          {t => (
            <View style={styles.selectContainer}>
              <TextButton
                onPress={() =>
                  onPressSelect(selectType !== 'none' ? 'none' : 'select')
                }>
                {selectType !== 'none' ? t('cancle') : t('select')}
              </TextButton>
              <Line type="vertical" style={styles.line} />
              <TextButton
                onPress={() => onPressSelect('selectAll')}
                style={styles.selectAllBtn}>
                {t('selectAll')}
              </TextButton>
            </View>
          )}
        </Translation>
      </View>
    ),
    [selectType, styles, onPressSelect, selects],
  );

  const listView = useMemo(
    () => (
      <FlatList
        style={styles.listContainer}
        keyExtractor={item => item.id}
        data={cart}
        renderItem={({item}) => (
          <OrderItem
            order={item}
            isSelect={selects.includes(item)}
            isShowCheckbox={selectType !== 'none'}
            onPressCheckbox={onPressCheckboxItem}
            onPressDel={onPressDelItem}
          />
        )}
      />
    ),
    [styles, cart, selectType, onPressCheckboxItem, selects],
  );

  const confirmDialog = useMemo(
    () => (
      <Translation>
        {t => (
          <ConfirmModal
            title={t('confirm')}
            content={t('confirmTitle')}
            visible={showConfirmDialog}
            onHideModal={hideShowDialog}
            onConfirm={onRemoveSelects}
          />
        )}
      </Translation>
    ),
    [showConfirmDialog, onRemoveSelects, hideShowDialog],
  );

  return (
    <View style={styles.container}>
      {cart.length <= 0 ? (
        emptyView
      ) : (
        <View style={styles.cartConatainer}>
          {noteAuthView}
          {selectView}
          {listView}
          {confirmDialog}
        </View>
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
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
    cartConatainer: {
      width: '100%',
      alignItems: 'center',
    },
    filter: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: MyDimensions.paddingLarge,
      paddingHorizontal: MyDimensions.paddingLarge,
    },
    selectContainer: {
      flexDirection: 'row',
    },
    line: {
      backgroundColor: colors.primary,
      marginLeft: MyDimensions.paddingSmall,
    },
    selectAllBtn: {
      marginLeft: MyDimensions.paddingSmall,
    },
    listContainer: {
      width: '100%',
      paddingHorizontal: MyDimensions.paddingLarge,
      marginVertical: MyDimensions.paddingMedium,
    },
    noteAuthContainer: {
      marginTop: MyDimensions.paddingSmall,
    },
    noteAuthText: {
      color: colors.outline,
    },
  });
