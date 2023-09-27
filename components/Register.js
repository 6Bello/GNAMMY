import React, { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import axios from "axios";
import { domain } from '../dns';
import MyTextInput from "./TextInput.js";
import MyPasswordInput from "./PasswordInput.js";

import hashPassword from '../passwordUtils.js';
import { set } from "react-native-reanimated";

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
  const [emailVerify, setEmailVerify] = useState(false);
  const [temporanyAccount, setTemporanyAccount] = useState('');

  const thereArePasswordProblems = (text) => {
    setPassword(text);
    const problems = [];
    if (!(text.length >= 8 && text.length <= 30)) {
      problems.push('tra 8 e 30 caratteri');
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
    if (!/[@$!%*?&-]/.test(text)) {
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
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,30}$/;
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

          } else { setConfirmPasswordProblem('Le password non coincidono!') }

        } else { setNameProblem('Nome e/o cognome non validi!') }

      } else { setUsernameProblem('Username non valido! Inserisci un username tra i 7 ed i 20 caratteri') }

    } else { setEmailProblem('Email non valida!') }
  }

  const userRegistration = async (email, username, password, name, surname) => {
    try {
      const hashedPassword = await hashPassword(password);

      const response = await axios.post(`${domain}/register`, {
        email,
        password: hashedPassword,
        username,
        name,
        surname,
      });
      console.log(response.data);
      // 
      setTemporanyAccount(response.data);
      console.log('Account creato con successo!Verifica l email per confermare la registrazione');
      setEmailVerify(true);
    } catch (error) {
      if (error.response.status === 409) { // 409 Conflict
        console.log('Email già registrata!');
        setEmailProblem('Email già registrata!');
      } else if (error.response.status === 410) { // 410 Gone
        console.log('Username già registrato!');
        setUsernameProblem('Username già registrato!');
      } else {
        console.error(error);
      }
    }
  };

  const EmailVerified = async () => {
    try {
      console.log(email)
      const response = await axios.get(`${domain}/checkEmailVerification`, {
        params: {
          email: email,
        }
      });
      console.log(response.data);
      if (response.data == true) {
        updateUserData(temporanyAccount, true);
        OnRegistrationComplete();
        console.log('Email verificata con successo!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('emailVerify: ', emailVerify);
    if (emailVerify) {
      const intervalId = setInterval(EmailVerified, 5000);
      console.log('Intervallo avviato');

      // Cleanup: ferma l'intervallo quando l'effetto viene pulito
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [emailVerify]);



  if (emailVerify === false) {
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
            <MyTextInput
              value={username} onChangeText={setUsername} problem={usernameProblem}
              placeholder="Username"
            />

            <Text style={[styles.error, {
              display: usernameProblem ? 'flex' : 'none',
            }]}>{usernameProblem}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View style={{ width: '48%' }}>
              <MyTextInput
                maxLength={20}
                value={name}
                onChangeText={setName}
                placeholder="Name"
                />
            </View>
            <View style={{ width: '48%' }}>
              <MyTextInput
                maxLength={20}
                value={surname} onChangeText={setSurname}
                placeholder="Cognome"
              />
            </View>
          </View>

          <Text style={[styles.error, {
            display: nameProblem ? 'flex' : 'none',
          }]}>{nameProblem}</Text>
          <View style={{ marginTop: 20 }}>

            <View>
              <MyTextInput
                value={email} onChangeText={setEmail} problem={emailProblem}
                placeholder="Email"
                keyboardType={'email-address'}
                autoComplete={'email'} />
            </View>

            <Text style={[styles.error, {
              display: emailProblem ? 'flex' : 'none',
            }]}>{emailProblem}</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <MyPasswordInput
              style={styles.MyTextInput}
              value={password}
              onChangeText={thereArePasswordProblems}
              placeholder="Password"
              autoComplete={'password'}
              problem={passwordProblem}
            />

            <Text style={[styles.error, {
              display: passwordProblem ? 'flex' : 'none',
            }]}>{passwordProblem}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <MyPasswordInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm Password" problem={confirmPasswordProblem} />
            <Text style={[styles.error, {
              display: confirmPasswordProblem ? 'flex' : 'none',
            }]}>{confirmPasswordProblem}</Text>
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
            <Text style={{ lineHeight: 29, color: 'white', fontSize: 17, fontWeight: 'bold' }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[{ height: 500, color: 'orange', backgroundColor: '#FFEFAF' }]}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '5%' }}>
          <View style={{ width: 118, height: 150, }}>
            <Image style={{ width: 118, height: 150, marginLeft: 1 }} src={(`${domain}/img/logo.png`)} />
          </View>
          <View style={{ width: '60%', marginTop: 50, }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: "black", }}>MANCA L'ULTIMO PASSAGGIO</Text>
            <Text style={[{ color: 'black' }]}>Conferma la tua email per entrare a far parte del team!</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', }}>
            <Text style={[styles.text3, { color: 'black', marginTop: '25%', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }]}>Controlla la tua casella di posta elettronica e clicca sul link di conferma</Text>
          </View>
        </View>
        <ActivityIndicator style={{ marginTop: '20%' }} size={"large"} color="#0000ff" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEFAF',
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
    backgroundColor: "#f8f4fc",
    display: 'flex',
    width: '100%',
    height: 50,
  },
  registerButton: {
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    height: 50,
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
    backgroundColor: "#f8f4fc",
    display: "flex",
  },
  textInputContainer: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f8f4fc",
    display: 'flex',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
  },

  // title: {
  //   fontSize: 25,
  //   fontWeight: 'bold',
  //   marginTop: 20,
  //   color: "orange",
  // },
  text2: {
    color: "orange",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
  },
  text3: {
    color: "orange",
    display: "flex",
    fontSize: 15,
    textAlign: "center",
  }
});

export default Register;