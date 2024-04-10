import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 
 * @param key 
 * @param value 
 */
const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log('Data stored successfully.');
    } catch (error) {
        console.log('Error storing data:', error);
    }
};

/**
 * 
 * @param key 
 * @returns 
 */
const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log('Error retrieving data:', error);
    }
    return null;
};

export { storeData, getData };