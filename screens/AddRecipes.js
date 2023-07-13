import React, { useState, useContext } from 'react';
import ListCategories from '../components/ListCategories';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';


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

  const recipeInitialState = {
    title: '',
    categories: '',
    time: '',
    preparation: '',
    description: '',
    ingredients: '',
    gluten: 1,
  };
  const [recipe, setRecipe] = useState({ recipeInitialState });

  const handleInputChange = (campo, value) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [campo]: value,
    }));
  };

  const createRecipe = () => {
    const categoriesString = categories.filter((category) => category.selected).map((category) => category.name).join(', ');
    recipe.categories = categoriesString;
    if (recipe.title === '') {
      alert('Inserisci il titolo');
      return;
    } else if (recipe.description === '') {
      alert('Inserisci la descrizione');
      return;
    } else if (recipe.categories === '') {
      alert('Inserisci le categorie');
      return;
    } else if (recipe.ingredients === '') {
      alert('Inserisci gli ingredienti');
      return;
    } else if (recipe.preparation === '') {
      alert('Inserisci la preparazione');
      return;
    } else if (recipe.time === '') {
      alert('Inserisci il tempo');
      return;
    } else if (recipe.gluten === '') {
      alert('Inserisci se è gluten free');
      return;
    }
    console.log(categories);
    axios
      .post('http://79.32.231.27:8889/recipes', recipe)

      .then((response) => {
        console.log(response.data);
        setCategories(recipeInitialState)
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
      <TextInput
        value={recipe.time}
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('time', value)}
        placeholder="Tempo"
      />
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "33%" }}
        onPress={() => handleInputChange('gluten', !recipe.gluten)}
      >
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 5 }}>
          <Text style={{marginRight: 10}} >gluten free</Text>
          {recipe.gluten ? (<AntDesign name="closecircleo" size={20} color="red" />) : (<AntDesign name="checkcircleo" size={20} color="green" />)}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={createRecipe}>
        <Text style={{ lineHeight: 29, color: "white", fontSize: 17, fontWeight: "bold" }}>Crea</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 8,
  },
});
