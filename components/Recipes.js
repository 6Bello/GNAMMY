import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { initItems } from './initItems';

import Recipe from './Recipe';
import { set } from 'react-native-reanimated';

const Recipes = ({ items, updateItems, user, userFavouriteRecipes = [0], updateUserFavouriteRecipes}) => {

    //funzioni per aggiungere o rimuovere una ricetta dai preferiti
    const addFavouriteRecipe = (idRecipe) => {        
        const updatedRecipes = [...userFavouriteRecipes, idRecipe]; //aggiunge l'id della ricetta ad un clone dell array
        console.log("updatedRecipes: ", updatedRecipes);
        updateUserFavouriteRecipes(updatedRecipes); //aggiorna la variabile userFavouriteRecipes con il valore del clone
        console.log("userFavouriteRecipes: ", userFavouriteRecipes);
      };
      
      const removeFavouriteRecipe = (idRecipe) => {      
        const updatedRecipes = [...userFavouriteRecipes]; //clona l'array
        updatedRecipes.splice(updatedRecipes.indexOf(idRecipe), 1); //rimuove l'id della ricetta dall'array clone 
      console.log("updatedRecipes: ", updatedRecipes);
      updateUserFavouriteRecipes(updatedRecipes); //aggiorna la variabile userFavouriteRecipes con il valore del clone
      console.log("userFavouriteRecipes: ", userFavouriteRecipes);
    }
    
    initItems(items, updateItems);  

    if(updateUserFavouriteRecipes === undefined){
      console.log("funzione non definita");
    }
    return (
      <ScrollView style={styles.container}>
        {items.map((item, index) => (
          <Recipe user={user} item={item} index={index} updateItems={updateItems} items={items} userFavouriteRecipes={userFavouriteRecipes} addFavouriteRecipe={addFavouriteRecipe} removeFavouriteRecipe={removeFavouriteRecipe}/>
        ))}
      </ScrollView>
    );
  };
  


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default Recipes;