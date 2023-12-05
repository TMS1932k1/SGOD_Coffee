import {useCallback, useEffect, useMemo} from 'react';
import {Translation} from 'react-i18next';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from '../common';
import {MyDimensions, priceShip} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getRankPromo} from '../../utils/rankUser';
import {setTotal} from '../../store/confirm/confirmSlice';
import PointPlusSection from './PointPlusSection';

interface Props {
  point: number;
  style?: StyleProp<ViewStyle>;
}

export default function SummaryPaySection({style, point}: Props) {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.confirmState.orders);
  const isShip = useAppSelector(state => state.confirmState.isShip);
  const total = useAppSelector(state => state.confirmState.total);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const totalOrders = useMemo(() => {
    let total = 0;
    orders.map(item => (total += item.total));
    return total;
  }, [orders]);

  useEffect(() => {
    let total = totalOrders;
    if (isShip) {
      total += priceShip;
    }
    total -= total * (getRankPromo(point) / 100);
    dispatch(setTotal(total));
  }, [isShip, totalOrders, point]);

  const tilte = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>
            {t('summary')}
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

  const totalView = useMemo(
    () => (
      <Translation>
        {t =>
          detailRowView(
            t('totalOrders'),
            t('price', {price: totalOrders.toLocaleString()}),
          )
        }
      </Translation>
    ),
    [totalOrders],
  );

  const shipToView = useMemo(
    () =>
      isShip && (
        <Translation>
          {t =>
            detailRowView(
              t('shipTo'),
              t('price', {price: priceShip.toLocaleString()}),
            )
          }
        </Translation>
      ),
    [isShip],
  );

  const discountView = useMemo(
    () =>
      point >= 1000 && (
        <Translation>
          {t => detailRowView(t('discount'), `${getRankPromo(point)}%`)}
        </Translation>
      ),
    [point],
  );

  return (
    <Translation>
      {t => (
        <View style={[styles.container, style]}>
          {tilte}
          {totalView}
          {shipToView}
          {discountView}
          <View style={styles.lineDash} />
          {detailRowView(
            t('total'),
            t('price', {price: total.toLocaleString()}),
          )}
          <PointPlusSection style={styles.pointplus} />
        </View>
      )}
    </Translation>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    detailRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: MyDimensions.paddingSmall,
      paddingHorizontal: MyDimensions.paddingSmall,
      alignItems: 'center',
    },
    textColor: {
      color: colors.onBackground,
    },
    title: {
      color: colors.onBackground,
    },
    lineDash: {
      width: '100%',
      marginTop: MyDimensions.paddingMedium,
      borderBottomColor: colors.outline,
      borderBottomWidth: 1,
      borderStyle: 'dashed',
    },
    pointplus: {
      marginTop: MyDimensions.paddingMedium,
    },
  });
