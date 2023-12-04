import {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Modal, Portal, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {MyDimensions} from '../../../constants';
import {CustomText, Line} from '../../common';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import StoreItem from './StoreItem';
import Animated, {ZoomIn} from 'react-native-reanimated';
import {Translation} from 'react-i18next';
import {Store} from '../../../types/store';
import {setStore} from '../../../store/pay/paySlice';

interface Props {
  visible?: boolean;
  onHideModal?: () => void;
}

export default function StoresModal({visible = false, onHideModal}: Props) {
  const dispatch = useAppDispatch();

  const stores = useAppSelector(state => state.payState.stores);
  const store = useAppSelector(state => state.payState.store);

  const isLoading = useAppSelector(state => state.payState.isLoadingStores);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), []);

  // Handle select store, set store in state
  const selectStore = useCallback((store: Store) => {
    if (onHideModal) onHideModal();
    dispatch(setStore(store));
  }, []);

  const loading = useMemo(
    () => (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    ),
    [],
  );

  return (
    <Portal>
      <Modal style={styles.container} visible={visible} onDismiss={onHideModal}>
        <Animated.View entering={ZoomIn}>
          <View style={styles.modal}>
            <Translation>
              {t => (
                <CustomText style={styles.title} variant="subheading1">
                  {t('allStores')}
                </CustomText>
              )}
            </Translation>
            <Line style={styles.line} />
            {isLoading ? (
              loading
            ) : (
              <FlatList
                style={styles.list}
                data={stores}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <StoreItem
                    store={item}
                    isSelected={item === store}
                    onPressStore={selectStore}
                  />
                )}
              />
            )}
          </View>
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
    modal: {
      width: 340,
      height: 440,
      backgroundColor: colors.background,
      borderRadius: MyDimensions.borderRadiusMedium,
      alignItems: 'center',
      padding: MyDimensions.paddingMedium,
    },
    line: {
      marginTop: MyDimensions.paddingSmall,
    },
    loading: {
      flex: 1,
      marginTop: MyDimensions.paddingSmall,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: colors.onBackground,
    },
    list: {
      width: '100%',
      marginTop: MyDimensions.paddingMedium,
    },
  });
