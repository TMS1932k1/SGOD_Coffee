import {useCallback, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions, priceShip} from '../../constants';
import {Translation} from 'react-i18next';
import {CustomText} from '../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setTotal} from '../../store/order/orderSlice';

export default function SummarySection() {
  const dispatch = useAppDispatch();

  const product = useAppSelector(state => state.orderState.product);
  const amount = useAppSelector(state => state.orderState.amount);
  const size = useAppSelector(state => state.orderState.volume);
  const isShip = useAppSelector(state => state.orderState.isShip);
  const note = useAppSelector(state => state.orderState.note);
  const store = useAppSelector(state => state.orderState.store);
  const shipTo = useAppSelector(state => state.orderState.shipTo);
  const total = useAppSelector(state => state.orderState.total);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // Auto set total to calculate when options are changed
  useEffect(() => {
    dispatch(setTotal());
  }, [amount, size, isShip, note, store, shipTo]);

  const title = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>
            {t('total').toLocaleUpperCase()}
          </CustomText>
        )}
      </Translation>
    ),
    [styles],
  );

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

  const amountRow = useMemo(
    () => (
      <Translation>
        {t =>
          detailRowView(
            `${t('amount')} (${amount})`,
            `${product?.price.toLocaleString()} x ${amount}`,
          )
        }
      </Translation>
    ),
    [amount, product, detailRowView],
  );

  const volumeRow = useMemo(
    () =>
      product?.type === 'drink' && (
        <Translation>
          {t =>
            detailRowView(
              `${t('volume').replace(', ml', ` (${size.ml} ml)`)}`,
              `${size.priceAdd.toLocaleString()} đ`,
            )
          }
        </Translation>
      ),
    [size, product, detailRowView],
  );

  const shipRow = useMemo(
    () =>
      isShip && (
        <View>
          <Translation>
            {t =>
              detailRowView(`${t('ship')}`, `${priceShip.toLocaleString()} đ`)
            }
          </Translation>
        </View>
      ),
    [isShip, detailRowView],
  );

  const totalRow = useMemo(
    () => (
      <Translation>
        {t =>
          detailRowView(`${t('totalTitle')}`, `${total.toLocaleString()} đ`)
        }
      </Translation>
    ),
    [total, detailRowView],
  );

  return (
    <View style={styles.container}>
      <View>
        {title}
        {amountRow}
        {volumeRow}
        {shipRow}
      </View>
      <View style={styles.divideLine} />
      {totalRow}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: MyDimensions.paddingSmall,
      marginVertical: MyDimensions.paddingLarge,
    },
    title: {
      color: colors.onBackground,
    },
    detailRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: MyDimensions.paddingSmall,
      alignItems: 'center',
    },
    divideLine: {
      width: '100%',
      height: 1,
      borderBottomColor: colors.outline,
      borderBottomWidth: 1,
      borderStyle: 'dashed',
      marginTop: MyDimensions.paddingMedium,
    },
    textColor: {
      color: colors.onBackground,
    },
  });
