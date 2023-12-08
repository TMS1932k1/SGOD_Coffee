import {View, StyleSheet} from 'react-native';
import {Order} from '../../types/order';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {MyDimensions} from '../../constants';
import {CustomText, Line} from '../common';

interface Props {
  order: Order;
}

export default function OrderDetailItem({order}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.rowContainer}>
        <ImageBlurLoading
          style={styles.image}
          source={{uri: order.product.image}}
          resizeMode="cover"
        />
        <View>
          <CustomText variant="body1">{`${order.product.name}`}</CustomText>
          <View style={styles.rowOptions}>
            <CustomText variant="body2">{`Amount: ${order.amount}`}</CustomText>
            {order.product.type === 'drink' && (
              <Line style={styles.lineVertical} type="vertical" />
            )}
            {order.product.type === 'drink' && (
              <CustomText variant="body2">
                {`${order.volume!.ml} ml`}
              </CustomText>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    itemContainer: {
      width: '100%',
      marginBottom: MyDimensions.paddingMedium,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    image: {
      width: 44,
      height: 44,
      borderRadius: MyDimensions.borderRadiusSmall,
      marginRight: MyDimensions.paddingSmall,
    },
    line: {
      marginTop: MyDimensions.paddingSmall,
    },
    rowOptions: {
      flexDirection: 'row',
      marginTop: 2,
    },
    lineVertical: {
      marginHorizontal: MyDimensions.paddingSmall,
    },
    priceText: {
      marginTop: 2,
      color: colors.primary,
    },
  });
