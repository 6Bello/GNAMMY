import React, { useState, useContext } from 'react';
import ListCategories from '../components/ListCategories';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';


export default function AddRecipes() {
  const [categories, setCategories] = useState([
    { id: 0, name: "pasta", selected: false },
    { id: 1, name: "carne", selected: false },
    { id: 2, name: "pesce", selected: false },
    { id: 3, name: "verdura", selected: false },
    { id: 4, name: "frutta", selected: false },
    { id: 5, name: "dolce", selected: false },
    { id: 6, name: "antipasto", selected: false },
    { id: 7, name: "contorno", selected: false },
    { id: 8, name: "insalata", selected: false },
    { id: 9, name: "zuppa", selected: false },
    { id: 10, name: "pizza", selected: false },
    { id: 11, name: "fritto", selected: false },
    { id: 12, name: "salsa", selected: false },
    { id: 13, name: "sugo", selected: false },
    { id: 14, name: "soufflé", selected: false },
    { id: 15, name: "sformato", selected: false },
    { id: 16, name: "torta", selected: false },
    { id: 17, name: "biscotto", selected: false },
    { id: 18, name: "budino", selected: false },
    { id: 19, name: "gelato", selected: false },
    { id: 20, name: "bevanda", selected: false },
    { id: 21, name: "cocktail", selected: false },
    { id: 22, name: "aperitivo", selected: false },
    { id: 23, name: "digestivo", selected: false },
    { id: 24, name: "primo", selected: false },
    { id: 25, name: "secondo", selected: false }
  ]);
  const handleCategories = (updatedCategories) => {
    setCategories(updatedCategories); // Aggiorna lo stato delle categorie nel componente padre
  };

  const [showCategories, setShowCategories] = useState(false);
  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  }

  const logCategories = () => {
    console.log(categories);
  }

  const [recipe, setRecipe] = useState({
    title: '',
    categories: '',
    time: '',
    preparation: '',
    description: '',
    ingredients: '',
    gluten: 1,
  });

  const handleInputChange = (campo, value) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [campo]: value,
    }));
  };

  const createRecipe = () => {
    console.log(categories);
    axios
      .post('http://79.32.231.27:8889/recipes', recipe)

      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  return (
    <ScrollView>
    <TouchableOpacity onPress={logCategories}>
      <Text>Get categories</Text>
    </TouchableOpacity>
      <TextInput
        value={recipe.title}
        onChangeText={(value) => handleInputChange('title', value)}
        placeholder="Titolo"
      />
      {showCategories ?
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <ListCategories initialCategories={categories} onCategories={handleCategories} handleShow={handleShowCategories} />
          </Modal>
        </View>
        :
        <TouchableOpacity onPress={handleShowCategories} style={{ position: 'absolute', right: 5, top: 5 }}>
          <Text>seleziona le categorie</Text>
        </TouchableOpacity>
      }
      <TextInput
        value={recipe.description}
        onChangeText={(value) => handleInputChange('description', value)}
        placeholder="Descrizione"
      />
      <TextInput
        value={recipe.ingredients}
        onChangeText={(value) => handleInputChange('ingredients', value)}
        placeholder="Ingredienti"
      />
      <TextInput
        value={recipe.preparation}
        onChangeText={(value) => handleInputChange('preparation', value)}
        placeholder="Preparazione"
      />
      <TouchableOpacity onPress={createRecipe}>
        <Text style={{ lineHeight: 29, color: "white", fontSize: 17, fontWeight:"bold" }}>Crea</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styleContainer = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
