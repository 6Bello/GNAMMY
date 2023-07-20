import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NewRecipeCategory ({ user, userFavouriteRecipes, SetChosen }) {
    const categoriaScelta = () => {
        SetChosen(true);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: 300, alignItems: 'center'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 50}}>Di che categoria fa parte il tuo piatto?</Text>
                </View>
            <View>
                <TouchableOpacity style={styles.category} onPress={categoriaScelta}>
                    <Text style={styles.text}>Antipasto</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.category} onPress={categoriaScelta}>
                    <Text style={styles.text}>Primo</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.category} onPress={categoriaScelta}>
                    <Text style={styles.text}>Secondo</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.category} onPress={categoriaScelta}>
                    <Text style={styles.text}>Dolce</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    category: {
        width: 300,
        height: 150,
        borderRadius: 20,
        backgroundColor: 'lightblue',
        marginTop: 30,
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }

});