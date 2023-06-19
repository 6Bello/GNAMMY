import {React, useState} from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

const Register = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordProblem, setPasswordProblem] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    let [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const thereArePasswordProblems = (text) => {
        setPassword(text);
        const problems = [];
        if (!(text.length >= 8 && text.length <= 18)) {
          problems.push('La password deve contenere tra 8 e 18 caratteri');
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
        setPasswordProblem(problems.join(', '));
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
            if(isUsernameValid(username)){

                if(name!=null && surname!=null){

                    if(password === confirmPassword){

                        if(isPasswordValid(password, confirmPassword)){
                            console.log('Account creato con successo!');
                        }else{console.log('La password deve contenere almeno 8 caratteri, di cui almeno una lettera maiuscola, una minuscola, un numero ed un carattere speciale!')}

                    }else{console.log('Le password non coincidono!')}

                }else {console.log('Nome e/o cognome non validi!')}

            }else {console.log('Username non valido! Inserisci un username tra i 7 ed i 20 caratteri')}

        }else{console.log('Email non valida!')}
    }
    

    return (
        <View style={styles.Register}>
        <TextInput value={username} onChangeText={setUsername} placeholder="Username" />
        <TextInput value={name} onChangeText={setName} placeholder="Name" />
        <TextInput value={surname} onChangeText={setSurname} placeholder="Cognome" />
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
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
        <TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm Password" secureTextEntry={true} />
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