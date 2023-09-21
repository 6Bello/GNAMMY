import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import {
    storeData,
    getData,
    removeData,
} from "./functions/AsyncStorage";
import { Ionicons } from '@expo/vector-icons';

const LogOutButton = ({setUser, setIsLoggedIn, setIdUser}) => {
    const logOut = () => {
        setIsLoggedIn(false);
        setUser(null)
        setIdUser(null);
        removeData("userSavedData");
    }

    return (
        <TouchableOpacity style={{ width: 25, height: 25 }} onPress={logOut}>
            <Ionicons name="log-out-outline" size={25} color="black" />
        </TouchableOpacity>
    )
};

export default LogOutButton;
