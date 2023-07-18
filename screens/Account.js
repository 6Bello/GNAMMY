import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Login from '../components/Login';
import Register from '../components/Register';
import LoggedInPage from '../components/LoggedInPage';
export default function App({user, isLoggedIn, updateUserData}) {

  return (
    <View>
      {isLoggedIn ? (
        <LoggedInPage user={user} />
      ) : (
        <NotLoggedInPage updateUserData={updateUserData} />
      )}
    </View>
  );
}

function NotLoggedInPage({ updateUserData }) {
  const openRegistration = () => {
    setShowRegisterPage(true);
  };
  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const openLogin = () => {
    setShowRegisterPage(false);
  };

  const OnRegistrationComplete = () => {
    setShowRegisterPage(false);
  };
  if (showRegisterPage) {
    return (
      <ScrollView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Register OnRegistrationComplete={OnRegistrationComplete} updateUserData={updateUserData}/>  
          <View>
            <Text style={styles.text2}>Already have an account?</Text>
            <TouchableOpacity onPress={openLogin}>
              <Text style={styles.text3}>Sign in</Text>
            </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
  );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 30, marginLeft: 25}}>
          <Image style={styles.image} source={require('../assets/hamburger.png')} />
          <View style={{marginLeft: 20, flex: 1, justifyContent: "center"}}>
            <Text style={styles.title}>Sign in</Text>
            <Text style={styles.subtitle} >Sign to your account</Text>
          </View>
        </View>
        <Login updateUserData={updateUserData}/>
        <Text style={styles.text2}>Don't have an account? </Text>
        <TouchableOpacity onPress={openRegistration}>
          <Text style={styles.text3}>Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
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
    alignItems: "center",
  },

  text3: {
    display: "flex",
    color: "orange",
    fontSize: 15,
    textAlign: "center",
  }

});