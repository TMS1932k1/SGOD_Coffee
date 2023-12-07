import {View, ViewStyle, StyleProp, StyleSheet, Pressable} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {ActivityIndicator, Icon, useTheme} from 'react-native-paper';
import {useCallback, useMemo} from 'react';
import {useAppSelector} from '../../store/hooks';
import {ContainedButton, CustomText} from '../common';
import {Translation} from 'react-i18next';
import {MyDimensions} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigationScreenProps} from '../../types/stack';

interface Props {
  onSetScan?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function BottomShowResult({style, onSetScan}: Props) {
  const navigation =
    useNavigation<HomeStackNavigationScreenProps<'ScanScreen'>>();

  const isLoading = useAppSelector(state => state.scanState.isLoading);
  const bill = useAppSelector(state => state.scanState.bill);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const onConfirmBill = useCallback(() => {
    if (onSetScan) onSetScan();
    navigation.navigate('DetailBillScreen', {bill: bill!});
  }, [navigation, bill]);

  const resultView = useMemo(
    () =>
      bill ? (
        <Translation>
          {t => (
            <ContainedButton onPress={onConfirmBill}>
              {t('seeBill', {id: bill.id})}
            </ContainedButton>
          )}
        </Translation>
      ) : (
        <Pressable
          style={({pressed}) => [
            styles.emptyConatiner,
            (pressed || !onSetScan) && styles.opacity,
          ]}
          onPress={onSetScan}>
          <Icon
            source={'backup-restore'}
            size={MyDimensions.iconMedium}
            color={colors.background}
          />
          <Translation>
            {t => (
              <CustomText style={styles.emptyResult} variant="body1">
                {t('resultEmpty')}
              </CustomText>
            )}
          </Translation>
        </Pressable>
      ),
    [bill],
  );

  return (
    <View style={[styles.container, style]}>
      {isLoading ? <ActivityIndicator /> : resultView}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
      paddingBottom: 60,
    },
    emptyConatiner: {
      flexDirection: 'row',
    },
    emptyResult: {
      color: colors.background,
      marginLeft: MyDimensions.paddingSmall,
    },
    opacity: {
      opacity: 0.7,
    },
  });
