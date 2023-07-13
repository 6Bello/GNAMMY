import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import hashPassword from "../passwordUtils";

const Login = ({ onLoginComplete, updateUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const hashedPassword = await hashPassword(password);

      axios
        .get("http://79.32.231.27:8889/login", {
          params: {
            email,
            password: hashedPassword,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const userData = response.data;
            console.log(userData)
            updateUserData(userData);

            // Utilizza i dati estratti come desideri
            console.log("Username:", userData.username);
            console.log("Name:", userData.name);
            console.log("Surname:", userData.surname);
            console.log("Email:", userData.email);

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

  let [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.button}
          value={email} onChangeText={setEmail}
          placeholder="Email" />
      </View>
      
      <View style={styles.passwordInput}>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {showPassword ? (
            <Image style={styles.imgShowHidePassword} source={require('./hideEye.png')} />
          ) : (
            <Image style={styles.imgShowHidePassword} source={require("./viewEye.png")} />
          )}
        </TouchableOpacity>

      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.fg}>Forget Password?</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={{ lineHeight: 30, color: "white", fontSize: 18, fontWeight: "bold" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },

  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    width: 300,
    backgroundColor: "#f8f4fc",
    display: 'flex',
  },

  fg: {
    fontWeight: "bold",
    alignItems: "center",
    padding: 10,
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
    borderRadius: 5,
    width: 300,
    height: 50,
    lineHeight: 30,
    fontSize: 15,
    backgroundColor: "orange",
    color: "white",
  },

  imgShowHidePassword: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },

  passwordInput: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    width: 300,
    backgroundColor: "#f8f4fc",
    display: "flex",
  },

  textInput: {
    flex: 1,
  },

  passwords: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 35,
  },
});

export default Login;

