import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const handleLoginComplete = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const openRegistration = () => {
    setShowRegisterPage(true);
  };

  const openLogin = () => {
    setShowRegisterPage(false);
  };

  const handleRegistrationComplete = () => {
    setShowRegisterPage(false);
    handleLoginComplete(); // Set isLoggedIn to true
  };

  if (showRegisterPage) {
    return (
      <View>
        <Register onRegistrationComplete={handleRegistrationComplete} />
        <TouchableOpacity onPress={openLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
      );
  }

  return (
    <View>
      {isLoggedIn ? (
        <LoggedInPage handleLogout={handleLogout} />
      ) : (
        <NotLoggedInPage handleLoginComplete={handleLoginComplete} openRegistration={openRegistration} />
      )}
    </View>
  );
}

function NotLoggedInPage({ handleLoginComplete, openRegistration }) {
  return (
    <View>
      <Text>Benvenuto! Effettua il login o registrati per continuare.</Text>
      <Login onLoginComplete={handleLoginComplete}/>
      <TouchableOpacity onPress={openRegistration}>
        <Text>Registrazione</Text>
      </TouchableOpacity> 
    </View>
  );
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
