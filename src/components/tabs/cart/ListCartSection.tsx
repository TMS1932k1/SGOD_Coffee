import {View, StyleSheet, FlatList} from 'react-native';
import {useAppSelector} from '../../../store/hooks';
import {useMemo} from 'react';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {Icon, useTheme} from 'react-native-paper';
import {MyDimensions} from '../../../constants';
import {CustomText} from '../../common';
import {Translation} from 'react-i18next';
import OrderItem from './OrderItem';

export default function ListCartSection() {
  const cart = useAppSelector(state => state.cartState.cart);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const emptyView = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Icon source={'cart-outline'} size={50} color={colors.outline} />
        <Translation>
          {t => (
            <CustomText style={styles.emptyText} variant="subheading2">
              {t('emptyCart')}
            </CustomText>
          )}
        </Translation>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {cart.length <= 0 ? (
        emptyView
      ) : (
        <FlatList
          style={styles.listContainer}
          keyExtractor={item => item.id}
          data={cart}
          renderItem={({item}) => <OrderItem order={item} />}
        />
      )}
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      marginTop: MyDimensions.paddingSmall,
      color: colors.outline,
    },
    listContainer: {
      width: '100%',
      paddingHorizontal: MyDimensions.paddingLarge,
      marginVertical: MyDimensions.paddingMedium,
    },
  });
