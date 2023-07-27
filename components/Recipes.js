import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, ScrollView, View, StyleSheet, RefreshControl, VirtualizedList, ActivityIndicator } from 'react-native';
import { initRecipes } from './initRecipes';

import Recipe from './Recipe';

const Recipes = ({ recipes, updateRecipes, idUser, isLoggedIn = false, userFavouriteRecipes = [0], setUserFavouriteRecipes, refreshing, onRefresh = () => { }, onEndRefresh = () => { } }) => {

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

  if (typeof setUserFavouriteRecipes !== 'function') {
    console.log("setUserFavouriteRecipes is not a function");
  }

  // Function to render each recipe item
  const renderRecipeItem = ({ item, index }) => {
    if (index === recipes.length - 1) {
      return <View style={{ height: 100, backgroundColor: 'white' }} ><ActivityIndicator  style={{marginBottom: 20, position: 'absolute', bottom: 10}} animating={true} size="large" /></View>;
    }
    return (
      <Recipe
        key={index} // It's recommended to use a unique identifier for the "key" prop. Here, using the index as a temporary solution.
        idUser={idUser}
        isLoggedIn={isLoggedIn}
        item={item}
        index={index}
        updateRecipes={updateRecipes}
        recipes={recipes}
        userFavouriteRecipes={userFavouriteRecipes}
        addFavouriteRecipe={addFavouriteRecipe}
        removeFavouriteRecipe={removeFavouriteRecipe}
      />
    )
  };
  const getItemCount = () => recipes != undefined ? recipes.length : 0;

  return (
    <VirtualizedList
      style={styles.container}
      data={recipes}
      renderItem={renderRecipeItem}
      keyExtractor={(item, index) => index.toString()}
      getItemCount={() => recipes.length}
      getItem={(data, index) => data[index]}
      onEndReached={onEndRefresh} // Call the function when reaching the end of the list
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            onRefresh(); // Call the onRefresh function to perform the actual refresh action
          }}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});


export default Recipes;