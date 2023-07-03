import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ImageBackground, Text, ActivityIndicator } from 'react-native'; // Aggiunta dell'importazione mancante
import axios from 'axios';

const SearchBar = ({loadingTrue, loadingFalse, updateItems}) => {
  const [searchText, setSearchText] = useState('alla'); // Stato per memorizzare il testo di ricerca

  const searchByName = () => {
    loadingTrue();
    axios
      .get(`http://192.168.1.8:3000/getRecipesByName/${searchText}`) // Effettua una richiesta GET all'API specificata
      .then((response) => {
        const data = response.data; // Ottiene i dati di risposta dall'API
        console.log(data); // Stampa i dati di risposta nella console
        updateItems(data); // Imposta gli elementi ottenuti come valore dello stato 'items'
      })
      .catch(error => {
        console.error(error); // Stampa eventuali errori nella console
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
      <Button title="Cerca" onPress={searchByName} />
    </View>
  );
};

export default SearchBar;

