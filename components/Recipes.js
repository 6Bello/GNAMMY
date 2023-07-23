import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { initRecipes } from './initRecipes';

import Recipe from './Recipe';

const Recipes = ({ recipes, updateRecipes, user, userLoggedIn = false, userFavouriteRecipes = [0], updateUserFavouriteRecipes, refreshing, onRefresh }) => {

  // funzioni per aggiungere o rimuovere una ricetta dai preferiti
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

  initRecipes(recipes, updateRecipes);

  if (updateUserFavouriteRecipes === undefined) {
    console.log("funzione non definita");
  }
  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {recipes.map((item, index) => (
        <Recipe user={user} userLoggedIn={userLoggedIn} item={item} index={index} updateRecipes={updateRecipes} recipes={recipes} userFavouriteRecipes={userFavouriteRecipes} addFavouriteRecipe={addFavouriteRecipe} removeFavouriteRecipe={removeFavouriteRecipe} />
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