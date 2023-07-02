import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';
import Recipes from './components/Recipes';


export default function Home() {
  return (
    <View style={styleContainer.container}>
      <Recipes />
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
