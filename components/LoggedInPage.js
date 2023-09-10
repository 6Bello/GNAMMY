import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UserRecipes from './UserRecipes';

const LoggedInPage = ({ user, userFavouriteRecipes, setUserFavouriteRecipes }) => {
    const [userRecipesLiked, setUseRecipesLiked] = useState(userFavouriteRecipes.length);
    useEffect(() => {
        setUseRecipesLiked(userFavouriteRecipes.length);
    }, [userFavouriteRecipes]);
    return (
        <View style={{ height: '100%' }}>
            <View style={styles.profileInfo}>
            <UserRecipes user={user} idUser={user.id} isLoggedIn={true} userFavouriteRecipes={userFavouriteRecipes} setUserFavouriteRecipes={setUserFavouriteRecipes} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileInfo: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    handle: {
        fontSize: 15,
        opacity: 0.5,
        marginBottom: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
        alignItems: 'center',
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statName: {
        fontSize: 15,
        opacity: 0.5,
    },
})

export default LoggedInPage
