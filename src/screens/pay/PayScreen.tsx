import {View, StyleSheet, ScrollView} from 'react-native';
import {
  HomeStackNavigationScreenProps,
  HomeStackRouteScreenProps,
} from '../../types/stack';
import {useLayoutEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {MyDimensions} from '../../constants';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setOrders} from '../../store/pay/paySlice';
import {CustomStatusBar, Line} from '../../components/common';
import {
  AddressOption,
  OrderPayItem,
  PaySection,
  PointPromoSection,
  SummaryPaySection,
} from '../../components/pay';

interface Props {
  navigation: HomeStackNavigationScreenProps<'PayScreen'>;
}

export default function PayScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authState.user);

  const route = useRoute<HomeStackRouteScreenProps<'PayScreen'>>();
  const orders = route.params.orders;

  const {t} = useTranslation();

  useLayoutEffect(() => {
    dispatch(setOrders(orders));
    navigation.setOptions({
      headerTitle: t('orderPayMent'),
    });
  }, [navigation]);

  const listView = useMemo(
    () => (
      <View>
        {orders.map(item => (
          <OrderPayItem key={item.id} order={item} />
        ))}
      </View>
    ),
    [orders],
  );

  return (
    <ScrollView style={styles.constainer} showsVerticalScrollIndicator={false}>
      <CustomStatusBar />
      {listView}
      <AddressOption />
      {user?.point && user?.point >= 1000 && (
        <PointPromoSection style={styles.pointPromo} point={user.point} />
      )}
      <PaySection style={styles.payway} />
      <SummaryPaySection style={styles.summary} point={user?.point ?? 0} />
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
    marginBottom: 80,
  },
});
