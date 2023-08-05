import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, ScrollView, View, StyleSheet, RefreshControl, VirtualizedList, ActivityIndicator } from 'react-native';
import { initRecipes } from './initRecipes';

import Recipe from './Recipe';
import { set } from 'react-native-reanimated';

const Recipes = ({ recipes, updateRecipes, idUser, isLoggedIn = false, userFavouriteRecipes = [0], setUserFavouriteRecipes, refreshing = false, endRefreshing, onRefresh = () => { }, onEndRefresh }) => {

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
      return (
        <View>
          <Recipe
            key={index} // It's recommended to use a unique identifier for the "key" prop. Here, using the index as a temporary solution.
            scrollCount={scrollCount}
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
          <View style={{height: 40}} ><ActivityIndicator style={{ marginBottom: 20, margin:  'auto' }} animating={endRefreshing} size="large" /></View>
        </View>
      )
    }
    return (
      <Recipe
        key={index} // It's recommended to use a unique identifier for the "key" prop. Here, using the index as a temporary solution.
        scrollCount={scrollCount}
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

  const [scrollCount, setScrollCount] = useState(0); // Initialize the state variable "scrollCount" with the value 0
  const handleScroll = () => {
    setScrollCount(scrollCount + 1); // Increment the state variable "scrollCount" by 1
    console.log("scrollCount: ", scrollCount);
  }
  return (
    <VirtualizedList
      onScroll={handleScroll}
      maxToRenderPerBatch={1}
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