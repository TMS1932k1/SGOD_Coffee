import {useMemo} from 'react';
import {View, StyleSheet, ViewStyle, StyleProp, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {Translation} from 'react-i18next';
import {CustomText} from '../common';
import {fontFamily} from '../../themes';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function NoteOption({style}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  return (
    <View style={[styles.container, style]}>
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>
            {t('note')}
          </CustomText>
        )}
      </Translation>
      <Translation>
        {t => (
          <TextInput
            style={styles.noteInputContainer}
            placeholder={t('optional')}
            placeholderTextColor={colors.outline}
            multiline={true}
            numberOfLines={4}
            keyboardType="default"
            cursorColor={colors.primary}
            maxLength={100}
          />
        )}
      </Translation>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: MyDimensions.paddingSmall,
      marginTop: MyDimensions.paddingLarge,
      paddingBottom: MyDimensions.paddingLarge,
    },
    noteInputContainer: {
      borderRadius: MyDimensions.paddingSmall,
      backgroundColor: colors.surface,
      marginTop: MyDimensions.paddingSmall,
      paddingHorizontal: MyDimensions.borderRadiusSmall,
      color: colors.onBackground,
      fontFamily: fontFamily.mulishSemiBold,
      fontSize: 14,
      textAlignVertical: 'top',
    },
    title: {
      color: colors.onBackground,
    },
  });
