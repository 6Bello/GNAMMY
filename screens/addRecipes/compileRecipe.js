import React, { useState } from 'react';
import ListCategories from '../../components/ListCategories';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import MyTextInput from '../../components/TextInput';


const CompileRecipe = ({ user, isLoggedIn, recipe, setRecipe, showCategories, handleShowCategories, starsSelected, setStarsSelected, createRecipe, got }) => {
  const [imageRecipe, setImageRecipe] = useState(require('../../assets/user.png'));

  const handleInputChange = (campo, value) => {
    if (campo === 'title') {
      if (value === 'carne') {
        setImageRecipe(require('../../assets/img_categories/carne.png'));
      } else if (value === 'pasta') {
        setImageRecipe(require('../../assets/img_categories/pasta.png'));
      } else if (value === 'pesce') {
        setImageRecipe(require('../../assets/img_categories/pesce.png'));
        // }else if(value === 'verdura'){
        //   setImageRecipe(require('../assets/img_categories/verdura.png'));
        // }else if(value === 'frutta'){
        //   setImageRecipe(require('../assets/img_categories/frutta.png'));
        // }else if(value === 'dolce'){
        //   setImageRecipe(require('../assets/img_categories/dolce.png'));
        // }else if(value === 'antipasto'){
        //   setImageRecipe(require('../assets/img_categories/antipasto.png'));
        // }else if(value === 'contorno'){
        //   setImageRecipe(require('../assets/img_categories/contorno.png'));
        // }else if(value === 'insalata'){
        //   setImageRecipe(require('../assets/img_categories/insalata.png'));
        // }else if(value === 'zuppa'){
        //   setImageRecipe(require('../assets/img_categories/zuppa.png'));
        // }else if(value === 'pizza'){
        //   setImageRecipe(require('../assets/img_categories/pizza.png'));
        // }else if(value === 'fritto'){
        //   setImageRecipe(require('../assets/img_categories/fritto.png'));
        // }else if(value === 'salsa'){
        //   setImageRecipe(require('../assets/img_categories/salsa.png'));
        // }else if(value === 'sugo'){
        //   setImageRecipe(require('../assets/img_categories/sugo.png'));
        // }else if(value === 'soufflé'){
        //   setImageRecipe(require('../assets/img_categories/soufflé.png'));
        // }else if(value === 'sformato'){
        //   setImageRecipe(require('../assets/img_categories/sformato.png'));
        // }else if(value === 'torta'){
        //   setImageRecipe(require('../assets/img_categories/torta.png'));
        // }else if(value === 'biscotto'){
        //   setImageRecipe(require('../assets/img_categories/biscotto.png'));
        // }else if(value === 'budino'){
        //   setImageRecipe(require('../assets/img_categories/budino.png'));
        // }else if(value === 'gelato'){
        //   setImageRecipe(require('../assets/img_categories/gelato.png'));
        // }else if(value === 'bevanda'){
        //   setImageRecipe(require('../assets/img_categories/bevanda.png'));
        // }else if(value === 'cocktail'){
        //   setImageRecipe(require('../assets/img_categories/cocktail.png'));
        // }else if(value === 'aperitivo'){
        //   setImageRecipe(require('../assets/img_categories/aperitivo.png'));
        // }else if(value === 'digestivo'){
        //   setImageRecipe(require('../assets/img_categories/digestivo.png'));
        // }else if(value === 'primo'){
        //   setImageRecipe(require('../assets/img_categories/primo.png'));
        // }else if(value === 'secondo'){
        //   setImageRecipe(require('../assets/img_categories/secondo.png'));
      } else {
        setImageRecipe('../../assets/user.png');
      }
    }
    const newRecipe = { ...recipe };
    console.log(newRecipe);
    newRecipe[campo] = value;
    console.log(newRecipe);
    setRecipe(newRecipe)
  };

  const data = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Grapes' },
    { id: 5, name: 'Orange' },
  ];
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>Descrivi la tua ricetta...</Text>
        </View>

        <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 300 },]}>
          <Image source={imageRecipe} style={{ width: 25, height: 25 }} />
          <MyTextInput myStyle={{ flex: 1 }}
            value={recipe.title}
            onChangeText={(value) => handleInputChange('title', value)}
            placeholder="Nome"
          />
        </View>

        {showCategories ?
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <ListCategories initialCategories={categories} onCategories={handleCategories} handleShow={handleShowCategories} />
            </Modal>
          </View>
          :
          <TouchableOpacity onPress={handleShowCategories} style={{ position: 'absolute', right: 5, top: 5 }}>
            <Text>seleziona le categorie</Text>
          </TouchableOpacity>
        }
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: 150, height: 50, alignItems: 'center' }}>
          <Text>Per</Text>
          <MyTextInput
            style={{ width: 50, height: 40, borderWidth: 1, borderRadius: 10, textAlign: 'center' }}
            value={recipe.portions}
            onChangeText={(value) => handleInputChange('portions', value)}
          />
          <Text>persone</Text>
        </View>
        <MyTextInput
          myStyle={{ width: 300, marginTop: 20 }}
          value={recipe.description}
          onChangeText={(value) => handleInputChange('description', value)}
          placeholder="Descrizione"
        />
        <View style={{width: 200, height:200}}>
          <Autocomplete
            containerStyle={styles.autocompleteContainerStyle}
            listContainerStyle={styles.listStyle}
            listStyle={styles.listStyle}
            defaultValue='ciao'
            data={data.length === 1 && comp(query, data[0].name) ? [] : data}
            onChangeText={text => this.setState({ query: text })}
            renderItem={item => (
              <TouchableOpacity onPress={() => this.setState({ query: item.name })}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <MyTextInput
          myStyle={{ width: 300, marginTop: 20 }}
          value={recipe.preparation}
          onChangeText={(value) => handleInputChange('preparation', value)}
          placeholder="Preparazione"
        />
        <MyTextInput
          myStyle={{ width: 300, marginTop: 20 }}
          value={recipe.time}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange('time', value)}
          placeholder="Tempo"
        />
        <TouchableOpacity
          style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "33%" }}
          onPress={() => handleInputChange('gluten', !recipe.gluten)}
        >
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 5 }}>
            <Text style={{ marginRight: 10 }} >gluten free</Text>
            {recipe.gluten ? (<AntDesign name="closecircleo" size={20} color="red" />) : (<AntDesign name="checkcircleo" size={20} color="green" />)}
          </View>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => starsSelected !== 1 && setStarsSelected(1)}>
            <MaterialCommunityIcons name={starsSelected >= 1 ? "star" : "star-outline"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => starsSelected !== 2 && setStarsSelected(2)}>
            <MaterialCommunityIcons name={starsSelected >= 2 ? "star" : "star-outline"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => starsSelected !== 3 && setStarsSelected(3)}>
            <MaterialCommunityIcons name={starsSelected >= 3 ? "star" : "star-outline"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => starsSelected !== 4 && setStarsSelected(4)}>
            <MaterialCommunityIcons name={starsSelected >= 4 ? "star" : "star-outline"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => starsSelected !== 5 && setStarsSelected(5)}>
            <MaterialCommunityIcons name={starsSelected >= 5 ? "star" : "star-outline"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={createRecipe}>
          <Text style={{ lineHeight: 29, color: "black", fontSize: 17, fontWeight: "bold" }}>Crea</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  square: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 8,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  containerStyle: {
    position: 'absolute',
    height: 100,
    flex: 1,
    flexDirection: 'row',
  },
  autocompleteContainerStyle: {
    height: 100,
    flex: 1,
    height: 100,
  },
});

export default CompileRecipe