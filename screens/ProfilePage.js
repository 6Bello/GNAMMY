import react, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UserRecipes from '../components/UserRecipes';    


const ProfilePage = ({ route }) => {
      // Accedi alle prop passate da 'CurrentComponent'
    const { user, userFavouriteRecipes, setUserFavouriteRecipes} = route.params;
    console.log("userFavouriteRecipes: ", userFavouriteRecipes);
    console.log("user: ", user);
    // const userRecipesLiked = user.favouriteRecipes.match(/(\d+)/g) ? user.favouriteRecipes.match(/(\d+)/g):0;
    return (
        <View style={{height: '100%'}}>
            <View style={{ marginLeft: 40, display: "flex", flexDirection: "row" }}>
                <Image source={require("../assets/user.png")} style={{ width: 50, height: 50 }} />
                <Text style={styles.title}>{user.name}</Text>
                <Text style={styles.subtitle}>@{user.username}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginLeft: 10, alignItems: "flex-end" }}>
                <View style={{ display: "flex", width: 100, alignItems: 'flex-end', marginLeft: -20 }}>
                    <Text style={styles.infoName}>Ricette</Text>
                    <View style={{ alignItems: 'center', flexDirection: "row" }}>
                        <Text style={styles.infoNumber}>3</Text>
                        <TouchableOpacity style={styles.addButton}>
                            <View style={{ backgroundColor: 'grey', borderRadius: 50, padding: 1, marginRight: -5, marginLeft: 7 }}>
                                <MaterialCommunityIcons name="plus" color={"black"} size={20} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginLeft: 25 }}>
                    <Text style={styles.infoName2}>Like{'\n'}messi</Text>
                    <Text style={styles.infoNumber}>{user.favouriteRecipes.length}</Text>
                </View>
                <View style={{ marginLeft: 25 }}>
                    <Text style={styles.infoName2}>Media{'\n'}Like</Text>
                    <Text style={styles.infoNumber}>3</Text>
                </View>
            </View>
            <UserRecipes user={user} isLoggedIn={userFavouriteRecipes!=''} userFavouriteRecipes={userFavouriteRecipes} setUserFavouriteRecipes={setUserFavouriteRecipes} />
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