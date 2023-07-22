import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from "axios";
import Recipes from "./Recipes";

const UserRecipes = ({ user, userFavouriteRecipes, updateUserFavouriteRecipes }) => {
    const [items, setItems] = useState([0]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
    const updateItems = (newItems) => {
        setItems(newItems);
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);
    
    //get recipes
    useEffect(() => {
        console.log("user.createdRecipes: ", user.createdRecipes);
        axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
            .get('http://79.32.231.27:8889/getRecipesById', {
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
                setItems(updatedData);        // Imposta gli elementi ottenuti come valore dello stato 'items'
                console.log("itemsId: ", items)
            })
            .catch(error => {
                console.error(error);        // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console

            });
        setRefreshing(false);
    }, [refreshing]);

    return (
        <View style={styleContainer.container}>
            <Recipes items={items} updateItems={updateItems} user={user} userFavouriteRecipes={userFavouriteRecipes} updateUserFavouriteRecipes={updateUserFavouriteRecipes} refreshing={refreshing} onRefresh={onRefresh} />
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
