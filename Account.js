import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Login from './components/Login';
import Register from './components/Register';

export default function App(isLoggedIn) {

  const handleLoginComplete = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <View>
      {isLoggedIn ? (
        <LoggedInPage handleLogout={handleLogout} />
      ) : (
        <NotLoggedInPage handleLoginComplete={handleLoginComplete} />
      )}
    </View>
  );
}

function NotLoggedInPage({ handleLoginComplete }) {
  const openRegistration = () => {
    setShowRegisterPage(true);
  };
  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const openLogin = () => {
    setShowRegisterPage(false);
  };

  const handleRegistrationComplete = () => {
    setShowRegisterPage(false);
    handleLoginComplete(); // Set isLoggedIn to true
  };

  if (showRegisterPage) {
    return (
      <ScrollView style={styles.container}>
        <Register onRegistrationComplete={handleRegistrationComplete} />
        <Text style={styles.text2}>Already have an account?</Text>
        <TouchableOpacity onPress={openLogin}>
          <Text style={styles.text3}>Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 30, marginLeft: 25}}>
          <Image style={styles.image} source={require('./assets/hamburger.png')} />
          <View style={{marginLeft: 20, flex: 1, justifyContent: "center"}}>
            <Text style={styles.title}>Sign in</Text>
            <Text style={styles.subtitle} >Sign to your account</Text>
          </View>
        </View>
        <Login onLoginComplete={handleLoginComplete} />
        <Text style={styles.text2}>Don't have an account? </Text>
        <TouchableOpacity onPress={openRegistration}>
          <Text style={styles.text3}>Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

}

function LoggedInPage({ handleLogout }) {
  return (
    <View>
      <Text>Utente loggato!</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 15,
    opacity: 0.5,
  },

  image: {
    width: 60,
    height: 60,
    marginLeft: 30,
  },

  text2: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
    color: "black",
    display: "flex",
  },

  text3: {
    display: "flex",
    color: "orange",
    fontSize: 15,
    textAlign: "center",
  }

});