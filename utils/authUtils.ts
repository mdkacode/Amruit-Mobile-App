import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "./localStorage"

const validateUserGlobalFunction = async () => {
    const loginInfo = await getData('loginInfo')
    if (loginInfo) {

        return loginInfo;
    }
    else return false;
}
const logoutUserGlobalFunction = async () => {
    AsyncStorage.clear()
}

export { validateUserGlobalFunction, logoutUserGlobalFunction };