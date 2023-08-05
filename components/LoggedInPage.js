import react, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UserRecipes from './UserRecipes';    


const LoggedInPage = ({ user, userFavouriteRecipes, setUserFavouriteRecipes }) => {
    const [userRecipesLiked, setUseRecipesLiked] = useState(userFavouriteRecipes.length);
    useEffect(() => {
        setUseRecipesLiked(userFavouriteRecipes.length);
    }, [userFavouriteRecipes]);
    return (
        <View style={{height: '100%'}}>
            <View style={{display: 'flex', justifyContent: 'center', width: '100%',  margin:5}}>
                <View style={{ flexDirection: "row", marginBottom: 5}}>
                    <View style={{flexDirection:'row', width: '40%', justifyContent: 'center'}}>
                        <Image source={require("../assets/user.png")} style={{ width: 50, height: 50 }} />
                        <View >
                            <Text style={styles.title}>{user.name}</Text>
                            <Text style={styles.subtitle}>@{user.name}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', width: '60%', flexDirection: 'row'}}>
                        <View style={{alignItems: 'flex-end'}}>
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
                            <Text style={styles.infoNumber}>{userRecipesLiked}</Text>
                        </View>
                        <View style={{ marginLeft: 25 }}>
                            <Text style={styles.infoName2}>Media{'\n'}Like</Text>
                            <Text style={styles.infoNumber}>3</Text>
                        </View>
                    </View>
                </View>
            </View>
            <UserRecipes user={user} idUser={user.id} isLoggedIn={true} userFavouriteRecipes={userFavouriteRecipes} setUserFavouriteRecipes={setUserFavouriteRecipes} />
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

export default LoggedInPage