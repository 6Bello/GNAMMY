import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios"; // Assicurati che axios sia importato
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "./TextInput";
import {domain} from '../dns';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
      <Text style={{fontSize: 100, padding: 20}}>🥲</Text>
      <Text style={{fontSize: 18, textAlign: 'center'}}>Inserisci qui l'indirizzo email{'\n'}con cui ti sei registrato:</Text>
      <View style={{ padding: 40 }}>
          <MyTextInput
            myStyle={styles.mailInput}
            value={email}
            placeholder="Email" 
            onChangeText={(text) => setEmail(text)}/>
        </View>
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Invia</Text>
      </TouchableOpacity>
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
