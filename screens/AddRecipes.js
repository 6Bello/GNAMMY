import React, { useState, useEffect } from 'react';
import ListCategories from '../components/ListCategories';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import AlertSignUp from '../components/alertSignUp';


export default function AddRecipes({ user, isLoggedIn }) {
  const [imageRecipe, setImageRecipe] = useState(require('../assets/user.png'));
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const goToSignUp = () => {
    navigation.navigate('Account');
    setModalVisible(false);
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setModalVisible(true);
    });

    return unsubscribe;
  }, [navigation]);

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
    creator: '',
    creatorId: 0,
    title: '',
    categories: '',
    time: '',
    preparation: '',
    description: '',
    ingredients: '',
    gluten: 1,
  };
  const [recipe, setRecipe] = useState(recipeInitialState);

  const handleInputChange = (campo, value) => {
    if(campo === 'title'){
      if(value === 'carne'){
        setImageRecipe(require('../assets/img_categories/carne.png'));
      }else if(value === 'pasta'){
        setImageRecipe(require('../assets/img_categories/pasta.png'));
      }else if(value === 'pesce'){
        setImageRecipe(require('../assets/img_categories/pesce.png'));
      // }else if(value === 'verdura'){
      //   setImageRecipe(require('../assets/img_categories/verdura.png'));
      // }else if(value === 'frutta'){
      //   setImageRecipe(require('../assets/img_categories/frutta.png'));
      // }else if(value === 'dolce'){
      //   setImageRecipe(require('../assets/img_categories/dolce.png'));
      // }else if(value === 'antipasto'){
      //   setImageRecipe(require('../assets/img_categories/antipasto.png'));
      // }else if(value === 'contorno'){
      //   setImageRecipe(require('../assets/img_categories/contorno.png'));
      // }else if(value === 'insalata'){
      //   setImageRecipe(require('../assets/img_categories/insalata.png'));
      // }else if(value === 'zuppa'){
      //   setImageRecipe(require('../assets/img_categories/zuppa.png'));
      // }else if(value === 'pizza'){
      //   setImageRecipe(require('../assets/img_categories/pizza.png'));
      // }else if(value === 'fritto'){
      //   setImageRecipe(require('../assets/img_categories/fritto.png'));
      // }else if(value === 'salsa'){
      //   setImageRecipe(require('../assets/img_categories/salsa.png'));
      // }else if(value === 'sugo'){
      //   setImageRecipe(require('../assets/img_categories/sugo.png'));
      // }else if(value === 'soufflé'){
      //   setImageRecipe(require('../assets/img_categories/soufflé.png'));
      // }else if(value === 'sformato'){
      //   setImageRecipe(require('../assets/img_categories/sformato.png'));
      // }else if(value === 'torta'){
      //   setImageRecipe(require('../assets/img_categories/torta.png'));
      // }else if(value === 'biscotto'){
      //   setImageRecipe(require('../assets/img_categories/biscotto.png'));
      // }else if(value === 'budino'){
      //   setImageRecipe(require('../assets/img_categories/budino.png'));
      // }else if(value === 'gelato'){
      //   setImageRecipe(require('../assets/img_categories/gelato.png'));
      // }else if(value === 'bevanda'){
      //   setImageRecipe(require('../assets/img_categories/bevanda.png'));
      // }else if(value === 'cocktail'){
      //   setImageRecipe(require('../assets/img_categories/cocktail.png'));
      // }else if(value === 'aperitivo'){
      //   setImageRecipe(require('../assets/img_categories/aperitivo.png'));
      // }else if(value === 'digestivo'){
      //   setImageRecipe(require('../assets/img_categories/digestivo.png'));
      // }else if(value === 'primo'){
      //   setImageRecipe(require('../assets/img_categories/primo.png'));
      // }else if(value === 'secondo'){
      //   setImageRecipe(require('../assets/img_categories/secondo.png'));
      }else{
        setImageRecipe('../assets/user.png');
      }
    }
    const newRecipe = { ...recipe };
    console.log(newRecipe);
    newRecipe[campo] = value;
    console.log(newRecipe);
    setRecipe(newRecipe)
  };

  const createRecipe = () => {
    recipe.creator = user.username;
    recipe.creatorId = user.id;
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
    console.log(recipe);
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
      {isLoggedIn ? null : (<AlertSignUp goToSignUp={goToSignUp} modalVisible={modalVisible}/>)}
      <TouchableOpacity onPress={logCategories}>
        <Text>Get categories</Text>
      </TouchableOpacity>
      <View>
        <Image source={imageRecipe} style={{ width: 200, height: 200}} />
        <TextInput
        value={recipe.title}
        onChangeText={(value) => handleInputChange('title', value)}
        placeholder="Titolo"
      />
      </View>
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
          <Text style={{ marginRight: 10 }} >gluten free</Text>
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
