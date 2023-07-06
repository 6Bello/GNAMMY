import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import Recipes from '../components/Recipes';
import axios from 'axios';


export default function Home() {
  const [items, setItems] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  useEffect(() => {
    axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
      .get('http://79.44.99.29:8889/getRecipes')
      .then(response => {
        const data = response.data;        // Quando la risposta viene ricevuta con successo, assegna i dati alla costante 'data'
        console.log(data);        // Stampa i dati sulla console
        setItems(data);        // Imposta gli elementi ottenuti come valore dello stato 'items'
      })
      .catch(error => {
        console.error(error);        // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console

      });
  }, []);

  const updateItems = (data) => {
    setItems(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
  };

  return (
    <View style={styleContainer.container}>
        <Recipes items={items} updateItems={updateItems} />
    </View>
  );
}

const styleContainer = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
