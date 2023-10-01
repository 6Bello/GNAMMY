import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios"; // Assicurati che axios sia importato
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "./TextInput";
import { domain } from '../dns';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorText, setErrorText] = useState("");

  const setErrorMessage = () => {
    setErrorText("Funzione non ancora disponibile ");
  }

  const handleForgotPassword = async () => {
    try {
      // Invia una richiesta al server per generare un token di ripristino della password
      const response = await axios.post(`${domain}/forgot-password`, {
        email,
      });

      if (response.status === 200) {
        // Fornisci un feedback all'utente
        setMessage("Un'email di ripristino della password è stata inviata al tuo indirizzo email.");
      } else {
        // Fornisci un feedback all'utente in caso di errore
        setMessage("Si è verificato un errore durante la richiesta di ripristino della password.");
      }
    } catch (error) {
      console.error("Errore durante il ripristino della password:", error);
    }
  };

  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.navigate("Account");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Password dimenticata </Text>
      <View style={{padding: 1}}>
        <Image source={require('../assets/GoogleEmoji.png')} style={{ width: 180, height: 180 }} />
      </View>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>Inserisci qui l'indirizzo email{'\n'}con cui ti sei registrato:</Text>
      <View style={{ padding: 30 }}>
        <MyTextInput
          myStyle={styles.mailInput}
          value={email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)} />
      </View>
      <TouchableOpacity style={styles.button} onPress={setErrorMessage}>
        <Text style={styles.buttonText}>Invia</Text>
      </TouchableOpacity>
      <Text style={{ color: "red", marginTop: 10 }}>{errorText}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.goBack}>Torna indietro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#FFEFAF'
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
  mailInput: {
    width: 320,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  message: {
    marginTop: 10,
    color: "green",
  },
  goBack: {
    marginTop: 10,
    color: "#d8945c",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ForgotPassword;
