import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegistration = () => {
    setShowRegisterPage(true);
  };

  const handleRegistrationComplete = () => {
    setShowRegisterPage(false);
  };

  if (showRegisterPage) {
    return <Register onRegistrationComplete={handleRegistrationComplete} />;
  }

  return (
    <View>
      {isLoggedIn ? (
        <LoggedInPage handleLogout={handleLogout} />
      ) : (
        <NotLoggedInPage handleLogin={handleLogin} handleRegistration={handleRegistration} />
      )}
    </View>
  );
}

function NotLoggedInPage({ handleLogin, handleRegistration }) {
  return (
    <View>
      <Text>Benvenuto! Effettua il login o registrati per continuare.</Text>
      <Login />
      <TouchableOpacity onPress={handleRegistration}>
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
