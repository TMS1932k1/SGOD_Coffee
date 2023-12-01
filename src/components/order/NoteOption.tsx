import {useCallback, useMemo} from 'react';
import {View, StyleSheet, ViewStyle, StyleProp, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {Translation} from 'react-i18next';
import {CustomText} from '../common';
import {fontFamily} from '../../themes';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setNote} from '../../store/order/orderSlice';
import {getColorOpacity} from '../../utils/colorOpacity';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function NoteOption({style}: Props) {
  const dispatch = useAppDispatch();

  const note = useAppSelector(state => state.orderState.note);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const onChangeText = useCallback((value: string) => {
    dispatch(setNote(value.trim().length <= 0 ? undefined : value));
  }, []);

  const title = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText variant="subheading2" style={styles.title}>
            {t('note')}
          </CustomText>
        )}
      </Translation>
    ),
    [styles],
  );

  return (
    <View style={[styles.container, style]}>
      {title}
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
            value={note}
            onChangeText={onChangeText}
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
      paddingBottom: MyDimensions.paddingMedium,
      borderBottomColor: getColorOpacity(colors.outline, 0.5),
      borderBottomWidth: 1,
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
