import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';
import SearchBar from './components/searchBar';
import ListCategories from './components/ListCategories';


export default function Search() {

  return (
    <View>
      <ListCategories/>
      <SearchBar styles={{marginBottom: 10}}/>
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