import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import Recipes from '../components/Recipes';
import axios from 'axios';
import HeaderRightButton from '../components/HeaderRightButton';
import { set } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native';

import sendEmail from '../components/functions/sendEmail';

export default function Home({ idUser, user, isLoggedIn, userFavouriteRecipes, setUserFavouriteRecipes }) {
  //refreshing
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const [endRefreshing, setEndRefreshing] = React.useState(false);

  const onEndRefresh = React.useCallback(() => {
    setEndRefreshing(true);
  }, []);

  //get recipes
  const [recipes, setRecipes] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca

  useEffect(() => {
    if(isLoggedIn){
      console.log(user.email)
      sendEmail(user.email);
    }
    axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
      .get('http://79.32.231.27:8889/getRecipes', {
        params: {
          preferences: isLoggedIn ? { antipasto: user.userPreferences.antipasto, primo: user.userPreferences.primo, secondo: user.userPreferences.secondo } : null
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
        setRecipes(updatedData);        // Imposta gli elementi ottenuti come valore dello stato 'recipes'
      })
      .catch(error => {
        console.error(error);        // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console
      });
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
      .get('http://79.32.231.27:8889/getRecipes', {
        params: {
          preferences: isLoggedIn ? { antipasto: user.userPreferences.antipasto, primo: user.userPreferences.primo, secondo: user.userPreferences.secondo } : null,
          lastRecipe: Array.isArray(recipes) && recipes.length > 0 ? recipes[recipes.length - 1].id : null
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
        setRecipes(recipes.concat(updatedData));        // Imposta gli elementi ottenuti come valore dello stato 'recipes'
      })
      .catch(error => {
        console.error(error);        // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console
      });
    setEndRefreshing(false);
   }, [endRefreshing]);

  const updateRecipes = (data) => {
    setRecipes(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
  };
  return (
    <View style={styleContainer.container}>
      <Recipes
        style={{marginBottom: 20}}
        recipes={recipes}
        updateRecipes={updateRecipes}
        idUser={idUser}
        isLoggedIn={isLoggedIn}
        userFavouriteRecipes={userFavouriteRecipes}
        setUserFavouriteRecipes={setUserFavouriteRecipes}
        refreshing={refreshing}
        onRefresh={onRefresh}
        endRefreshing={endRefreshing}
        onEndRefresh={onEndRefresh}
      />
      {endRefreshing ? <ActivityIndicator  style={{marginBottom: 20, position: 'absolute', bottom: 10}} animating={endRefreshing} size="large" /> : null}
    </View>
  );
}

const styleContainer = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
});
