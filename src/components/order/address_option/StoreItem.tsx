import {View, StyleSheet, Pressable} from 'react-native';
import {Store} from '../../../types/order';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {IconButton, useTheme} from 'react-native-paper';
import {useCallback, useMemo} from 'react';
import ImageBlurLoading from 'react-native-image-blur-loading';
import {MyDimensions} from '../../../constants';
import {CustomText, Line} from '../../common';
import Animated, {FadeIn} from 'react-native-reanimated';
import {getFullAddressString} from '../../../utils/getFormat';

interface Props {
  store: Store;
  isSelected?: boolean;
  onPressStore?: (store: Store) => void;
}

export default function StoreItem({
  store,
  isSelected = false,
  onPressStore,
}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  // Open map
  const openMap = useCallback(() => {}, []);

  return (
    <Animated.View entering={FadeIn}>
      <Pressable
        onPress={() => {
          if (onPressStore) onPressStore(store);
        }}
        style={[styles.container, isSelected && styles.containerSelected]}>
        <ImageBlurLoading style={styles.image} source={{uri: store.image}} />
        <View style={styles.infoContainer}>
          <IconButton
            onPress={openMap}
            icon={'google-maps'}
            iconColor={isSelected ? colors.background : colors.primary}
          />
          <Line
            style={[styles.line, isSelected && styles.lineSelected]}
            type="vertical"
          />
          <View style={styles.textContainer}>
            <CustomText
              style={[styles.text, isSelected && styles.textSelected]}
              variant="body1">
              {store.name}
            </CustomText>
            <CustomText
              style={[styles.text, isSelected && styles.textSelected]}
              variant="body2">
              {getFullAddressString(store!.location)}
            </CustomText>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.surface,
      marginBottom: MyDimensions.paddingMedium,
      borderRadius: MyDimensions.borderRadiusMedium,
    },
    containerSelected: {
      backgroundColor: colors.primary,
    },
    image: {
      width: '100%',
      height: 130,
      resizeMode: 'cover',
      borderTopLeftRadius: MyDimensions.borderRadiusMedium,
      borderTopRightRadius: MyDimensions.borderRadiusMedium,
    },
    infoContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: MyDimensions.paddingSmall,
      paddingRight: MyDimensions.paddingSmall,
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      paddingHorizontal: MyDimensions.paddingSmall,
    },
    text: {
      overflow: 'hidden',
      color: colors.onBackground,
    },
    textSelected: {
      color: colors.background,
    },
    line: {
      backgroundColor: colors.outline,
    },
    lineSelected: {
      backgroundColor: colors.background,
    },
  });
