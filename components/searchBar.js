import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ImageBackground, Text, ActivityIndicator } from 'react-native'; // Aggiunta dell'importazione mancante
import axios from 'axios';

const SearchBar = ({ loadingTrue, loadingFalse, updateRecipes, updateUsersSearched }) => {
  const [searchText, setSearchText] = useState('alla'); // Stato per memorizzare il testo di ricerca

  const searchRecipeByName = () => {
    updateUsersSearched([]);
    loadingTrue();
    axios
      .get(`http://79.32.231.27:8889/getRecipesByName/${searchText}`) // Effettua una richiesta GET all'API specificata
      .then((response) => {
        const data = response.data; // Ottiene i dati di risposta dall'API
        console.log(data); // Stampa i dati di risposta nella console
        updateRecipes(data); // Imposta gli elementi ottenuti come valore dello stato 'recipes'
      })
      .catch(error => {
        console.error(error); // Stampa eventuali errori nella console
      })
      .finally(() => {
        loadingFalse();
      });
  };

  const searchUsersByName = () => {
    updateRecipes([]);
    loadingTrue();
    axios
      .get(`http://79.32.231.27:8889/getUsers/${searchText}`)
      .then((response) => {
        console.log(response.data);
        response.data.forEach(item => {
          item.createdRecipes = item.createdRecipes.split(',').filter(str => str !== '');
          item.favouriteRecipes = item.favouriteRecipes.split(',').filter(str => str !== '');
        });
        const data = response.data;
        console.log(data);
        updateUsersSearched(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        loadingFalse();
      });
  };

  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={text => setSearchText(text)}
        placeholder="Cerca..."
      />
      <Button title="Cerca" onPress={searchRecipeByName} />
      <Button title="Cerca users" onPress={searchUsersByName} />
    </View>
  );
};

export default SearchBar;

