import {StyleSheet, View} from 'react-native';
import {Modal, Portal, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useMemo} from 'react';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {CustomText, TextButton} from '.';
import {MyDimensions} from '../../constants';
import {Translation} from 'react-i18next';

interface Props {
  visible?: boolean;
  title: string;
  content: string;
  onHideModal?: () => void;
  onConfirm?: () => void;
}

export default function ConfirmModal({
  visible = false,
  title,
  content,
  onHideModal,
  onConfirm,
}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onHideModal} style={styles.container}>
        <Animated.View style={styles.modalContainer} entering={ZoomIn}>
          <View style={styles.titleContainer}>
            <CustomText style={styles.titleText} variant="subheading2">
              {title}
            </CustomText>
          </View>
          <View style={styles.contentContainer}>
            <CustomText variant="body2">{content}</CustomText>
          </View>
          {onConfirm && onHideModal && (
            <View style={styles.submitContainer}>
              <Translation>
                {t => (
                  <TextButton
                    onPress={() => {
                      onConfirm();
                      onHideModal();
                    }}>
                    {t('confirm')}
                  </TextButton>
                )}
              </Translation>
            </View>
          )}
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
      backgroundColor: colors.background,
      borderRadius: MyDimensions.borderRadiusSmall,
    },
    titleContainer: {
      padding: MyDimensions.paddingMedium,
      backgroundColor: colors.primary,
      borderTopRightRadius: MyDimensions.borderRadiusSmall,
      borderTopLeftRadius: MyDimensions.borderRadiusSmall,
    },
    titleText: {
      color: colors.background,
    },
    contentContainer: {
      padding: MyDimensions.paddingMedium,
    },
    submitContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: MyDimensions.paddingMedium,
    },
  });
