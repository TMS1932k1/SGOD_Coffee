import {View, StyleSheet, ScrollView} from 'react-native';
import {
  HomeStackNavigationScreenProps,
  HomeStackRouteScreenProps,
} from '../../types/stack';
import {useCallback, useLayoutEffect, useMemo} from 'react';
import {useRoute} from '@react-navigation/native';
import {MyDimensions} from '../../constants';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {ActivityIndicator, Icon, useTheme} from 'react-native-paper';
import {
  ContainedButton,
  CustomStatusBar,
  CustomText,
} from '../../components/common';
import {Translation} from 'react-i18next';
import {OrderDetailItem} from '../../components/detail_bill';
import {getFormatDate, getFullAddressString} from '../../utils/getFormat';
import {Location} from '../../types/order';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {postAddBill} from '../../store/bill/billsSlice';

interface Props {
  navigation: HomeStackNavigationScreenProps<'DetailBillScreen'>;
}

export default function DetailBillScreen({navigation}: Props) {
  const route = useRoute<HomeStackRouteScreenProps<'DetailBillScreen'>>();
  const bill = route.params.bill;

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.billsState.isLoading);

  const user = useAppSelector(state => state.authState.user);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: bill.id,
      headerTitleAlign: 'center',
    });
  }, [navigation, route]);

  const onAddBill = useCallback(() => {
    if (user && !bill.user) {
      dispatch(postAddBill({...bill, user: user}))
        .unwrap()
        .then(() => {
          navigation.navigate('HomeTabNavigator', {
            screen: 'HomeScreen',
          });
        });
    }
  }, [bill, user]);

  const detailRowView = useCallback(
    (title: String, priceAdd: string) => {
      return (
        <View style={styles.detailRow}>
          <CustomText
            style={styles.textColor}
            variant="body1">{`${title}:`}</CustomText>
          <CustomText style={styles.textColor} variant="body2">
            {priceAdd}
          </CustomText>
        </View>
      );
    },
    [styles],
  );

  const storeView = useMemo(
    () => (
      <View style={styles.storeView}>
        <Icon
          source={'google-maps'}
          size={MyDimensions.iconMedium}
          color={colors.primary}
        />
        <View style={styles.addressContainer}>
          <CustomText
            style={[styles.textColor, styles.storeText]}
            variant="body1">{`${bill.store.name}`}</CustomText>
          <CustomText
            style={[styles.textColor, styles.storeText]}
            variant="body2">
            {getFullAddressString(bill.store.location)}
          </CustomText>
        </View>
      </View>
    ),
    [styles, colors, bill],
  );

  const shipToView = useCallback(
    (shipTo: Location) => (
      <View style={styles.shipToView}>
        <Icon
          source={'truck-fast'}
          size={MyDimensions.iconMedium}
          color={colors.primary}
        />
        <View style={styles.addressContainer}>
          <CustomText
            style={[styles.textColor, styles.storeText]}
            variant="body1">
            {bill.phone}
          </CustomText>
          <CustomText
            style={[styles.textColor, styles.storeText]}
            variant="body2">
            {getFullAddressString(shipTo)}
          </CustomText>
        </View>
      </View>
    ),
    [styles, colors],
  );

  const detailView = useMemo(
    () => (
      <Translation>
        {t => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}>
            {bill.orders.map((item, index) => (
              <OrderDetailItem key={index} order={item} />
            ))}
            <View style={styles.lineDashed} />
            {storeView}
            {bill.shipTo && shipToView(bill.shipTo)}
            <View style={styles.lineDashed} />
            {detailRowView(t('date'), getFormatDate(new Date(bill.createAt)))}
            {detailRowView(t('status'), t(`${bill.status.title}`))}
            {detailRowView(t('payMethod'), bill.payMetthod.title)}
            {detailRowView(
              t('total'),
              t('price', {price: bill.total.toLocaleString()}),
            )}
            {detailRowView(t('memberPoint'), `+${bill.addPoint.toString()}`)}
          </ScrollView>
        )}
      </Translation>
    ),
    [styles, bill, storeView, shipToView, detailRowView],
  );

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      {detailView}
      {!bill.user &&
        (isLoading ? (
          <ActivityIndicator style={styles.confirmBtn} />
        ) : (
          <Translation>
            {t => (
              <ContainedButton style={styles.confirmBtn} onPress={onAddBill}>
                {t('confirm')}
              </ContainedButton>
            )}
          </Translation>
        ))}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingTop: MyDimensions.paddingMedium,
      paddingBottom: MyDimensions.navbarHeight,
    },
    scrollContainer: {
      flex: 1,
    },
    storeView: {
      width: '100%',
      flexDirection: 'row',
      marginBottom: MyDimensions.paddingMedium,
      alignItems: 'center',
    },
    shipToView: {
      width: '100%',
      flexDirection: 'row',
      marginTop: MyDimensions.paddingSmall,
      marginBottom: MyDimensions.paddingMedium,
      alignItems: 'center',
    },
    confirmBtn: {
      marginBottom: MyDimensions.paddingLarge,
    },
    lineDashed: {
      borderBottomWidth: 1,
      borderColor: colors.outline,
      borderStyle: 'dashed',
      marginBottom: MyDimensions.paddingMedium,
    },
    detailRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: MyDimensions.paddingSmall,
      alignItems: 'center',
    },
    textColor: {
      color: colors.onBackground,
    },
    storeText: {
      marginLeft: MyDimensions.paddingSmall,
    },
    addressContainer: {
      flex: 1,
      marginLeft: MyDimensions.paddingSmall,
    },
  });
