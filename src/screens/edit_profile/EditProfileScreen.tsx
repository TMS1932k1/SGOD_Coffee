import {View, Text} from 'react-native';
import {HomeStackNavigationScreenProps} from '../../types/stack';
import {useLayoutEffect} from 'react';

interface Props {
  navigation: HomeStackNavigationScreenProps<'EditProfileScreen'>;
}

export default function EditProfileScreen({navigation}: Props) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
    });
  }, [navigation]);

  return (
    <View>
      <Text>EditProfileScreen</Text>
    </View>
  );
}
