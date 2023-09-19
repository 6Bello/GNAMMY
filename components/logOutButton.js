import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import {
    storeData,
    getData,
    removeData,
} from "./functions/AsyncStorage";

const LogOutButton = () => {

    const logOut = () => {
        removeData("userSavedData");
    }

    return (
        <TouchableOpacity style={{ width: 25, height: 25 }} onPress={logOut}>
            <Image style={{ width: 25, height: 25 }} source={require("../assets/search.png")} />
        </TouchableOpacity>
    )
};

export default LogOutButton;
