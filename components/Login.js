import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import hashPassword from "../passwordUtils";

const Login = ({ onLoginComplete }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);

      axios
        .get("http://192.168.56.1:3000/login", {
          params: {
            email,
            password: hashedPassword,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            onLoginComplete();
          } else {
            alert("Credenziali errate");
          }
        })
        .catch((error) => {
          alert("Errore durante il login: " + error);
        });
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };

    return (
        <View>
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
            <TextInput value={password} onChangeText={setPassword} placeholder="Password" />
            <TouchableOpacity onPress={handleLogin}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;

