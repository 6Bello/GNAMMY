import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, Image, Modal } from 'react-native';
import SearchBar from '../components/searchBar';
import ListCategories from '../components/ListCategories';
import Recipes from '../components/Recipes';


export default function Search() {
  const [categories, setCategories] = useState([
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
  const handleCategories = (updatedCategories) => {
    setCategories(updatedCategories); // Aggiorna lo stato delle categorie nel componente padre
  };

  const [items, setItems] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  const updateItems = (data) => {
    setItems(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
  };
  const [showFilter, setShowFilter] = useState(false);
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  }
  const [isLoading, setIsLoading] = useState(false); // Stato per tracciare lo stato di caricamento

  const loadingTrue = () => {
    setIsLoading(true);
  }
  const loadingFalse = () => {
    setIsLoading(false);
  }

  return (
    <View>
      <SearchBar styles={{ marginBottom: 10 }} loadingTrue={loadingTrue} loadingFalse={loadingFalse} updateItems={updateItems} />
      {showFilter ?
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <ListCategories initialCategories={categories} onCategories={handleCategories} handleShow={handleShowFilter} loadingTrue={loadingTrue} loadingFalse={loadingFalse} updateItems={updateItems} filter={true} />
          </Modal>
        </View>
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