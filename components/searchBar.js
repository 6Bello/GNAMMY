import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ImageBackground, Text, ActivityIndicator } from 'react-native'; // Aggiunta dell'importazione mancante
import axios from 'axios';


const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('alla');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [paddingTop, setpaddingTop] = useState(20);
  const [isLoading, setIsLoading] = useState(false);


  const handleSearch = () => {
    setIsLoading(true);
    setIsSearchClicked(true);
  };


  const executeQuery = () => {
    axios
      .get(`http://192.168.56.1:3000/getRecipesByName/${searchText}`)
      .then(response => {
        const data = response.data;
        console.log(data);
        setItems(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  useEffect(() => {
    if (isSearchClicked) {
      executeQuery();
      setIsSearchClicked(false); // Ripristina lo stato del click dopo l'esecuzione della query
    }
  }, [isSearchClicked]);



  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setpaddingTop(contentOffset.y);
  };

  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={text => setSearchText(text)}
        placeholder="Cerca..."
      />
      <Button title="Cerca" onPress={handleSearch} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
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
    </View>
  );
};


export default SearchBar;
