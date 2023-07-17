import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const Recipe = ({ user, item, index, updateItems, items}) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(item.isDescriptionVisible);
    const [isLiked, setIsLiked] = useState(false);
    const [colorHeart, setColorHeart] = useState('grey');
  
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
      setIsLiked(prevIsLiked => {
        const updatedIsLiked = !prevIsLiked;
        if (!updatedIsLiked) {
          setColorHeart('grey');
          axios.post(`http://79.32.231.27:8889/removeFavouriteRecipe/${user.user.id}`, {idRecipe})
          .then(res => {
            console.log('rimosso!');
          })
          .catch(error => {
            console.log(error);
          });
        } else {
          setColorHeart('red');
          console.log("item: ", idRecipe)
          axios.post(`http://79.32.231.27:8889/addFavouriteRecipe/${user.user.id}`, {idRecipe})
          .then(res => {
            console.log('aggiunto!');
          })
          .catch(error => {
            console.log(error);
          });
        }
        return updatedIsLiked;
      });
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
  