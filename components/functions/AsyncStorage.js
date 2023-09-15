import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value, key) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Dato con chiave "${key}" rimosso con successo.`);
  } catch (error) {
    console.error(`Errore durante la rimozione del dato con chiave "${key}":`, error);
  }
};

export { storeData, getData, removeData };
