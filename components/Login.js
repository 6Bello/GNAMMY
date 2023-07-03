import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
        .get("http://192.168.1.74:3000/login", {
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
            <TextInput style={styles.button} value={email} onChangeText={setEmail} placeholder="Email" />
            <TextInput style={styles.button}  value={password} onChangeText={setPassword} placeholder="Password" />
            <Text style={styles.fg}>Forget Password?</Text>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={{lineHeight: 30, color:"white", fontSize: 18, fontWeight:"bold"}}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      padding: 10,
      marginTop: 20,
      marginLeft: "13%",
      borderRadius: 5,
      width: "74%",
      backgroundColor: "#f8f4fc",
      display: 'flex',
    },

    fg: {
      fontWeight: "bold",
      alignItems: "center",
      padding: 10,
      marginTop: 20,
      marginLeft: "7%",
      width: 327,
      backgroundColor: "white",
      color: "#d8945c",
      textAlign: "center"
    },

    loginButton: {
      fontWeight: "bold",
      textAlign: "center",
      alignItems: "center",
      padding: 10,
      marginTop: 20,
      marginLeft: "13%",
      borderRadius: 5,
      width: "74%",
      height: 50,
      lineHeight: 30,
      fontSize: 15,
      backgroundColor: "orange",
      color: "white",
    },

    
});

export default Login;

