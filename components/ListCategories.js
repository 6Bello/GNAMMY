import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, ActivityIndicator, ImageBackground } from "react-native";
import axios from "axios";

import handleScroll from '../animations/handleScroll';

const ListCategories = () => {
    const [items, setItems] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
    const [category, setCategory] = useState([
        { id: 0, name: "pasta", selected: false },
        { id: 1, name: "carne", selected: false },
        { id: 2, name: "pesce", selected: false },
        { id: 3, name: "verdura", selected: false },
        { id: 4, name: "frutta", selected: false },
        { id: 5, name: "dolce", selected: false },
        { id: 6, name: "antipasto", selected: false },
        { id: 7, name: "contorno", selected: false },
        { id: 8, name: "insalata", selected: false },
        { id: 9, name: "zuppa", selected: false },
        { id: 10, name: "pizza", selected: false },
        { id: 11, name: "fritto", selected: false },
        { id: 12, name: "salsa", selected: false },
        { id: 13, name: "sugo", selected: false },
        { id: 14, name: "soufflé", selected: false },
        { id: 15, name: "sformato", selected: false },
        { id: 16, name: "torta", selected: false },
        { id: 17, name: "biscotto", selected: false },
        { id: 18, name: "budino", selected: false },
        { id: 19, name: "gelato", selected: false },
        { id: 20, name: "bevanda", selected: false },
        { id: 21, name: "cocktail", selected: false },
        { id: 22, name: "aperitivo", selected: false },
        { id: 23, name: "digestivo", selected: false },
        { id: 24, name: "primo", selected: false },
        { id: 25, name: "secondo", selected: false }
    ]);
    const [isSearchClicked, setIsSearchClicked] = useState(false); // Stato per tracciare se il pulsante di ricerca è stato cliccato
    const [paddingTop, setpaddingTop] = useState(20); // Stato per memorizzare il padding superiore dell'immagine di sfondo
    const [isLoading, setIsLoading] = useState(false); // Stato per tracciare lo stato di caricamento

    const handleSearch = () => {
        setIsLoading(true); // Imposta isLoading su true per mostrare l'indicatore di caricamento
        setIsSearchClicked(true); // Imposta isSearchClicked su true per eseguire la ricerca quando l'effetto useEffect viene attivato
    };


    const handlePress = (index) => {
        setCategory((prevCategory) => {
            const updatedCategory = [...prevCategory];
            updatedCategory[index] = {
                ...updatedCategory[index],
                selected: !updatedCategory[index].selected,
            };
            return updatedCategory;
        });
    };

    const handleSearchByCategories = () => {
        const selectedCategoriesNames = category.filter((item) => item.selected).map((item) => item.name);
        setIsLoading(true);
        setIsSearchClicked(true);
        
        axios
          .get(`http://192.168.1.8:3000/getRecipesByCategories/${selectedCategoriesNames}`)
          .then((response) => {
            const data = response.data;
            setItems(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
    

    return (
        <View>
          <View>
            {category.map((item, index) => (
              <TouchableOpacity
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                key={item.id}
                onPress={() => handlePress(index)}
              >
                <Text style={{ color: item.selected ? 'red' : 'black' }}>{item.name}</Text>
                <View style={[styles.square, item.selected ? styles.selectedSquare : null]} />
              </TouchableOpacity>
            ))}
            <Button title="Cerca" onPress={handleSearchByCategories} />
          </View>
          <ScrollView>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" /> // Mostra l'indicatore di caricamento se isLoading è true
            ) : (
              items.map((recipe, index) => (
                <View key={recipe.id}>
                  <ImageBackground
                    source={require('../R.jpg')}
                    style={{
                      width: '100%',
                      height: 200,
                      backgroundColor: '#000',
                      position: 'relative',
                    }}
                    imageStyle={{
                      resizeMode: 'cover',
                      position: 'absolute',
                      width: '100%',
                      height: 200,
                      paddingBottom: paddingTop + ((items.length - index) * 250) - 2000,
                      top: 0,
                      alignSelf: 'flex-end',
                    }}
                    onScroll={handleScroll}
                  >
                    <Text style={{ color: 'black', textAlign: 'center' }}>{recipe.name}</Text>
                    <Text style={{ color: 'grey', textAlign: 'center' }}>{recipe.description}</Text>
                  </ImageBackground>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      );
      
};

const styles = StyleSheet.create({
    square: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    selectedSquare: {
        backgroundColor: 'black',
    },
});

export default ListCategories;