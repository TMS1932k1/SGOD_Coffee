import {View, StyleSheet, ScrollView} from 'react-native';
import {
  HomeStackNavigationScreenProps,
  HomeStackRouteScreenProps,
} from '../../types/stack';
import {useCallback, useLayoutEffect, useMemo} from 'react';
import {Translation, useTranslation} from 'react-i18next';
import {MyDimensions, billStatus} from '../../constants';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setOrders} from '../../store/confirm/confirmSlice';
import {ContainedButton, CustomStatusBar} from '../../components/common';
import {
  AddressOption,
  OrderPayItem,
  PaySection,
  PointPromoSection,
  SummaryPaySection,
} from '../../components/confirm';
import {Bill} from '../../types/bill';
import {postAddBill} from '../../store/bill/billsSlice';
import {ActivityIndicator} from 'react-native-paper';
import {removeOrder} from '../../store/cart/cartSlice';

interface Props {
  navigation: HomeStackNavigationScreenProps<'ConfirmScreen'>;
}

export default function ConfirmScreen({navigation}: Props) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.authState.user);
  const isShip = useAppSelector(state => state.confirmState.isShip);
  const shipTo = useAppSelector(state => state.confirmState.shipTo);
  const phone = useAppSelector(state => state.confirmState.phone);
  const store = useAppSelector(state => state.confirmState.store);
  const payMethod = useAppSelector(state => state.confirmState.payMetthod);
  const total = useAppSelector(state => state.confirmState.total);
  const addPoint = useAppSelector(state => state.confirmState.addPoint);
  const isLoading = useAppSelector(state => state.billsState.isLoading);

  const route = useRoute<HomeStackRouteScreenProps<'ConfirmScreen'>>();

  const orders = route.params.orders;

  const {t} = useTranslation();

  useLayoutEffect(() => {
    dispatch(setOrders(orders));
    navigation.setOptions({
      headerTitle: t('orderPayMent'),
    });
  }, [navigation]);

  // Create new bill with status pay is pay and add to bill state
  const onConfirm = useCallback(() => {
    let newBill: Bill = {
      id: Date.now().toString(),
      createAt: Date.now(),
      user: user!,
      orders: orders,
      shipTo: isShip ? shipTo : undefined,
      phone: isShip ? phone : undefined,
      store: store!,
      payMetthod: payMethod,
      total: total,
      addPoint: addPoint,
      status: billStatus[0],
    };
    dispatch(postAddBill(newBill))
      .unwrap()
      .then(() => {
        dispatch(removeOrder(orders));
        navigation.navigate('HomeTabNavigator', {screen: 'BillsScreen'});
      });
  }, [user, isShip, shipTo, phone, store, payMethod, total, addPoint]);

  const contentView = useMemo(
    () => (
      <View>
        {orders.map(item => (
          <OrderPayItem key={item.id} order={item} />
        ))}
        <AddressOption />
        {user?.point && user?.point >= 1000 && (
          <PointPromoSection style={styles.pointPromo} point={user.point} />
        )}
        <PaySection style={styles.payway} />
        <SummaryPaySection style={styles.summary} point={user?.point ?? 0} />
      </View>
    ),
    [orders, styles],
  );

  const viewLoading = useMemo(
    () => (
      <View style={styles.submit}>
        <ActivityIndicator />
      </View>
    ),
    [styles],
  );

  return (
    <ScrollView style={styles.constainer} showsVerticalScrollIndicator={false}>
      <CustomStatusBar />
      {contentView}
      {isLoading ? (
        viewLoading
      ) : (
        <Translation>
          {t => (
            <ContainedButton
              onPress={onConfirm}
              style={styles.submit}
              disabled={isShip && !shipTo}>
              {t('confirm')}
            </ContainedButton>
          )}
        </Translation>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    paddingHorizontal: MyDimensions.paddingLarge,
    paddingVertical: MyDimensions.paddingMedium,
  },
  pointPromo: {
    marginTop: MyDimensions.paddingLarge,
  },
  payway: {
    marginTop: MyDimensions.paddingLarge,
  },
  summary: {
    marginTop: MyDimensions.paddingLarge,
    marginBottom: MyDimensions.paddingLarge,
  },
  submit: {
    marginBottom: 60,
  },
});
