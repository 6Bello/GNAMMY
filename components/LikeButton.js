import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const LikeButton = ({ idUser, item, key, userFavouriteRecipes, addFavouriteRecipe, removeFavouriteRecipe }) => {
    const idRecipe = item.id;
    const [isLiked, setIsLiked] = useState(userFavouriteRecipes.includes(idRecipe)); // Stato per memorizzare se l'utente ha aggiunto la ricetta ai preferiti

    const [colorHeart, setColorHeart] = useState(isLiked ? 'red' : 'grey'); // Stato per memorizzare il colore del cuore
    //effetti per aaggiornare il colore del cuore
    useEffect(() => {
        setIsLiked(userFavouriteRecipes.includes(idRecipe));
        setColorHeart(isLiked ? 'red' : 'grey');
    }, [userFavouriteRecipes]);
    useEffect(() => {
        setColorHeart(isLiked ? 'red' : 'grey');
    }, [isLiked]);

    // Funzione per aggiungere o rimuovere la ricetta dai preferiti
    const handleLike = () => {
      console.log("userFavouriteRecipesPrima: ", userFavouriteRecipes);
      console.log("idRecipe: ", idRecipe);
          if (userFavouriteRecipes.includes(idRecipe)) {
            setIsLiked(false);
            console.log("itemId: ", idRecipe)
            axios.post(`http://79.32.231.27:8889/removeFavouriteRecipe/${idUser}`, {idRecipe}) // Effettua una richiesta POST all'endpoint specificato utilizzando Axios
            .then(res => {
              console.log('rimosso!');
              removeFavouriteRecipe(idRecipe, key);
            })
            .catch(error => {
              console.log(error);
            });
          } else {
            setIsLiked(true);
            console.log("itemId: ", idRecipe)
            axios.post(`http://79.32.231.27:8889/addFavouriteRecipe/${idUser}`, {idRecipe}) // Effettua una richiesta POST all'endpoint specificato utilizzando Axios
            .then(res => {
              console.log('aggiunto!');
              addFavouriteRecipe(idRecipe, key);
            })
            .catch(error => {
              console.log(error);
            });
          }
      };

    return (
        <View>
            <TouchableOpacity style={styles.circle} onPress={handleLike}>
                <Ionicons name="ios-heart" size={40} color={colorHeart} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default LikeButton;
