import { AsyncStorage } from 'react-native';

export const DbStorageKey = {
  Units: "@Db:Units",
  SelectedUnit: "@Db:SelectedUnit"
};

export const AppStorageKey = {
  IsLogin: "@App:IsLogin",
};

export const clearStorageKey = async (key) => {
  await AsyncStorage.setItem(key, null);
};

export const clear = async () => {
  await AsyncStorage.clear();
};