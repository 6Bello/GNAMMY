import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, Modal } from 'react-native';
import SearchBar from '../components/searchBar';
import ListCategories from '../components/ListCategories';
import Recipes from '../components/Recipes';
import UserRecipes from '../components/UserRecipes';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import icona1 from '../assets/profileIcons/icona1.png';
import icona2 from '../assets/profileIcons/icona2.png';
import icona3 from '../assets/profileIcons/icona3.png';
import icona4 from '../assets/profileIcons/icona4.png';
import icona5 from '../assets/profileIcons/icona5.png';
import icona6 from '../assets/profileIcons/icona6.png';
import icona7 from '../assets/profileIcons/icona7.png';
import icona8 from '../assets/profileIcons/icona8.png';
import icona9 from '../assets/profileIcons/icona9.png';
import icona10 from '../assets/profileIcons/icona10.png';
import icona11 from '../assets/profileIcons/icona11.png';
import icona12 from '../assets/profileIcons/icona12.png';


export default function Search({ isLoggedIn, idUser, userFavouriteRecipes, setUserFavouriteRecipes }) {

  const [recipes, setRecipes] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  const updateRecipes = (data) => {
    setRecipes(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
  };

  const [usersSearched, setUserSearched] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  const updateUsersSearched = (data) => {
    setUserSearched(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
  };

  const [isLoading, setIsLoading] = useState(false); // Stato per tracciare lo stato di caricamento
  const loadingTrue = () => {
    setIsLoading(true);
  }
  const loadingFalse = () => {
    setIsLoading(false);
  }

  const [profileView, setProfileViewer] = useState(false);

  const [profile, setProfile] = useState({});

  const [rand, setRand] = useState(1);
  useEffect(() => {
    setRand(Math.floor(Math.random() * 12) + 1);
  }, [profileView]);


  const imageMap = {
    1: icona1,
    2: icona2,
    3: icona3,
    4: icona4,
    5: icona5,
    6: icona6,
    7: icona7,
    8: icona8,
    9: icona9,
    10: icona10,
    11: icona11,
    12: icona12,
  };

  const imagePath = imageMap[rand];

  if (profileView == false) {
    return (
      <View style={{ alignItems: 'center', paddingBottom: 110 }}>
        <SearchBar loadingTrue={loadingTrue} loadingFalse={loadingFalse} updateRecipes={updateRecipes} updateUsersSearched={updateUsersSearched} />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          recipes.length === 0 && usersSearched.length === 0 ? (
            <Text style={{ textAlign: 'center' }}>Nessun risultato</Text>
          ) : (
            recipes.length > 0 ? (
              <Recipes
                recipes={recipes}
                updateRecipes={updateRecipes}
                isLoggedIn={isLoggedIn} idUser={idUser}
                userFavouriteRecipes={userFavouriteRecipes}
                setUserFavouriteRecipes={setUserFavouriteRecipes}
                endRefreshing={isLoading}
              />
            ) : (
              <ScrollView
                style={styles.ScrollViewSearch}
              >
                {usersSearched.map((user, key) => (
                  <TouchableOpacity
                    onPress={() => {
                      setProfileViewer(true);
                      setProfile(user);
                      console.log(user);
                    }}
                    key={key}
                    style={styles.previewProfile}
                  >
                    <Image style={styles.ImgProfile} source={imageMap[key * (Math.floor((Math.random() * 11)+1)/key)]} />
                    <View style={{ width: '100%', }}>
                      <Text style={{ marginLeft: 10 }}>{user.username}</Text>
                      <Text style={{ marginLeft: 10, color: '#5A5A5A' }}>ricette create: {user.createdRecipes.length}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

            )
          )
        )}
      </View>
    );
  } else {
    return (
      <View>
        <View style={{ height: '100%' }}>
          <View style={styles.ViewX}>
            <TouchableOpacity onPress={() => {
              setProfileViewer(false);
              setProfile({});
            }}>
              <Ionicons name="ios-close" color={"black"} size={30} style={{ marginRight: 10 }} />
            </TouchableOpacity>
          </View>
          <UserRecipes user={profile} idUser={idUser} isLoggedIn={userFavouriteRecipes != ''} userFavouriteRecipes={userFavouriteRecipes} setUserFavouriteRecipes={setUserFavouriteRecipes} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  previewProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 60,
    borderColor: '#9e9e9e'
  },
  imgUser: {
    width: 50,
    height: 50,
    marginTop: 5
  },
  ViewX: {
    width: '100%',
    height: 30, 
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  ScrollViewSearch: {
    width: '100%',
    height: '100%',
    marginTop: 10
  },
  ImgProfile: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
});