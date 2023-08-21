import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Animated } from 'react-native';
import LikeButton from './LikeButton';
import ParallaxImage from '../parallaxeffect';

const Recipe = ({ scrollCount, idUser, isLoggedIn = false, item, index, updateRecipes, recipes, userFavouriteRecipes, addFavouriteRecipe, removeFavouriteRecipe, ITEM_HEIGHT, ITEM_WIDTH, scrollY, inputRange, height }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(item.isDescriptionVisible);

  const toggleDescriptionVisible = () => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index] = {
      ...item,
      isDescriptionVisible: !item.isDescriptionVisible,
    };
    updateRecipes(updatedRecipes);
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <TouchableOpacity
      style={{ marginBottom: 5, marginTop: 15, overflow: 'hidden',height: ITEM_HEIGHT, width: ITEM_WIDTH, backgroundColor: 'black', position: 'relative', justifyContent: 'center', alignItems: 'center' }}
      onPress={toggleDescriptionVisible}
    >
      {/* <ImageBackground
          source={item.category === 'Primo' ? require('../assets/img_categories/primo.jpg') : item.category === 'Secondo' ? require('../assets/img_categories/secondo.jpg') : item.category === 'Dolce' ? null : require('../assets/img_categories/antipasto.jpg')}
          style={{
            ...(item.isDescriptionVisible ? styles.readingDescription : styles.imageBackground),
            paddingBottom: 1,
          }}
          imageStyle={{      
          }}
        > */}
      <Animated.Image 
        style={{
          height: ITEM_HEIGHT * 2,
          width: ITEM_WIDTH,
          resizeMode: 'cover',
          position: 'absolute',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange,
                outputRange: [-height * 0.2, 0, height * 0.2],
              })
            }
          ]
          }}
          source={item.category === 'Primo' ? require('../assets/img_categories/primo.jpg') : item.category === 'Secondo' ? require('../assets/img_categories/primo.jpg') : item.category === 'Dolce' ? null : require('../assets/img_categories/antipasto.jpg')}
        />
      <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute' }}></View>
      <View>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 50 }}>{item.category}</Text>
        <Text style={{ color: 'white', textAlign: 'center' }}>{item.description}</Text>
        <Text style={{ color: 'white', textAlign: 'center' }}>{item.likes + userFavouriteRecipes.includes(item.id)}</Text>
        <Text style={{ color: 'white', textAlign: 'center' }}>{item.creator_username}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 100 }}>
          {isLoggedIn ? <LikeButton idUser={idUser} item={item} userFavouriteRecipes={userFavouriteRecipes} addFavouriteRecipe={addFavouriteRecipe} removeFavouriteRecipe={removeFavouriteRecipe} /> : null /* se l'utente è loggato mostra il bottone like */}
        </View>
      </View>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 200, // Imposta un'altezza fissa per l'immagine di sfondo
    width: '100%',
    backgroundColor: 'black',
    position: 'relative',
  },
  readingDescription: {
    // Stili quando la descrizione è visibile
    height: 300,
    width: '100%',
    backgroundColor: 'black',
    position: 'relative',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  }
}); // Aggiungi questa parentesi graffa di chiusura

export default Recipe;
