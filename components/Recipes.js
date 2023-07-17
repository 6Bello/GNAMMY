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
      user.favouriteRecipes.push(idRecipe);
      console.log(user.favouriteRecipes);
      updateUserFavouriteRecipes(user.favouriteRecipes);
      console.log("provs");
    }
    
    const removeFavouriteRecipe = (idRecipe) => {
      user.favouriteRecipes.splice(user.favouriteRecipes.indexOf(idRecipe), 1);
      updateUserFavouriteRecipes(user.favouriteRecipes);
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