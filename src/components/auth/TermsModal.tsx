import {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Modal, Portal, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../constants';
import {CustomText} from '../common/CustomText';
import {Translation} from 'react-i18next';
import Line from '../common/Line';

interface Props {
  visible?: boolean;
  onHideModal?: () => void;
}

export default function TermsModal({visible = false, onHideModal}: Props) {
  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onHideModal} style={styles.container}>
        <View style={styles.modalContainer}>
          <Translation>
            {t => (
              <CustomText variant="subheading1" style={styles.title}>
                {t('termsOfUseTitle').toLocaleUpperCase()}
              </CustomText>
            )}
          </Translation>
          <Line style={styles.line} />
          <View style={styles.contentContainer} />
          <Button style={styles.closeBtn} onPress={onHideModal}>
            <Translation>
              {t => (
                <CustomText variant="subheading2" style={styles.closeText}>
                  {t('close')}
                </CustomText>
              )}
            </Translation>
          </Button>
        </View>
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
      width: 340,
      padding: MyDimensions.paddingMedium,
      backgroundColor: colors.background,
      borderRadius: MyDimensions.borderRadiusSmall,
      alignItems: 'center',
    },
    contentContainer: {
      height: 360,
    },
    title: {
      color: colors.onBackground,
    },
    line: {
      marginTop: MyDimensions.paddingSmall,
    },
    closeBtn: {
      marginTop: MyDimensions.paddingSmall,
    },
    closeText: {
      color: colors.error,
    },
  });
