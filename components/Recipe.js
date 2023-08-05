import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import LikeButton from './LikeButton';
import ParallaxImage from '../parallaxeffect';

const Recipe = ({ scrollCount, idUser, isLoggedIn = false, item, index, updateRecipes, recipes, userFavouriteRecipes, addFavouriteRecipe, removeFavouriteRecipe }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(item.isDescriptionVisible);
  const [topImage, setTopImage] = useState(-100);

  const heightComponent = useRef(null);
  useEffect(() => {
    // Verifica che il riferimento sia stato impostato
    if (heightComponent.current) {
      // Misura il componente
      heightComponent.current.measure((x, y, width, height, pageX, pageY) => {
        // Qui puoi ottenere i valori di altezza (height) e la posizione Y (pageY) del componente
        if(pageY>800 || pageY < 0) return;
        console.log('PageY: ', pageY);
        setTopImage((-pageY/5)-100);
      });
    }
  }, [scrollCount]);

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
    <TouchableOpacity ref={heightComponent}
      style={{ marginBottom: 5, marginTop: 15, overflow: 'hidden' }}
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
      <Image style={{ height: '200%', width: '100%', position: 'absolute', top: topImage }} source={item.category === 'Primo' ? require('../assets/img_categories/primo.jpg') : item.category === 'Secondo' ? require('../assets/img_categories/secondo.jpg') : item.category === 'Dolce' ? null : require('../assets/img_categories/antipasto.jpg')} />
      <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute' }}></View>
      <View>
        <Text style={{ color: 'white', textAlign: 'center' }}>{topImage}</Text>
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
