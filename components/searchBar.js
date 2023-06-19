import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ImageBackground, Text, ActivityIndicator } from 'react-native'; // Aggiunta dell'importazione mancante
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const SearchBar = () => {
  const [items, setItems] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  const [searchText, setSearchText] = useState('alla'); // Stato per memorizzare il testo di ricerca
  const [isSearchClicked, setIsSearchClicked] = useState(false); // Stato per tracciare se il pulsante di ricerca è stato cliccato
  const [paddingTop, setpaddingTop] = useState(20); // Stato per memorizzare il padding superiore dell'immagine di sfondo
  const [isLoading, setIsLoading] = useState(false); // Stato per tracciare lo stato di caricamento

  const handleSearch = () => {
    setIsLoading(true); // Imposta isLoading su true per mostrare l'indicatore di caricamento
    setIsSearchClicked(true); // Imposta isSearchClicked su true per eseguire la ricerca quando l'effetto useEffect viene attivato
  };

  const executeQuery = () => {
    axios
      .get(`http://192.168.56.1:3000/getRecipesByName/${searchText}`) // Effettua una richiesta GET all'API specificata
      .then(response => {
        const data = response.data; // Ottiene i dati di risposta dall'API
        console.log(data); // Stampa i dati di risposta nella console
        setItems(data); // Imposta gli elementi ottenuti come valore dello stato 'items'
      })
      .catch(error => {
        console.error(error); // Stampa eventuali errori nella console
      })
      .finally(() => {
        setIsLoading(false); // Imposta isLoading su false per nascondere l'indicatore di caricamento
      });
  };

  useEffect(() => {
    if (isSearchClicked) {
      executeQuery(); // Esegue la query solo se isSearchClicked è true
      setIsSearchClicked(false); // Ripristina lo stato del click dopo l'esecuzione della query
    }
  }, [isSearchClicked]);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent; // Ottiene lo spostamento dello scroll dall'evento
    setpaddingTop(contentOffset.y); // Imposta il valore dello stato paddingTop con il valore di spostamento dello scroll
  };

  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={text => setSearchText(text)}
        placeholder="Cerca..."
      />
      <Button title="Cerca" onPress={handleSearch} />

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
                resizeMode: "cover",
                position: 'absolute',
                width: '100%',
                height: 200,
                paddingBottom: paddingTop + ((items.length - index) * 250) - 2000,
                top: 0,
                alignSelf: "flex-end",
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

export default SearchBar;

