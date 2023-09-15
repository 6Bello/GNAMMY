import React, { useEffect, useState } from 'react';
import ListCategories from '../../components/ListCategories';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import MyTextInput from '../../components/TextInput';
import Autocomplete from '../../components/Autocomplete';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';


const CompileRecipe = ({ recipeInitialState, recipe, setRecipe, showCategories, handleShowCategories, starsSelected, setStarsSelected, createRecipe }) => {
  const [imageRecipe, setImageRecipe] = useState(require('../../assets/user.png'));
  const osName = Platform.OS;
  const [show, setShow] = useState(osName === 'ios' ? true : false);

  const handleInputChange = (campo, value) => {
    const newRecipe = { ...recipe };
    newRecipe[campo] = value;
    console.log(newRecipe);
    setRecipe(newRecipe)
  };

  const showTimePicker = () => {
    setShow(true);
  };

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    setHours(parseInt(recipe.time.split(':')[1], 10));
    setMinutes(parseInt(recipe.time.split(':')[2], 10));
  }, [recipe.time]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', paddingLeft: '25%' }}>
          <View style={{ alignItems: 'center', }}>
            <Text style={styles.title}>Descrivi la tua ricetta...</Text>
          </View>
          <View style={{ width: '25%', justifyContent: 'flex-end', alignItems: 'center' }} >
            <TouchableOpacity onPress={() => setRecipe(recipeInitialState)}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <MyTextInput myStyle={{ width: 150, height: 40, marginTop: 20 }}
            value={recipe.title}
            onChangeText={(value) => handleInputChange('title', value)}
            placeholder="Nome della ricetta"
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: 190, height: 50, alignItems: 'center' }}>
          <Text>Per quante persone?</Text>
          <MyTextInput
            myStyle={{ width: 30, height: 27, borderWidth: 1, borderRadius: 10, textAlign: 'center', padding: 0 }}
            value={recipe.portions}
            onChangeText={(value) => handleInputChange('portions', value)}
          />
        </View>
        <MyTextInput
          myStyle={{ width: 300, marginTop: 20 }}
          value={recipe.description}
          onChangeText={(value) => handleInputChange('description', value)}
          placeholder="Descrizione"
        />
        <Autocomplete
          myStyle={{ width: 300, marginTop: 20 }}
          defaultValue='ciao'
          onChangeText={(value) => handleInputChange('ingredients', value)}
        />
        <MyTextInput
          myStyle={{ width: 300, marginTop: 20 }}
          value={recipe.preparation}
          onChangeText={(value) => handleInputChange('preparation', value)}
          placeholder="Preparazione"
        />
          {(osName!=='ios') ? (<Pressable onPress={showTimePicker}>
            <Text style={{ lineHeight: 29, color: "black", fontSize: 17, fontWeight: "bold" }}>Tempo {recipe.time.split(':').join(':')}</Text>
          </Pressable>) :
            (<Text>time: {recipe.time}</Text>)
          }
          {(show || osName==='ios') && (
              <RNDateTimePicker
                style={{ width: 200 }}
                value={new Date(0, 0, 0, hours, minutes, 0, 0)}
                mode="time"
                is24Hour={true}
                display= {osName === 'ios' ? 'default' : 'spinner'}
                onChange={(event, selectedDate) => {
                  const day = recipe.time.split(':')[0];
                  const hours = selectedDate.getHours();
                  const minutes = selectedDate.getMinutes();
                  setShow(false);
                  handleInputChange('time', day + ':' + hours + ':' + minutes)
                  console.log(recipe.time)
                  console.log(day + ':' + hours + ':' + minutes)
                  console.log(new Date(0, 0, 0, parseInt(recipe.time.split(':')[1], 10), parseInt(recipe.time.split(':')[2], 10), 0, 0))
                }}
              />
            )}
          <Pressable onPress={() => {
            const date = recipe.time.split(':');
            const day = parseInt(date[0]) + 1;
            const hours = parseInt(date[1]);
            const minutes = parseInt(date[2]);
            handleInputChange('time', day + ':' + hours + ':' + minutes)
          }
          }>
            <Text>aggiungi un giorno</Text>
          </Pressable>
        <Pressable
          style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "33%" }}
          onPress={() => handleInputChange('gluten', !recipe.gluten)}
        >
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 5 }}>
            <Text style={{ marginRight: 10 }} >gluten free</Text>
            {recipe.gluten ? (<AntDesign name="closecircleo" size={20} color="red" />) : (<AntDesign name="checkcircleo" size={20} color="green" />)}
          </View>
        </Pressable>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Pressable onPress={() => starsSelected !== 1 && setStarsSelected(1)}>
            <MaterialCommunityIcons name={starsSelected >= 1 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => starsSelected !== 2 && setStarsSelected(2)}>
            <MaterialCommunityIcons name={starsSelected >= 2 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => starsSelected !== 3 && setStarsSelected(3)}>
            <MaterialCommunityIcons name={starsSelected >= 3 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => starsSelected !== 4 && setStarsSelected(4)}>
            <MaterialCommunityIcons name={starsSelected >= 4 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => starsSelected !== 5 && setStarsSelected(5)}>
            <MaterialCommunityIcons name={starsSelected >= 5 ? "star" : "star-outline"} size={24} color="black" />
          </Pressable>
        </View>

        <Pressable onPress={createRecipe}>
          <Text style={{ lineHeight: 29, color: "black", fontSize: 17, fontWeight: "bold" }}>Crea</Text>
        </Pressable>
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