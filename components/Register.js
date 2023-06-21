import {React, useState} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import axios from "axios";

import hashPassword from '../passwordUtils.js';


const Register = () => {
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
                            console.log('Account creato con successo!');
                        }else{setPasswordProblem('La password deve contenere almeno 8 caratteri, di cui almeno una lettera maiuscola, una minuscola, un numero ed un carattere speciale!')}

                    }else{setConfirmPassword('Le password non coincidono!')}

                }else {setNameProblem('Nome e/o cognome non validi!')}

            }else {setUsernameProblem('Username non valido! Inserisci un username tra i 7 ed i 20 caratteri')}

        }else{setEmailProblem('Email non valida!')}
    }
    
    const userRegistration = async (email, username, password, name, surname) => {
      try {
        const hashedPassword = await hashPassword(password, 10);
        console.log('Password hash:', hashedPassword);
        
        const response = await axios.post('http://192.168.56.1:3000/register', {
          email,
          password: hashedPassword,
          username,
          name,

          surname,
        });
        
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    

    return (
        <View style={styles.Register}>
        <TextInput value={username} onChangeText={setUsername} placeholder="Username" />
        <Text style={styles.error}>{usernameProblem}</Text>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput value={name} onChangeText={setName} placeholder="Name"/>
          <TextInput value={surname} onChangeText={setSurname} placeholder="Cognome" style={{marginRight: 150}}/>
        </View>
        <Text style={styles.error}>{nameProblem}</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
        <Text style={styles.error}>{emailProblem}</Text>
        <View style={styles.passwordContainer}>
            <TextInput
            value={password}
            onChangeText={thereArePasswordProblems}
            placeholder="Password"
            secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.showHidePassword} onPress={togglePasswordVisibility}>
                <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
            </TouchableOpacity>       
        </View>
        <Text style={styles.error}>{passwordProblem}</Text>
        <TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm Password" secureTextEntry={false} />
        <Text style={styles.error}>{confirmPasswordProblem}</Text>
        <TouchableOpacity onPress={handleRegistration}>
            <Text>Register</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
    },
    error: {
      color: 'red',
      fontSize: 12,
      marginTop: -7,
    },
});

export default Register;