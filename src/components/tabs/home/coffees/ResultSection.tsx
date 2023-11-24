import {useMemo} from 'react';
import {Translation} from 'react-i18next';
import {View, ViewStyle, StyleProp, StyleSheet} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {CustomText} from '../../../common';
import {useTheme} from 'react-native-paper';
import {useAppSelector} from '../../../../store/hooks';
import CoffeeItem from './CoffeeItem';
import {MyDimensions} from '../../../../constants';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function ResultSection({style}: Props) {
  const searchText = useAppSelector(state => state.searchState.searchText);

  const coffees = useAppSelector(state => state.searchState.coffees);

  const colors = useTheme().colors;

  const styles = useMemo(() => styling(colors), [colors]);

  const title = useMemo(
    () => (
      <Translation>
        {t => (
          <CustomText style={styles.title} variant="heading2" numberOfLines={1}>
            {t('result', {searchText: searchText})}
          </CustomText>
        )}
      </Translation>
    ),
    [styles, searchText],
  );

  return (
    <View style={[style]}>
      {title}
      <View style={styles.column}>
        {coffees.map(item => (
          <CoffeeItem key={item.id} coffee={item} style={styles.item} />
        ))}
      </View>
    </View>
  );
}

const styling = (colors: MD3Colors) =>
  StyleSheet.create({
    title: {
      color: colors.onBackground,
      overflow: 'hidden',
    },
    column: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: MyDimensions.paddingMedium,
    },
    item: {
      marginBottom: MyDimensions.paddingSmall,
    },
  });
