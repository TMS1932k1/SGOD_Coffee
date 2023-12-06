import {StyleSheet, View} from 'react-native';
import {Icon, Modal, Portal, useTheme} from 'react-native-paper';
import {MyDimensions} from '../../constants';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useMemo} from 'react';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {CustomText} from '../common';
import {Translation} from 'react-i18next';

interface Props {
  visible?: boolean;
  onHideModal?: () => void;
}

export default function OrderNoteModal({visible = false, onHideModal}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onHideModal} style={styles.container}>
        <Animated.View style={styles.modalContainer} entering={ZoomIn}>
          <Icon source={'cart-check'} color={colors.primary} size={90} />
          <Translation>
            {t => (
              <CustomText style={styles.text} variant="subheading1">
                {t('addSuccessCart')}
              </CustomText>
            )}
          </Translation>
        </Animated.View>
      </Modal>
    </Portal>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: 280,
      paddingVertical: MyDimensions.paddingLarge,
      backgroundColor: colors.background,
      borderRadius: MyDimensions.borderRadiusSmall,
      alignItems: 'center',
    },
    text: {
      width: 150,
      marginTop: MyDimensions.paddingLarge,
      color: colors.primary,
      textAlign: 'center',
    },
  });
