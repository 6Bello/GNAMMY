import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const AlertSignUp = ({ goToSignUp, modalVisible }) => {
    return (
        <Modal visible={modalVisible} animationType="fade" transparent={true} statusBarTranslucent={true}>
            <View style={styles.container}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default AlertSignUp;
