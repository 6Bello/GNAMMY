import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ImageBackground, Text, TouchableOpacity, StyleSheet, } from 'react-native'; // Aggiunta dell'importazione mancante
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
const SearchBar = ({ loadingTrue, loadingFalse, updateRecipes, updateUsersSearched }) => {
  const [searchText, setSearchText] = useState('prova'); // Stato per memorizzare il testo di ricerca
  const [buttonSelected, setButtonSelected] = useState('recipe')
  
  const searchRecipeByName = () => {    
    updateUsersSearched([]);
    loadingTrue();
    axios
      .get(`http://gnammy.mywire.org:9710/getRecipesByName/${searchText}`) // Effettua una richiesta GET all'API specificata
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
    .get(`http://gnammy.mywire.org:9710/getUsers/${searchText}`)
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
      loadingFalse();
  };

  useEffect(() => {
    if (buttonSelected === 'user') searchUsersByName();
    else searchRecipeByName();
  }, [searchText, buttonSelected]);

  const handleSearchButtonPress = (selected) => {
    if (buttonSelected !== selected) {
      setButtonSelected(selected);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSearchInput}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholder="Cerca..."
        />
        <Ionicons name="md-search" size={24} color="black" />
      </View>
      <View style={styles.searchButtons}>
        <TouchableOpacity
          title="Cerca"
          onPress={() => handleSearchButtonPress('recipe')}
          style={[
            styles.searchButton,
            {
              borderColor: buttonSelected === 'recipe' ? 'black' : '#f7f7f8',
            }
          ]}
        >
          <Text style={{ color: buttonSelected === 'recipe' ? 'black' : '#5A5A5A' }}>Ricette</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Cerca users"
          onPress={() => handleSearchButtonPress('user')}
          style={[
            styles.searchButton,
            {
              borderColor: buttonSelected === 'user' ? 'black' : '#f7f7f8',
              color: buttonSelected === 'user' ? 'black' : '#5A5A5A'
            }
          ]}
        >
          <Text style={{ color: buttonSelected === 'user' ? 'black' : '#5A5A5A' }}>Users</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  containerSearchInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  searchButtons: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    display: 'flex'
  },
  searchButton: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRadius: 1,
    backgroundColor: '#f7f7f8'
  }
})

export default SearchBar;

