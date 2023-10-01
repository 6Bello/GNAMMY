import react, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UserRecipes from '../components/UserRecipes';    


const ProfilePage = ({ route }) => {
      // Accedi alle prop passate da 'CurrentComponent'
    const { user, idUser, userFavouriteRecipes, setUserFavouriteRecipes} = route.params;
    console.log("userFavouriteRecipes: ", userFavouriteRecipes);
    console.log("user: ", user);
    // const userRecipesLiked = user.favouriteRecipes.match(/(\d+)/g) ? user.favouriteRecipes.match(/(\d+)/g):0;
    return (
        <View style={{height: '100%'}}>
            <UserRecipes user={user} idUser={idUser} isLoggedIn={userFavouriteRecipes!=''} userFavouriteRecipes={userFavouriteRecipes} setUserFavouriteRecipes={setUserFavouriteRecipes} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    subtitle: {
        fontSize: 15,
        opacity: 0.5,
    },

    infoNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },

    infoName: {
        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 10,
    },

    infoName2: {
        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
    },

    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default ProfilePage;