import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

const HeaderRightButton = () => {
  const navigation = useNavigation();

  const showSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <TouchableOpacity onPress={showSearch} style={{ marginRight: 20}}>
      <View style={styles.UnderLens}>
        <Image style={{ width: 30, height: 30, alignContent: 'center' }} source={require("../assets/search.png")} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  UnderLens: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    width: 35,
    height: 35,
    zIndex: -1,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 }
  }
});

export default HeaderRightButton;