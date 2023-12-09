import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {HomeStackNavigationScreenProps} from '../../types/stack';
import {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {Icon, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useAppDispatch} from '../../store/hooks';
import {MyDimensions} from '../../constants';
import {CustomText} from '../../components/common';
import {Translation} from 'react-i18next';
import {fetchBillWithId, setInit} from '../../store/scan/scanSlice';
import {BottomShowResult} from '../../components/scan';

interface Props {
  navigation: HomeStackNavigationScreenProps<'PayScreen'>;
}

export default function ScanScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const [isScanned, setScanned] = useState(false);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const setScanAgain = useCallback(() => {
    dispatch(setInit());
    setScanned(false);
  }, []);

  useLayoutEffect(() => {
    dispatch(setInit());
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {backgroundColor: colors.tertiary},
      headerTintColor: colors.background,
    });
  }, [navigation]);

  const qrScanView = useMemo(
    () => (
      <QRCodeScanner
        onRead={({data}) => {
          if (!isScanned) {
            setScanned(true);

            let idBill = data;
            console.log(idBill);

            dispatch(fetchBillWithId(idBill));
          }
        }}
        cameraType="back"
        fadeIn={true}
        reactivate={true}
        containerStyle={{backgroundColor: colors.tertiary}}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <View style={styles.topContainer}>
            {isScanned ? (
              <BottomShowResult
                style={styles.topContainer}
                onSetScan={setScanAgain}
              />
            ) : (
              <View style={styles.topContainer}>
                <Translation>
                  {t => (
                    <CustomText style={styles.titleText} variant="body1">
                      {t('qrIntroduce')}
                    </CustomText>
                  )}
                </Translation>
              </View>
            )}
          </View>
        }
      />
    ),
    [isScanned],
  );

  return <View style={styles.container}>{qrScanView}</View>;
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    topContainer: {
      flex: 1,
      padding: MyDimensions.paddingMedium,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      color: colors.background,
    },
  });
