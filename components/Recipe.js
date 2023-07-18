import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { set } from 'react-native-reanimated';

const Recipe = ({ user, item, index, updateItems, items, userFavouriteRecipes, addFavouriteRecipe, removeFavouriteRecipe}) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(item.isDescriptionVisible);
    const [isLiked, setIsLiked] = useState(user.favouriteRecipes.includes(item.id));
    const [colorHeart, setColorHeart] = useState(isLiked ? 'red' : 'grey');
    useEffect(() => {
      setColorHeart(user.favouriteRecipes.includes(item.id) ? 'red' : 'grey');
      console.log(item.title, " isLiked: ", isLiked);
    }, [userFavouriteRecipes]);
  
    const toggleDescriptionVisible = () => {
      console.log("item: ", item);
      const updatedItems = [...items];
      updatedItems[index] = {
        ...item,
        isDescriptionVisible: !item.isDescriptionVisible,
      };
      updateItems(updatedItems);
      setIsDescriptionVisible(!isDescriptionVisible);
    };

    const handleLike = () => {
      const idRecipe = item.id;
        if (user.favouriteRecipes.includes(item.id)) {
          setColorHeart('grey');
          axios.post(`http://79.32.231.27:8889/removeFavouriteRecipe/${user.id}`, {idRecipe})
          .then(res => {
            console.log('rimosso!');
            removeFavouriteRecipe(idRecipe, index);
            console.log("userFavouriteRecipes: ", user.favouriteRecipes);
          })
          .catch(error => {
            console.log(error);
          });
        } else {
          setColorHeart('red');
          console.log("item: ", idRecipe)
          axios.post(`http://79.32.231.27:8889/addFavouriteRecipe/${user.id}`, {idRecipe})
          .then(res => {
            console.log('aggiunto!');
            addFavouriteRecipe(idRecipe, index);
            console.log("userFavouriteRecipes: ", user.favouriteRecipes);
          })
          .catch(error => {
            console.log(error);
          });
        }
    };
  
    return (
      <TouchableOpacity
        style={{ marginBottom: 5, marginTop: 15 }}
        onPress={toggleDescriptionVisible}
      >
        <ImageBackground
          source={{ uri: 'http://192.168.1.8:19000/assets/R.jpg' }}
          style={{
            ...(item.isDescriptionVisible ? styles.readingDescription : styles.imageBackground),
            paddingBottom: 1,
          }}
          imageStyle={{
            resizeMode: 'cover',
            alignSelf: 'flex-end',
          }}
        >
          <View>
            <Text style={{ color: 'black', textAlign: 'center' }}>{item.title}</Text>
            <Text style={{ color: 'grey', textAlign: 'center' }}>{item.description}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 100 }}>
              <TouchableOpacity style={styles.circle} onPress={handleLike}>
                <Ionicons name="ios-heart" size={40} color={colorHeart}/>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
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
  