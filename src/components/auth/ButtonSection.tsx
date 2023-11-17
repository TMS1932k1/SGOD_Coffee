import {Translation} from 'react-i18next';
import {View, Text, ViewStyle, StyleProp, StyleSheet} from 'react-native';
import ContainedButton from '../common/ContainedButton';
import {ReactNode, useMemo} from 'react';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {MyDimensions} from '../../constants';
import {CustomText} from '../common/CustomText';

interface Props {
  style?: StyleProp<ViewStyle>;
  errorMes?: string;
  children: ReactNode;
  onPress?: () => void;
}

export default function ButtonSection({
  errorMes,
  onPress,
  style,
  children,
}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const button = useMemo(
    () => (
      <Translation>
        {t => (
          <ContainedButton onPress={onPress} style={styles.btn}>
            {children}
          </ContainedButton>
        )}
      </Translation>
    ),
    [],
  );

  return (
    <View style={[styles.container, style]}>
      {errorMes && (
        <CustomText variant="body2" style={styles.errorText}>
          {errorMes}
        </CustomText>
      )}
      {button}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    errorText: {
      color: colors.error,
    },
    btn: {
      marginTop: MyDimensions.paddingSmall,
    },
  });
