import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from "axios";
import Recipes from "./Recipes";

const UserRecipes = ({ user, idUser, isLoggedIn = false, userFavouriteRecipes, setUserFavouriteRecipes }) => {
    const [recipes, setRecipes] = useState([0]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
    const updateRecipes = (newRecipes) => {
        setRecipes(newRecipes);
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);

    //get recipes
    useEffect(() => {
        console.log("user.createdRecipes: ", user.createdRecipes);
        axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
            .get('http://gnammy.mywire.org:80/getRecipesById', {
                params: {
                    recipeIds: user.createdRecipes
                }
            })
            .then(response => {
                const data = response.data;        // Quando la risposta viene ricevuta con successo, assegna i dati alla costante 'data'
                const updatedData = data.map(item => {
                    if (userFavouriteRecipes.includes(item.id)) {
                        return { ...item, isLiked: true };
                    } else {
                        return { ...item, isLiked: false };
                    }
                });
                console.log(updatedData);        // Stampa i dati sulla console
                setRecipes(updatedData);        // Imposta gli elementi ottenuti come valore dello stato 'recipes'
            })
            .catch(error => {
                console.error(error);        // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console

            });
        setRefreshing(false);
    }, [refreshing, user]);

    return (
        <View style={styleContainer.container}>
            <Recipes
                recipes={recipes}
                updateRecipes={updateRecipes}
                idUser={idUser}
                isLoggedIn={isLoggedIn}
                userFavouriteRecipes={userFavouriteRecipes}
                setUserFavouriteRecipes={setUserFavouriteRecipes}
                refreshing={refreshing}
                onRefresh={onRefresh}
                endRefreshing={false}
            />
        </View>
    );
}

const styleContainer = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '100%',
    },
});

export default UserRecipes;
