import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { initItems } from './initItems';

import Recipe from './Recipe';
import { set } from 'react-native-reanimated';

const Recipes = ({ items, updateItems, user, userFavouriteRecipes, updateUserFavouriteRecipes}) => {
    const addFavouriteRecipe = (idRecipe) => {
        console.log("user.favouriteRecipes-before: ", user.favouriteRecipes);
        user.favouriteRecipes.push(idRecipe);
        const updatedRecipes = [...user.favouriteRecipes];
        console.log("user.favouriteRecipes: ", user.favouriteRecipes);
        console.log("updatedRecipes: ", updatedRecipes);
        updateUserFavouriteRecipes(updatedRecipes);
        console.log("userFavouriteRecipes: ", userFavouriteRecipes);
      };
      
      const removeFavouriteRecipe = (idRecipe) => {
      console.log("user.favouriteRecipes-before: ", user.favouriteRecipes);
      user.favouriteRecipes.splice(user.favouriteRecipes.indexOf(idRecipe), 1);
      const updatedRecipes =  user.favouriteRecipes;
      console.log("user.favouriteRecipes: ", user.favouriteRecipes);
      console.log("updatedRecipes: ", updatedRecipes);
      updateUserFavouriteRecipes(updatedRecipes);
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