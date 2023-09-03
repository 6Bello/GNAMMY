import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import axios from 'axios';
import { set } from 'react-native-reanimated';

export default function Autocomplete({ myStyle, listStyle, defaultValue, onChangeText }) {
  const [inputText, setInputText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const borderColor = isFocused ? 'blue' : 'gray'; // Colore del contorno durante lo stato di focus


  useEffect(() => {
    onChangeText(inputText);
    if (inputText.length == 0) {
      setFilteredSuggestions(inputText);
      return;
    } if (inputText[inputText.length - 1] == ',' || inputText[inputText.length - 1] == ' ') {
      setIngredients(inputText.split(',').slice(0, -1));
      setFilteredSuggestions('');
      console.log(ingredients);
      return;
    }
    setIngredients(inputText.split(','));
    console.log(inputText.split(',').pop().trim());
    const lastIngredient = inputText.split(',').pop().trim(); // Prende l'ultimo ingrediente inserito
    // Filtra le parole suggerite in base a ciò che l'utente ha digitato
    axios.get(`http://gnammy.mywire.org/getIngredientsByName/${lastIngredient}`)
    .then((response) => {
      setFilteredSuggestions(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [inputText]);

  const handleInputChange = (text) => {
    setInputText(text);
  };
  
  const pressSuggestion = (suggestion) => {
    setFilteredSuggestions('');
    const ingredients = inputText.split(','); // Prende tutti gli ingredienti inseriti
    ingredients.pop(); // Rimuove l'ultimo ingrediente inserito
    ingredients.push(suggestion + ','); // Aggiunge l'ingrediente selezionato
    const newIngredients = ingredients.join(', '); // Ricrea la stringa degli ingredienti
    console.log(newIngredients);
    setInputText(newIngredients); // Aggiorna il testo dell'input
  };

  return (
    <View style={myStyle}>
      <View style={{display: 'flex', justifyContent: 'center'}}>
        <FlatList
          style={[styles.listContainerStyle, { borderColor: borderColor, borderWidth: isFocused && filteredSuggestions.length > 0 ? 1 : 0, display: isFocused ? 'flex' : 'none' }]}
          data={filteredSuggestions}
          inverted={true}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) =>
            <Pressable style={{ height: 25, width: 300,   padding: 2,borderTopWidth: 1,  justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {
                pressSuggestion(item.title);
                setIsFocused(true)
              }}>
              <Text>{item.title}</Text>
            </Pressable>}
          keyExtractor={(item) => item.title}
        />
        <TextInput
          style={[styles.button, { borderColor: borderColor, borderWidth: 1 }]}
          placeholder="Inizia a digitare..."
          value={inputText}
          onFocus={() => setIsFocused(true)}
          onChangeText={handleInputChange}
        />
      </View>
      <View style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginTop: 5}}>
        {ingredients.map((ingredient) => {
          return (
            <View style={{width: '33.33%'}}>
              <Text>{ingredient}</Text>
              <Pressable onPress={() => {
              }}>
                <Text style={{ color: 'red' }}>X</Text>
              </Pressable>
            </View>
          );
        }
        )}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f8',
    width: '100%',
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f8f4fc",
    display: 'flex',
    width: '100%',
    height: 45,
    zIndex: 2,
  },
  listContainerStyle: {
    alignContent: 'center',
    borderRadius: 5,
    position: 'absolute',
    width: '100%',
    backgroundColor: "#f8f4fc",
    zIndex: 1,
    bottom: 38,
    paddingTop: 3,
  },
});
