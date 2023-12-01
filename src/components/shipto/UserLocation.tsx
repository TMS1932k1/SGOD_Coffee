import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useTheme} from 'react-native-paper';
import {useCallback, useMemo} from 'react';
import {MyDimensions} from '../../constants';
import {User} from '../../types/auth';
import {CustomText, Line, TextButton} from '../common';
import {Translation} from 'react-i18next';
import {getFullAddressString} from '../../utils/getFormat';
import {Location} from '../../types/order';

interface Props {
  style?: StyleProp<ViewStyle>;
  onGet?: (location: Location, phone: string) => void;
  user: User;
}

export default function UserLocation({user, style, onGet}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const onPress = useCallback(() => {
    if (onGet) onGet(user.location!, user.phone);
  }, [onGet, user]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.infoContainer}>
        <Translation>
          {t => (
            <CustomText variant="body1">{`${t('userAddress')}:`}</CustomText>
          )}
        </Translation>
        <Translation>
          {t => (
            <CustomText variant="body2" style={styles.textContainer}>
              {`${t('phone')}: ${user.phone}`}
            </CustomText>
          )}
        </Translation>

        <CustomText variant="body2">
          {getFullAddressString(user.location!)}
        </CustomText>
      </View>
      <Line type="vertical" style={styles.line} />
      <Translation>
        {t => (
          <TextButton style={styles.getButton} onPress={onPress}>
            {t('get')}
          </TextButton>
        )}
      </Translation>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      paddingLeft: MyDimensions.paddingSmall,
      paddingRight: MyDimensions.paddingMedium,
      paddingVertical: MyDimensions.paddingSmall,
      backgroundColor: colors.surface,
      borderRadius: MyDimensions.borderRadiusSmall,
      borderColor: colors.outline,
      borderWidth: 1,
      alignItems: 'center',
    },
    getButton: {
      marginLeft: MyDimensions.paddingMedium,
    },
    infoContainer: {
      flex: 1,
    },
    line: {
      marginLeft: MyDimensions.paddingSmall,
    },
    textColor: {
      color: colors.onBackground,
    },
    textContainer: {
      marginTop: 2,
    },
  });
