import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // saving error
    console.log('AsyncStorage: Failed in saveString(): ', e);
    return false;
  }
};

export const saveObject = async <T>(key: string, value: T) => {
  const jsonValue = JSON.stringify(value);
  return await saveString(key, jsonValue);
};

export const getData = async <T>(key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : undefined;
  } catch (e) {
    // error reading value
    console.log('AsyncStorage: Failed in get: ', e);
    return undefined;
  }
};

export const removeData = async (key: string) => {
  return AsyncStorage.removeItem(key);
};
