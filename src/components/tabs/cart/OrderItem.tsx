import {View, StyleSheet} from 'react-native';
import {MyDimensions} from '../../../constants';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {Checkbox, Icon, useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {CustomText, Line} from '../../common';
import {Order} from '../../../types/order';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {Translation} from 'react-i18next';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  order: Order;
  isShowCheckbox?: boolean;
  isSelect?: boolean;
  onPressDel?: (order: Order) => void;
  onPressCheckbox?: (order: Order) => void;
}

export default function OrderItem({
  order,
  isSelect = false,
  isShowCheckbox = false,
  onPressCheckbox,
  onPressDel,
}: Props) {
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      if (event.translationX < 0) translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value < -MyDimensions.widthWindow * 0.3) {
        translateX.value = withTiming(
          -MyDimensions.widthWindow,
          undefined,
          isFinished => {
            if (isFinished && onPressDel) {
              runOnJS(onPressDel)(order);
            }
          },
        );
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const rIconStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < -MyDimensions.widthWindow * 0.3 ? 1 : 0,
    );
    return {opacity};
  });

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const view = useMemo(
    () => (
      <View style={styles.container}>
        <Animated.View style={[styles.delContainer, rIconStyle]}>
          <Icon
            source={'trash-can'}
            color={colors.error}
            size={MyDimensions.iconLarge}
          />
        </Animated.View>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View style={[styles.itemContainer, rStyle]}>
            <View style={[styles.row, styles.flexBetween]}>
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
                  <Translation>
                    {t => (
                      <CustomText variant="body1" style={styles.priceText}>
                        {t('price', {price: order.total.toLocaleString()})}
                      </CustomText>
                    )}
                  </Translation>
                </View>
              </View>
              {isShowCheckbox && (
                <Checkbox.Android
                  status={isSelect ? 'checked' : 'unchecked'}
                  onPress={() => {
                    if (onPressCheckbox) onPressCheckbox(order);
                  }}
                />
              )}
            </View>
            {order.note && (
              <Translation>
                {t => (
                  <CustomText variant="body2" style={styles.noteText}>
                    {`${t('note')}: ${order.note}`}
                  </CustomText>
                )}
              </Translation>
            )}
          </Animated.View>
        </PanGestureHandler>
      </View>
    ),
    [order, isSelect, isShowCheckbox],
  );

  return view;
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    itemContainer: {
      backgroundColor: colors.surface,
      borderRadius: MyDimensions.borderRadiusMedium,
      padding: MyDimensions.paddingSmall,
      marginBottom: MyDimensions.paddingSmall,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexBetween: {
      justifyContent: 'space-between',
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
    priceText: {
      marginTop: 2,
      color: colors.primary,
    },
    noteText: {
      marginTop: MyDimensions.paddingSmall,
      color: colors.outline,
    },
    delContainer: {
      position: 'absolute',
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
