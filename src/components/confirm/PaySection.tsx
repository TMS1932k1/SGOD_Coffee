import {useCallback, useMemo} from 'react';
import {View, ViewStyle, StyleProp, StyleSheet} from 'react-native';
import {RadioButton, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions, payMethods} from '../../constants';
import {Translation} from 'react-i18next';
import {CustomText} from '../common';
import PayMethodItem from './PayMethodItem';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setPayMethhod} from '../../store/confirm/confirmSlice';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function PaySection({style}: Props) {
  const dispatch = useAppDispatch();
  const payMethod = useAppSelector(state => state.confirmState.payMetthod);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const tilte = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>
            {t('payMethod')}
          </CustomText>
        )}
      </Translation>
    ),
    [styles],
  );

  // Set pay method to state
  const onSelectPayMethod = useCallback((newValue: string) => {
    const payMethod = payMethods.find(item => item.id === newValue);
    if (payMethod) {
      dispatch(setPayMethhod(payMethod));
    }
  }, []);

  return (
    <View style={[styles.container, style]}>
      {tilte}
      <View style={styles.listContainer}>
        <RadioButton.Group
          onValueChange={onSelectPayMethod}
          value={payMethod.id}>
          {payMethods.map(item => (
            <PayMethodItem key={item.id} payMethod={item} />
          ))}
        </RadioButton.Group>
      </View>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    title: {
      color: colors.onBackground,
    },
    listContainer: {
      marginTop: MyDimensions.paddingMedium,
    },
  });
