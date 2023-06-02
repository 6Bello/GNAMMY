import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';

export default function App() {
  const [items, setItems] = useState([]);
  const [paddingTop, setpaddingTop] = useState(20);

  useEffect(() => {
    axios
      .get('http://192.168.1.181:3000/getRecipes')
      .then(response => {
        const data = response.data;
        console.log(data);
        setItems(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    const timestamp = new Date().getTime(); // Genera un timestamp corrente
    const imageUrlWithTimestamp = `http://192.168.1.181:3000/images/${item.id}?timestamp=${timestamp}`;
    const paddingItem = ((items.length - index) * 250)-2000; // Imposta il padding inferiore in base all'indice dell'elemento
    return (
      <ImageBackground source={require('./3.jpeg')/*{uri: imageUrlWithTimestamp}*/}
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
          paddingBottom: paddingTop + paddingItem,
          top: 0,
          alignSelf: "flex-end",
        }}
        onScroll={handleScroll}
      >
        <Text style={{ color: 'black', textAlign: 'center' }}>{item.name}</Text>
        <Text style={{ color: 'grey', textAlign: 'center' }}>{item.description}</Text>
      </ImageBackground>
    );
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setpaddingTop(contentOffset.y);
  };

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} onScroll={handleScroll} removeClippedSubviews={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});