import { AsyncStorage } from 'react-native';

export const DbStorageKey = {
    UnitOwners: "@Db:UnitOwners",
    SelectedUnit: "@Db:SelectedUnit"
};

export const AppStorageKey = {
    IsLogin: "@App:IsLogin",
};

export const clearStorageKey = async (key) => {
    await AsyncStorage.setItem(key, null);
};

export const removeAllStorageKey = async () => {
    for (var key in DbStorageKey) {
       await AsyncStorage.removeItem(DbStorageKey[key]);
    }   
};