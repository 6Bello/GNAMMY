import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Login = () => {
    return (
        <View>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password" />
        <TouchableOpacity> 
            <Text>Login</Text>
        </TouchableOpacity>
        </View>
    );
}

export default Login;

