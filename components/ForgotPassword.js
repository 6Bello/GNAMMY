import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios"; // Assicurati che axios sia importato

const ForgotPassword = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Password dimenticata</Text>
      <Text>Inserisci il tuo indirizzo email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Invia</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBack}>Torna indietro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  message: {
    marginTop: 10,
    color: "green",
  },
  goBack: {
    marginTop: 20,
    color: "blue",
  },
});

export default ForgotPassword;
