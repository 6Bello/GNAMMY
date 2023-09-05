import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, StatusBar } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";

export default function Autocomplete({ myStyle, listStyle, defaultValue, onChangeText }) {
  const [inputText, setInputText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientStates, setIngredientStates] = useState({}); // Stato di focus per gli ingredienti


  const borderColor = isFocused ? 'blue' : 'gray'; // Colore del contorno durante lo stato di focus


  useEffect(() => {
    onChangeText(inputText);
    if (inputText.length == 0) {
      setFilteredSuggestions('');
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
    console.log(filteredSuggestions)
    const ingredients = inputText.split(','); // Prende tutti gli ingredienti inseriti
    ingredients.pop(); // Rimuove l'ultimo ingrediente inserito
    ingredients.push(suggestion + ','); // Aggiunge l'ingrediente selezionato
    const newIngredients = ingredients.join(', '); // Ricrea la stringa degli ingredienti
    console.log(newIngredients);
    setInputText(newIngredients); // Aggiorna il testo dell'input
  };

  const [squareAmountIsFocused, setSquareAmountIsFocused] = useState(false); // Stato di focus del pulsante per la quantità
  const [squareUnitIsFocused, setSquareUnitIsFocused] = useState(false); // Stato di focus del pulsante per l'unità di misura
  return (
    <View style={[myStyle, { display: 'flex', flexDirection: 'row', zIndex: 1000 }]}>
      <View style={{ display: 'flex', justifyContent: 'center' }}>
        <FlatList
          style={[styles.listContainerStyle, { borderColor: borderColor, borderWidth: isFocused && filteredSuggestions.length > 0 ? 1 : 0, display: isFocused ? 'flex' : 'none' }]}
          data={filteredSuggestions}
          inverted={true}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) =>
            <Pressable key={item} style={{ height: 25, width: 300, padding: 2, borderTopWidth: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                pressSuggestion(item.title);
                setIsFocused(true)
              }}>
              <Text>{item.title}</Text>
            </Pressable>}
          keyExtractor={(item) => item.title}
        />

        <TextInput
          style={[styles.button, { borderColor: borderColor, borderWidth: 1, height: 40, width: 150, padding: 10, borderTopWidth: 1, justifyContent: 'center', alignItems: 'center' }]}
          placeholder="Inizia a digitare..."
          value={inputText}
          onFocus={() => setIsFocused(true)}
          onChangeText={handleInputChange}
        />
      </View>
      <View style={{ width: '50%', height: 23, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <SquareAmount isFocused={squareAmountIsFocused} onFocus={setSquareAmountIsFocused} />
        <SquareUnit isFocused={squareUnitIsFocused} onFocus={setSquareUnitIsFocused} />
      </View>
      <Ionicons name="add-circle-outline" size={30} />
      <View style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginTop: 5 }}>
        {ingredients.map((ingredient, index) => {
          const squareAmountIsFocused = ingredientStates[`squareAmount${index}`] || false; // Stato di focus del pulsante per la quantità
          const squareUnitIsFocused = ingredientStates[`squareUnit${index}`] || false; // Stato di focus del pulsante per l'unità di misura

          const handleSquareAmountFocus = () => {
            setIngredientStates({
              ...ingredientStates,
              [`squareAmount${index}`]: !squareAmountIsFocused,
            });
          };

          const handleSquareUnitFocus = () => {
            setIngredientStates({
              ...ingredientStates,
              [`squareUnit${index}`]: !squareUnitIsFocused,
            });
          };

          return (
            <View style={{ width: '35%' }} key={ingredient}>
              <Text>{ingredient}</Text>
              <View style={{ width: '100%', height: 23, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <SquareAmount isFocused={squareAmountIsFocused} onFocus={handleSquareAmountFocus} />
                <SquareUnit isFocused={squareUnitIsFocused} onFocus={handleSquareUnitFocus} />
              </View>
            </View>
          );
        })}
      </View>
    </View>

  );
}

const SquareAmount = ({ isFocused, onFocus }) => {
  const handleFocus = () => {
    onFocus(!isFocused);
  };

  return (
    <Pressable style={[styles.squareAmount, { borderColor: isFocused ? 'blue' : 'grey' }]} onPress={handleFocus}
      onBlur={handleFocus} />
  );
}

const SquareUnit = ({ isFocused, onFocus }) => {
  const [value, setValue] = useState('');
  console.log(value);
  // const data = [
  //   { label: 'grams', value: 'gr' },
  //   { label: 'portions', value: 'ps' },
  // ];

  const staticData = [
    { id: 0, value: "gr" },
    { id: 1, value: "pz" },
  ];

  return (
    <View style={{ width: '20%', flex: 1}}>
      {/* <Dropdown
        style={[styles.dropdown, isFocused && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        containerStyle={{width: '100%', backgroundColor: 'blue'}}
        itemTextStyle={{ fontSize: 12}}
        selectedTextStyle={styles.selectedTextStyle}
        listStyle={{ padding: 0, margin: 0 }}
        data={data} 
        maxHeight={300} 
        labelField="label" 
        valueField="value" 
        placeholder='Unit'
        value={value} 
        onChange={item => { 
          setValue(item.value); 
        }}
      /> */}
      <RNSingleSelect width={50} height={40} menuBarContainerWidth={60} menuBarContainerBackgroundColor={'#f8f4fc'}
        buttonContainerStyle={{ borderRadius: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: '#f8f4fc', borderWidth: 1, borderColor: 'grey'}}
        placeholderTextStyle={{ fontSize: 12, color: 'black', padding: 0, margin: 0, width: 25, right: 10, textAlign: 'center'}}
        menuItemTextStyle={{ fontSize: 12, padding: 0, margin: 0 }}
        menuBarContainerHeight={100}
        menuBarContainerStyle={{ width: 50, height: 100, backgroundColor: '#f8f4fc', borderWidth: 1, borderColor: 'grey', zIndex: 9999 }}
        menuItem
        arrowImageStyle={styles.iconStyle}
        placeholder='Unit'
        menuBarTextStyle={{ fontSize: 12, padding: 0, margin: 0 }}
        searchEnabled={false}
        darkMode={true}
        data={staticData}
        onSelect={(selectedItem) =>
          console.log("SelectedItem: ", selectedItem)
        }
      />

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
  squareAmount: {
    width: '50%',
    height: '100%',
    borderWidth: 1,
  },
  dropdown: {
    height: 25,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
    padding: 0,
  },
  iconStyle: {
    width: 8,
    height: 8,
    right: 5,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
