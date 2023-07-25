import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { initRecipes } from './initRecipes';

import Recipe from './Recipe';

const Recipes = ({ recipes, updateRecipes, idUser, isLoggedIn = false, userFavouriteRecipes = [0], setUserFavouriteRecipes, refreshing, onRefresh }) => {

  // funzioni per aggiungere o rimuovere una ricetta dai preferiti
  const addFavouriteRecipe = (idRecipe) => {
    const updatedRecipes = [...userFavouriteRecipes, idRecipe]; //aggiunge l'id della ricetta ad un clone dell array
    console.log("updatedRecipes: ", updatedRecipes);
    setUserFavouriteRecipes(updatedRecipes); //aggiorna la variabile userFavouriteRecipes con il valore del clone
    console.log("userFavouriteRecipes: ", userFavouriteRecipes);
  };

  const removeFavouriteRecipe = (idRecipe) => {
    const updatedRecipes = [...userFavouriteRecipes]; // Clone the array
    const indexToRemove = updatedRecipes.indexOf(idRecipe); // Find the index of the recipe in the cloned array
    if (indexToRemove !== -1) {
      updatedRecipes.splice(indexToRemove, 1); // Remove the recipe from the cloned array
      console.log("updatedRecipes: ", updatedRecipes);
      setUserFavouriteRecipes(updatedRecipes); // Update the state variable userFavouriteRecipes with the cloned array
      console.log("userFavouriteRecipes: ", userFavouriteRecipes);
    }
  }
  

  initRecipes(recipes, updateRecipes);

  if (setUserFavouriteRecipes === undefined) {
    console.log("funzione non definita");
  }
  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {recipes.map((item, key) => (
        <Recipe
          key={key} // Add a unique "key" prop to the Recipe component
          idUser={idUser}
          isLoggedIn={isLoggedIn}
          item={item}
          index={key}
          updateRecipes={updateRecipes}
          recipes={recipes}
          userFavouriteRecipes={userFavouriteRecipes}
          addFavouriteRecipe={addFavouriteRecipe}
          removeFavouriteRecipe={removeFavouriteRecipe}
        />
      ))}

    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});


export default Recipes;