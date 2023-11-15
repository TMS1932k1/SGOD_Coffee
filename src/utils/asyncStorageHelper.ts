import AsyncStorage from '@react-native-async-storage/async-storage';

const saveString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // saving error
    console.log('AsyncStorage: Failed in saveString(): ', e);
    return false;
  }
};

const saveObject = async (key: string, value: object) => {
  const jsonValue = JSON.stringify(value);
  return await saveString(key, jsonValue);
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : undefined;
  } catch (e) {
    // error reading value
    console.log('AsyncStorage: Failed in get: ', e);
    return undefined;
  }
};

export default {saveString, saveObject, getData};
