import React, { useState } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, ActivityIndicator, ImageBackground, Modal } from "react-native";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

const ListCategories = ({ initialCategories, loadingTrue, loadingFalse, updateRecipes, filter = 0, onCategories, handleShow }) => {
  const [categories, setCategories] = useState(initialCategories || []);

  const handlePress = (key) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      updatedCategories[key] = {
        ...updatedCategories[key],
        selected: !updatedCategories[key].selected,
      };
      return updatedCategories;
    });
  };

  const searchByCategories = () => {
    handleShow();
    const selectedCategoriesNames = categories.filter((item) => item.selected).map((item) => item.name);
    loadingTrue();

    axios
      .get(`http://79.32.231.27:8889/getRecipesByCategories/${selectedCategoriesNames}`)
      .then((response) => {
        const data = response.data;
        updateRecipes(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        loadingFalse();
      });
  };

  if (onCategories) {
    onCategories(categories); // Passa le categorie aggiornate al componente padre
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <FlatList
          style={{ marginTop: -20 }}
          data={categories}
          renderItem={({ item, key }) => (
            <TouchableOpacity
              style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "33%" }}
              key={item.id}
              onPress={() => handlePress(key)}
            >
              <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-end" }}>
                <Text
                  style={{
                    color: item.selected ? "red" : "black",
                    fontWeight: item.selected ? "bold" : "normal",
                    padding: 5,
                    lineHeight: 25,
                  }}
                >
                  {item.name}
                </Text>
                <Image
                  source={item.selected ? require("../assets/check-2.png") : null}
                  style={[styles.square, { width: 20, height: 20, marginTop: 8 }]}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
        />
        {filter ? (
          <TouchableOpacity style={{ marginTop: 20 }} onPress={searchByCategories}>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 10, marginBottom: 10 }}>Applica filtri</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleShow}>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 10, marginBottom: 10 }}>X</Text>
          </TouchableOpacity>
        )}
      </View>
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