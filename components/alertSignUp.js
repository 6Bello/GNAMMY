import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const c = 'pasta';
const b = 'I';

const AlertSignUp = ({ goToSignUp, modalVisible }) => {
    return (
        <Modal visible={modalVisible} animationType="fade" statusBarTranslucent={true}>
            <View style={styles.container}>
            <Image source={require('../assets/' + c + '.png')} style={styles.backgroundImage} />
                <Text style={styles.text}>Per poter accedere a questa funzionalità devi prima registrarti</Text>
                <TouchableOpacity style={styles.button} onPress={goToSignUp}>
                    <Text style={styles.buttonText}>Registrati</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb74d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
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
