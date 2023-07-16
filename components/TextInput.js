import React, { useState } from 'react';
import { Image, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';


const MyTextInput = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    autoComplete
  }) => {
    const [isFocused, setIsFocused] = useState(false);
  
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };
  
    const borderColor = isFocused ? 'blue' : 'gray'; // Colore del contorno durante lo stato di focus
  
    return (
      <View>
        <TextInput
          style={[styles.button, { borderColor: borderColor, borderWidth: 1 }]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
        />
      </View>
    );
  };

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
  
    MyTextInput: {
      flex: 1,
    }
  });
  
  export default MyTextInput;