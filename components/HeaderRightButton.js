import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderRightButton = () => {
  const navigation = useNavigation();

  const showSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <TouchableOpacity onPress={showSearch} style={styles.SearchAndImg}>
      <Image style={styles.SearchAndImg} source={require("../assets/search.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SearchAndImg: {
    width: 25,
    height: 25 
  }
})

export default HeaderRightButton;
