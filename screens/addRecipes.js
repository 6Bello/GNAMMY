import React, { useState, useContext } from 'react';
import ListCategories from '../components/ListCategories';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';


export default function AddRecipes() {
  const [categories, setCategories] = useState([]);  
  const getCategories = (newCategories) => {
    setCategories(newCategories);
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
      .post('http://79.44.99.29:8889/recipes', recipe)

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
      <ListCategories onCategories={getCategories}/>
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
