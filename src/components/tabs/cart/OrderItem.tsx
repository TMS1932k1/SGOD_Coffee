import {View, StyleSheet} from 'react-native';
import {MyDimensions} from '../../../constants';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {CustomText, Line} from '../../common';
import {Order} from '../../../types/order';
import ImageBlurLoading from 'react-native-image-blur-loading';

interface Props {
  order: Order;
}

export default function OrderItem({order}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
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
              <CustomText variant="body2">{`${
                order.volume!.ml
              } ml`}</CustomText>
            )}
          </View>
        </View>
      </View>
      <Line style={styles.line} />
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.surface,
      borderRadius: MyDimensions.borderRadiusMedium,
      padding: MyDimensions.paddingMedium,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: MyDimensions.borderRadiusSmall,
      marginRight: MyDimensions.paddingSmall,
    },
    rowOptions: {
      flexDirection: 'row',
      marginTop: 2,
    },
    lineVertical: {
      marginHorizontal: MyDimensions.paddingSmall,
    },
    line: {
      marginTop: MyDimensions.paddingSmall,
    },
  });
