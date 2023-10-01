import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import schermata1Modal from '../assets/modals/schermata1Modal.png';
import schermata2Modal from '../assets/modals/schermata2Modal.png';
import schermata3Modal from '../assets/modals/schermata3Modal.png';
import schermata4Modal from '../assets/modals/schermata4Modal.png';
import schermata5Modal from '../assets/modals/schermata5Modal.png';
import schermata6Modal from '../assets/modals/schermata6Modal.png';


const AlertSignUp = ({ goToSignUp, modalVisible }) => {
    const [rand, setRand] = useState(1);
    const [i, setI] = useState(1);
    useEffect(() => {
        if (modalVisible) {
            setRand(Math.floor(Math.random() * 6) + 1);
        }

        // if (modalVisible) {
        //     setI(i + 1);
        //     if (i === 6) {
        //         setI(1);
        //         setRand(1);
        //     }
        //     else {
        //         setRand(i);
        //     }
        // }
    }, [modalVisible]);

    const imageMap = {
        1: schermata1Modal,
        2: schermata2Modal,
        3: schermata3Modal,
        4: schermata4Modal,
        5: schermata5Modal,
        6: schermata6Modal,
    };

    const imagePath = imageMap[rand];

    return (
        <Modal visible={modalVisible} animationType="fade" statusBarTranslucent={true}>
            <View style={styles.container}>
                <Image source={imagePath} style={styles.backgroundImage} />
                <Text style={styles.text}>Per poter accedere a questa funzionalità devi prima registrarti</Text>
                <TouchableOpacity style={styles.button} onPress={goToSignUp}>
                    <Text style={styles.buttonText}>Registrati</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb74d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 10,
        width: '95%',
    },
    button: {
        backgroundColor: '#449E48',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
        height: 65,
        width: 160,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },

});

export default AlertSignUp;
