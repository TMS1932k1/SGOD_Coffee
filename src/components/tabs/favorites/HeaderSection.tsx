import {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import {CustomText} from '../../common';
import {Translation} from 'react-i18next';

export default function HeaderSection() {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={styles.container}>
      <Translation>
        {t => (
          <CustomText style={styles.titleText} variant="heading2">
            {t('favorite')}
          </CustomText>
        )}
      </Translation>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 140,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: colors.tertiary,
      borderBottomLeftRadius: MyDimensions.borderRadiusLarge,
      borderBottomRightRadius: MyDimensions.borderRadiusLarge,
      paddingHorizontal: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingLarge,
    },
    titleText: {
      color: colors.background,
    },
  });
