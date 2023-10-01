import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import LikeButton from './LikeButton';
import { useNavigation } from '@react-navigation/native';

const Recipe = ({ idUser, isLoggedIn = false, item, index, updateRecipes, recipes, userFavouriteRecipes, addFavouriteRecipe, removeFavouriteRecipe, ITEM_HEIGHT, ITEM_WIDTH, scrollY, inputRange, height }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(item.isDescriptionVisible);
  const Vheight = height / (index < 10 || parseInt(index / 10));

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        marginBottom: 5,
        marginTop: 15,
        overflow: 'hidden',
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 10, // Rimuovi il bordo dal container principale
        borderColor: 'white', // Questa proprietà non è più necessaria
      }}
      onPress={() => navigation.navigate('recipePage', { item })}
    >
      {/* Immagine con trasformazione */}
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
                outputRange: [-Vheight * 0.1, 0, Vheight * 0.1],
              }),
            },
          ],
        }}
        source={item.category === 'Primo' ? require('../assets/img_categories/primo.jpeg') : item.category === 'Secondo' ? require('../assets/img_categories/secondo2.jpeg') : item.category === 'Dolce' ? require('../assets/img_categories/dolce.jpg') : require('../assets/img_categories/antipasto.jpeg')}
      />

      {/* Sovrapposizione nera per scurire l'immagine */}
      <View style={styles.overlay}></View>

      {/* Contenitore per il testo e i pulsanti */}
      <View style={styles.textContainer}>
        {/* Box come sfondo di item.category */}
        <View style={styles.categoryBackground} />
        {/* <View style={styles.UnderText}/> */}

        <Text style={{ color: 'white', textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>{item.category}</Text>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 25, fontWeight: 'bold', width: '80%' }}>{item.title}</Text>
        <Text style={{ color: 'white', textAlign: 'center', width: '80%' }}>{item.description!=undefined ? item.description.length > 200 ? item.description.slice(0, 200) + '...' : item.description : null}</Text>
        <Text style={{ color: 'white', textAlign: 'center' }}>{item.likes + userFavouriteRecipes.includes(item.id)}</Text>
        <Text style={{ color: 'white', textAlign: 'center' }}>{item.creator_username}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 100 }}>
          {isLoggedIn ? <LikeButton idUser={idUser} item={item} userFavouriteRecipes={userFavouriteRecipes} addFavouriteRecipe={addFavouriteRecipe} removeFavouriteRecipe={removeFavouriteRecipe} /> : null /* se l'utente è loggato mostra il bottone like */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Soprapposizione nera con opacità
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  categoryBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    blur: {
      position: "absolute",
      top: 0, left: 0, bottom: 0, right: 0
    },
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    width: '85%',
    height: '55%',
    zIndex: 0,
    blurRadius: 20,
    zIndex: 0,
  },
  UnderText: {
    backgroundColor: '#36190F',
    marginTop: 6,
    marginLeft: -12,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    width: '70%',
    height: '20%',
    zIndex: 0,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  textContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Recipe;

