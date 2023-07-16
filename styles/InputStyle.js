import { StyleSheet } from 'react-native';
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

  export default styles;