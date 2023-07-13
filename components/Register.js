import React, { useState } from "react";
import { Image, View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import axios from "axios";

import hashPassword from '../passwordUtils.js';


const Register = ({ OnRegistrationComplete, updateUserData }) => {
  const [username, setUsername] = useState('');
  const [usernameProblem, setUsernameProblem] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nameProblem, setNameProblem] = useState('');
  const [email, setEmail] = useState('');
  const [emailProblem, setEmailProblem] = useState('');
  const [password, setPassword] = useState('');
  const [passwordProblem, setPasswordProblem] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordProblem, setConfirmPasswordProblem] = useState('');


  let [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const thereArePasswordProblems = (text) => {
    setPassword(text);
    const problems = [];
    if (!(text.length >= 8 && text.length <= 18)) {
      problems.push('tra 8 e 18 caratteri');
    }
    if (!/[a-z]/.test(text)) {
      problems.push('una lettera minuscola');
    }
    if (!/[A-Z]/.test(text)) {
      problems.push('una lettera maiuscola');
    }
    if (!/[0-9]/.test(text)) {
      problems.push('un numero');
    }
    if (!/[@$!%*?&]/.test(text)) {
      problems.push('un carattere speciale');
    }
    if (problems.length > 0) {
      setPasswordProblem('La password deve contenere: ' + problems.join(' '));
    } else { setPasswordProblem(''); }
  };


  const handleRegistration = () => {
    const isEmailValid = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    const isUsernameValid = (username) => {
      return username.length >= 7 && username.length <= 20;
    };

    const isPasswordValid = (password, confirmPassword) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/;
      return password === confirmPassword && passwordRegex.test(password);
    };

    if (isEmailValid(email)) {
      setEmailProblem('')

      if (isUsernameValid(username)) {
        setUsernameProblem('')

        if (name.trim() !== '' && surname.trim() !== '') {
          setNameProblem('')

          if (password === confirmPassword) {
            setConfirmPasswordProblem('')

            if (isPasswordValid(password, confirmPassword)) {
              userRegistration(email, username, password, name, surname)
            } else { setPasswordProblem('La password deve contenere almeno 8 caratteri, di cui almeno una lettera maiuscola, una minuscola, un numero ed un carattere speciale!') }

          } else { setConfirmPassword('Le password non coincidono!') }

        } else { setNameProblem('Nome e/o cognome non validi!') }

      } else { setUsernameProblem('Username non valido! Inserisci un username tra i 7 ed i 20 caratteri') }

    } else { setEmailProblem('Email non valida!') }
  }

  const userRegistration = async (email, username, password, name, surname) => {
    try {
      const hashedPassword = await hashPassword(password);

      const response = await axios.post('http://79.32.231.27:8889/register', {
        email,
        password: hashedPassword,
        username,
        name,
        surname,
      });

      updateUserData(response.data);
      OnRegistrationComplete(); // Call the callback to set isLoggedIn to true
      console.log('Account creato con successo!');
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <View style={styles.container}>
      <View style={styles.Register}>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 30, width: 300 }}>
          <Image style={styles.image} source={require('../assets/bibimbap.png')} />
          <View style={{ marginLeft: 20, flex: 1, justifyContent: "center" }}>
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.subtitle}>Sign up to enjoy your food</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.button}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />

          <Text style={[styles.error, {
            display: usernameProblem ? 'flex' : 'none',
          }]}>{usernameProblem}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <TextInput
            style={styles.button}
            value={name}
            onChangeText={setName}
            placeholder="Name" />
        </View>

        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.button}
            value={surname}
            onChangeText={setSurname}
            placeholder="Cognome" />
        </View>

        <Text style={[styles.error, {
          display: nameProblem ? 'flex' : 'none',
        }]}>{nameProblem}</Text>
        <View style={{ marginTop: 20 }}>

          <View>
            <TextInput
              style={styles.button}
              value={email} onChangeText={setEmail}
              placeholder="Email" />
          </View>

          <Text style={[styles.error, {
            display: emailProblem ? 'flex' : 'none',
          }]}>{emailProblem}</Text>
        </View>

        <View style={{ marginTop: 20 }}>

          <View style={styles.passwordInput}>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={thereArePasswordProblems}
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

          <Text style={[styles.error, {
            display: passwordProblem ? 'flex' : 'none',
          }]}>{passwordProblem}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <TextInput style={styles.button} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm Password" secureTextEntry={!showPassword} />
          <Text style={[styles.error, {
            display: confirmPasswordProblem ? 'flex' : 'none',
          }]}>{confirmPasswordProblem}</Text>
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
          <Text style={{ lineHeight: 29, color: "white", fontSize: 17, fontWeight: "bold" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
  },
  Register: {
    marginHorizontal: 20,
  },
  passwords: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
    width: 300,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.5,
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    width: 300,
    backgroundColor: "#f8f4fc",
    display: 'flex',
  },
  registerButton: {
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: 300,
    height: 50,
    lineHeight: 30,
    fontSize: 20,
    backgroundColor: "orange",
    color: "white",
  },
  image: {
    width: 60,
    height: 60,
  },
  imgShowHidePassword: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },

  passwordInput: {
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
  }
});

export default Register;