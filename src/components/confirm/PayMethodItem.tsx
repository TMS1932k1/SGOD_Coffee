import {View, StyleSheet} from 'react-native';
import {PayMethod} from '../../types/pay';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {RadioButton, useTheme} from 'react-native-paper';
import {useMemo} from 'react';
import {MyDimensions} from '../../constants';
import {CustomText} from '../common';
import ImageBlurLoading from 'react-native-image-blur-loading';

interface Props {
  payMethod: PayMethod;
}

export default function PayMethodItem({payMethod}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={styles.container}>
      <RadioButton value={`${payMethod.id}`} />
      <CustomText style={styles.titleText} variant="subheading2">
        {payMethod.title}
      </CustomText>
      <View style={styles.imageContainer}>
        <ImageBlurLoading
          style={styles.image}
          source={{uri: payMethod.image}}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 65,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: MyDimensions.paddingMedium,
      borderRadius: MyDimensions.borderRadiusSmall,
      backgroundColor: colors.surface,
      marginBottom: MyDimensions.paddingSmall,
    },
    titleText: {
      flex: 1,
      marginLeft: MyDimensions.paddingSmall,
    },
    imageContainer: {
      padding: MyDimensions.paddingSmall,
      alignItems: 'flex-end',
    },
    image: {
      width: 40,
      height: 40,
    },
  });
