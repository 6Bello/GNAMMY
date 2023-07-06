import React, { useState } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, ActivityIndicator, ImageBackground, Modal } from "react-native";
import axios from "axios";

import { opacity } from "react-native-redash";
import { FlatList } from "react-native-gesture-handler";

const ListCategories = ({handleShowFilter, loadingTrue, loadingFalse, updateItems}) => {
  const [category, setCategory] = useState([
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

  const handlePress = (index) => {
    setCategory((prevCategory) => {
      const updatedCategory = [...prevCategory];
      updatedCategory[index] = {
        ...updatedCategory[index],
        selected: !updatedCategory[index].selected,
      };
      return updatedCategory;
    });
  };

  const searchByCategories = () => {
    handleShowFilter();
    const selectedCategoriesNames = category.filter((item) => item.selected).map((item) => item.name);
    loadingTrue();

    axios
      .get(`http://79.44.99.29:8889/getRecipesByCategories/${selectedCategoriesNames}`)
      .then((response) => {
        const data = response.data;
        updateItems(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        loadingFalse();
      });
  };


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FlatList
            style={{marginTop: -20}}
            data={category}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ display:"flex", flexDirection: 'row', alignItems: 'center', width: "33%"}}
                key={item.id}
                onPress={() => handlePress(index)}
              >
                <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-end"}}>
                  <Text style={{ color: item.selected ? 'red' : 'black', fontWeight: item.selected ? 'bold' : 'normal', padding: 5, lineHeight: 25}}>{item.name}</Text>
                  <Image source={item.selected ? require('../assets/check-2.png') : null} style={[styles.square, { width: 20, height: 20, marginTop: 8}]} />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
          />
          <TouchableOpacity style={{marginTop: 20}} onPress={searchByCategories}>
            <Text style={{fontSize: 20, textAlign: 'center', marginTop: 10, marginBottom: 10}}>Applica filtri</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
  );

};

const styles = StyleSheet.create({
  square: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 8,
  },
  selectedSquareImg: {
  },
  centeredView: {
    height: "100%",
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

});

export default ListCategories;