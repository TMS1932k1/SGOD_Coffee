import {View, ViewStyle, StyleProp, StyleSheet, Text} from 'react-native';
import {useAppSelector} from '../../../store/hooks';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {useCallback, useMemo} from 'react';
import {CustomText} from '../../common';
import {MyDimensions} from '../../../constants';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function CarouselSection({style}: Props) {
  const events = useAppSelector(state => state.eventsState.events);

  const isLoading = useAppSelector(state => state.eventsState.isLoading);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const placeHolder = useCallback(
    (mes: string) => (
      <View style={styles.placeholderContainer}>
        <CustomText variant="body1">{mes}</CustomText>
      </View>
    ),
    [styles],
  );

  return (
    <View style={[styles.conatainer, style]}>
      {isLoading || !events || events.length <= 0 ? (
        placeHolder(isLoading ? 'Waiting' : 'Empty')
      ) : (
        <View />
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    conatainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: MyDimensions.borderRadiusMedium,
      backgroundColor: colors.outline,
    },
  });
