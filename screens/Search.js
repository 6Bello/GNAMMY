import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import SearchBar from '../components/searchBar';
import ListCategories from '../components/ListCategories';
import Recipes from '../components/Recipes';


export default function Search() {

  const [items, setItems] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  const updateItems = (data) => {
    setItems(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
  };
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
      <SearchBar styles={{ marginBottom: 10 }} loadingTrue={loadingTrue} loadingFalse={loadingFalse} updateItems={updateItems} />
      {showFilter ?
        <ListCategories handleShowFilter={handleShowFilter} loadingTrue={loadingTrue} loadingFalse={loadingFalse} updateItems={updateItems} />
        :
        <TouchableOpacity onPress={handleShowFilter} style={{ position: 'absolute', right: 5, top: 5 }}>
          <Image style={{ width: 20, height: 20 }} source={require("../assets/filter.png")} />
        </TouchableOpacity>
      }
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          items.length === 0 ? (
            <Text style={{ textAlign: 'center' }}>Nessun risultato</Text>
          ) : (
              <Recipes items={items} updateItems={updateItems} />
          )
        )}
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});