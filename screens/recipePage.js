import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import axios from "axios";
import { domain } from "../dns";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { set } from "react-native-reanimated";

export default function RecipePage() {
  const route = useRoute();
  const item = route.params.item;
  const [ingredients, setIngredients] = useState([{}]);
  const amount = item.amount.split(",");
  const unit = item.unit.split(",");

  //trasfoorma item.amount in un array
  useEffect(() => {
    //id deve essere un array degli id divisi da una virgola
    const idIngredients = item.ingredients
      .split(",")
      .map((numero) => Number(numero));
    console.log(idIngredients);
    axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
      .get(`${domain}/getIngredientsById`, {
        params: { ids: idIngredients },
      })
      .then((response) => {
        const data = response.data; // Quando la risposta viene ricevuta con successo, assegna i dati alla costante 'data'
        console.log(data);
        setIngredients(
          data.map((ingredient, index) => {
            return {
              title: ingredient.title,
              amount: amount[index],
              unit: unit[index],
            };
          })
        );
        console.log(ingredients);
      })
      .catch((error) => {
        console.error(error); // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console
      });
  }, [item]);

  console.log(ingredients);
  //aggiungi ad ogni ingrediente ilproprio amount e l unit
  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center", padding: 20 }}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={require("../assets/hamburger.png")}
        />
      </View>
      <View style={styles.backCard}>
        <View style={styles.orangeBlock}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
              textAlign: 'center'
            }}
          >
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={{ width: "33%", fontSize: 15, textAlign: "center" }}>
              {item.category}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            By {item.creator_username}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text>Contiene Glutine:</Text>
            {item.gluten === 0 ? (
              <AntDesign name="closecircleo" size={20} color="red" />
            ) : (
              <AntDesign name="checkcircleo" size={20} color="green" />
            )}
          </View>
          <View style={styles.centeredView}>
            <View>
              <Text style={styles.title}>Tempo di preparazione{'\n'}(d/h/m)</Text>
              <Text style={styles.subtitle}>{item.time}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-around",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <View>
              <Text style={styles.title}>Porzioni</Text>
              <Text style={styles.subtitle}>{item.portions}</Text>
            </View>
            <View>
              <Text style={styles.title}>Difficoltà</Text>
              <Text style={styles.subtitle}>{item.difficulty}/5</Text>
            </View>
          </View>
          <View style={styles.centeredView}>
            <Text style={styles.title}>Descrizione</Text>
            <Text style={styles.subtitle}>
              {item.description}
            </Text>
          </View>
          <View style={styles.centeredView}>
            <Text style={styles.title}>Ingredienti</Text>
            <View style={styles.ingredientTable}>
              {ingredients.map((ingredient, index) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{width: '75%', borderEndWidth: 1, borderBottomWidth: index!=ingredients.length-1 ? 1 : 0}}>
                    <Text style={styles.subtitle}>
                      {ingredient.title}
                    </Text>
                  </View>
                  <View style={{width: '25%', borderBottomWidth: index!=ingredients.length-1 ? 1 : 0}}>
                    <Text style={styles.subtitle}>
                      {ingredient.amount} {ingredient.unit}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.centeredView}>
            <Text style={styles.title}>Preparazione</Text>
            <Text style={styles.subtitle}>{item.preparation}</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFEFAF",
    width: "100%",
  },

  backCard: {
    backgroundColor: "#FFC90E",
    borderRadius: 20,
    width: "90%",
    marginHorizontal: "5%",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    paddingBottom: 20,
  },

  orangeBlock: {
    backgroundColor: "#FF7F27",
    borderRadius: 10,
    width: "85%",
    marginTop: 20,
    justifyContent: "center",
  },

  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "85%",
    marginTop: 20,
    alignItems: "center",
  },

  recipeTitle: {
    width: "66%",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },

  ingredientTable: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
  },

  centeredView: {
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: "center",
  },
});
