import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, Image, Modal } from 'react-native';
import SearchBar from '../components/searchBar';
import ListCategories from '../components/ListCategories';
import Recipes from '../components/Recipes';
import ProfilePage from './ProfilePage';

import { useNavigation } from '@react-navigation/native';

export default function Search({ user, userFavouriteRecipes, setUserFavouriteRecipes }) {
  const navigation = useNavigation();
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

  const [recipes, setRecipes] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  const updateRecipes = (data) => {
    setRecipes(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
  };

  const [usersSearched, setUserSearched] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  const updateUsersSearched = (data) => {
    setUserSearched(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
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

  const visitProfile = (userSearched) => {
    console.log(user);
    navigation.navigate('ProfilePage', {
      user: userSearched,
      userFavouriteRecipes: userFavouriteRecipes,
      setUserFavouriteRecipes: setUserFavouriteRecipes
    });
  };
  

  return (
    <View>
      <SearchBar styles={{ marginBottom: 10 }} loadingTrue={loadingTrue} loadingFalse={loadingFalse} updateRecipes={updateRecipes} updateUsersSearched={updateUsersSearched} />
      {showFilter ?
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <ListCategories initialCategories={categories} onCategories={handleCategories} handleShow={handleShowFilter} loadingTrue={loadingTrue} loadingFalse={loadingFalse} updateRecipes={updateRecipes} filter={true} />
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
          recipes.length === 0 && usersSearched.length === 0 ? (
            <Text style={{ textAlign: 'center' }}>Nessun risultato</Text>
          ) : (
            recipes.length > 0 ? (
              <Recipes recipes={recipes} updateRecipes={updateRecipes} user={user} userFavouriteRecipes={userFavouriteRecipes} setUserFavouriteRecipes={setUserFavouriteRecipes} />
            ) : (
              usersSearched.map((user) => {
                return (
                  <TouchableOpacity onPress={() => visitProfile(user)} key={user.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={require("../assets/user.png")} />
                    <Text style={{ marginLeft: 10 }}>{user.username}</Text>
                  </TouchableOpacity>
                )
              }
              )
            )
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