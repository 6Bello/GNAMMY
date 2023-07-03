import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import SearchBar from './components/searchBar';
import ListCategories from './components/ListCategories';


export default function Search() {
  const [paddingTop, setpaddingTop] = useState(20); // Stato per memorizzare la posizione dello scroll
  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setpaddingTop(contentOffset.y); // Aggiorna lo stato paddingTop con la posizione dello scroll
  };

  const [items, setItems] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  const updateItems = (data) => {
    setItems(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
  };
  const [isSearchClicked, setIsSearchClicked] = useState(false); // Stato per tracciare se il pulsante di ricerca è stato cliccato
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Stato per tracciare lo stato di caricamento

  const loadingTrue = () => {
    setIsLoading(true);
  }
  const loadingFalse = () => {
    setIsLoading(false);
  }

  handleShowFilter = () => {
    setShowFilter(!showFilter);
  }

  return (
    <View>
      <SearchBar styles={{marginBottom: 10}} loadingTrue={loadingTrue} loadingFalse={loadingFalse} updateItems={updateItems}/>
      {showFilter ? 
          <ListCategories handleShowFilter={handleShowFilter} loadingTrue={loadingTrue} loadingFalse={loadingFalse} updateItems={updateItems} /> 
          : 
          <TouchableOpacity onPress={handleShowFilter} style={{position: 'absolute', right: 5, top:5 }}>
            <Image style={{width: 20, height:20}} source={require("./assets/filter.png")}/>
          </TouchableOpacity>
      }
      <View style={styles.centeredView}>
            <ScrollView>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" /> // Mostra l'indicatore di caricamento se isLoading è true
              ) : (
                items.map((recipe, index) => (
                  <View key={recipe.id}>
                    <ImageBackground
                      source={require('./R.jpg')}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});