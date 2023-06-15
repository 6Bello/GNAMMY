import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';
import SearchBar from './components/searchBar';


export default function Search() {

  return (
    <View>
      <SearchBar styles={{marginBottom: 10}}/>
      <FlatList data={SearchBar.items} renderItem={SearchBar.renderItem} onScroll={SearchBar.handleScroll} removeClippedSubviews={true} />
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