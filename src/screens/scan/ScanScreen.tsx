import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {HomeStackNavigationScreenProps} from '../../types/stack';
import {useCallback, useLayoutEffect, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useAppDispatch} from '../../store/hooks';
import {addPointAuth} from '../../store/auth/authSlice';

interface Props {
  navigation: HomeStackNavigationScreenProps<'PayScreen'>;
}

export default function ScanScreen({navigation}: Props) {
  const dispatch = useAppDispatch();

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {backgroundColor: colors.onBackground},
      headerTintColor: colors.background,
    });
  }, [navigation]);

  const onAddPoint = useCallback(
    (point: number) => {
      dispatch(addPointAuth(point));
      navigation.pop();
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={({data}) => {
          let point = parseInt(data);
          onAddPoint(point);
        }}
        fadeIn={true}
        flashMode={RNCamera.Constants.FlashMode.torch}
      />
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.onBackground,
    },
  });
