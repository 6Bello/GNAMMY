import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { initItems } from './initItems';

import Recipe from './Recipe';

const Recipes = ({ items, updateItems}) => {
    initItems(items, updateItems);  

    return (
      <ScrollView style={styles.container}>
        {items.map((item, index) => (
          <Recipe item={item} index={index} updateItems={updateItems} items={items}/>
        ))}
      </ScrollView>
    );
  };
  


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default Recipes;