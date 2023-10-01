import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Recipes from '../components/Recipes';
import axios from 'axios';
import { domain } from '../dns';

export default function Home({ idUser, user, isLoggedIn, userFavouriteRecipes, setUserFavouriteRecipes }) {
  // Stati per il caricamento delle ricette e il refresh
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Funzione per caricare le ricette
  const loadRecipes = (params = {}) => {
    setLoading(true);

    axios
      .get(`${domain}/getRecipes`, { params })
      .then((response) => {
        const data = response.data;
        const updatedData = data.map((item) => ({
          ...item,
          isLiked: userFavouriteRecipes.includes(item.id),
        }));

        if (params.page === 1) {
          setRecipes(updatedData);
        } else {
          setRecipes((prevRecipes) => [...prevRecipes, ...updatedData]);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  // Funzione per gestire il refresh delle ricette
  const handleRefresh = () => {
    setRefreshing(true);
    loadRecipes({ page: 1 }); // Eseguire una nuova ricerca quando viene eseguito il refresh
  };

  // Effettua la ricerca delle ricette quando il componente si monta
  useEffect(() => {
    if (isLoggedIn) {
      // Puoi eseguire azioni specifiche quando l'utente è loggato
    }

    // Carica le ricette iniziali
    loadRecipes({ page: 1 });
  }, []);

  return (
    <View style={styleContainer.container}>
      <Recipes
        style={{ marginBottom: 20 }}
        recipes={recipes}
        updateRecipes={loadRecipes} // Usa la funzione loadRecipes per aggiornare le ricette
        idUser={idUser}
        isLoggedIn={isLoggedIn}
        userFavouriteRecipes={userFavouriteRecipes}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      {loading ? (
        <ActivityIndicator
          style={{ marginBottom: 20, position: 'absolute', bottom: 10 }}
          animating={loading}
          size="large"
        />
      ) : null}
    </View>
  );
}

const styleContainer = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
});
