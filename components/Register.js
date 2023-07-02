import React, {useState} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import axios from "axios";

import hashPassword from '../passwordUtils.js';


const Register = ({onRegistrationComplete}) => {
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
        if(problems.length > 0){
            setPasswordProblem('La password deve contenere: ' + problems.join(' '));
        }else {setPasswordProblem('');}
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
        
        if ( isEmailValid(email) ){
            setEmailProblem('')

            if(isUsernameValid(username)){
                setUsernameProblem('')

                if(name.trim() !== '' && surname.trim() !== ''){
                    setNameProblem('')

                    if(password === confirmPassword){
                        setConfirmPasswordProblem('')

                        if(isPasswordValid(password, confirmPassword)){
                            userRegistration(email, username, password, name, surname)
                        }else{setPasswordProblem('La password deve contenere almeno 8 caratteri, di cui almeno una lettera maiuscola, una minuscola, un numero ed un carattere speciale!')}

                    }else{setConfirmPassword('Le password non coincidono!')}

                }else {setNameProblem('Nome e/o cognome non validi!')}

            }else {setUsernameProblem('Username non valido! Inserisci un username tra i 7 ed i 20 caratteri')}

        }else{setEmailProblem('Email non valida!')}
    }
    
    const userRegistration = async (email, username, password, name, surname) => {
      try {
        const hashedPassword = await hashPassword(password);
        console.log('Password hash:', hashedPassword);
        
        const response = await axios.post('http://192.168.1.71:3000/register', {
          email,
          password: hashedPassword,
          username,
          name,
          surname,
        });
        
        console.log(response);        
        onRegistrationComplete(); // Call the callback to set isLoggedIn to true
        console.log('Account creato con successo!');
      } catch (error) {
        console.error(error);
      }
    };
    
  
    

    return (
        <View style={styles.container}>
        <View style={styles.Register}>
          <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Register to enjoy your food</Text>
          <TextInput style={styles.button} value={username} onChangeText={setUsername} placeholder="Username" />
        <Text style={styles.error}>{usernameProblem}</Text>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput style={styles.button} value={name} onChangeText={setName} placeholder="Name"/>
        </View>  
        <View>
        <TextInput style={styles.button} value={surname} onChangeText={setSurname} placeholder="Cognome"/>
        </View>
        <Text style={styles.error}>{nameProblem}</Text>
        <TextInput style={styles.button} value={email} onChangeText={setEmail} placeholder="Email" />
        <Text style={styles.error}>{emailProblem}</Text>
        <View style={styles.passwordContainer}>
            <TextInput style={styles.button}
            value={password}
            onChangeText={thereArePasswordProblems}
            placeholder="Password"
            secureTextEntry={!showPassword}
            />
        </View>
        <Text style={styles.error}>{passwordProblem}</Text>
        <TouchableOpacity style={styles.showHidePassword} onPress={togglePasswordVisibility}>
                <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
            </TouchableOpacity>
        <TextInput style={styles.button} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm Password" secureTextEntry={false} />
        <Text style={styles.error}>{confirmPasswordProblem}</Text>
        <TouchableOpacity onPress={handleRegistration}>
            <Text>Register</Text>
        </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      width: '100%',
    },
    Register: {
        marginHorizontal: 20,
    },
    passwordContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    showHidePassword: {
        color: 'blue',
        fontSize: 12,
        marginLeft: 220,

    },
    error: {
      color: 'red',
      fontSize: 12,
      marginTop: 7,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginLeft: 100,
      paddingTop: 25,
    },
    subtitle: {
      fontSize: 15,
      opacity: 0.5,
      marginLeft: 100,
    },
    button: {
      alignItems: "center",
      padding: 10,
      marginTop: 20,
      marginLeft: 20,
      borderRadius: 5,
      width: 300,
      backgroundColor: "#f8f4fc",
      display: 'flex',
    },
    registerButton: {
    },
});

export default Register;