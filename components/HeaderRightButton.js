import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View,StyleSheet } from 'react-native';

const HeaderRightButton = () => {
  const navigation = useNavigation();

  const showSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <TouchableOpacity onPress={showSearch} style={{ width: 200, height: 20 }}>
      <View style={styles.UnderLens}></View>
      <Image style={{ width: 35, height: 35 }} source={require("../assets/search.png")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
UnderLens: {
  position: 'absolute',
  backgroundColor: 'white',
  marginTop : -2,
  marginLeft: -12,
  alignItems: 'center',
  borderRadius : 10,
  width: '30%',
  height: '200%',
  zIndex: -1,
  shadowColor: 'black',
  shadowOpacity: 0.8,
  shadowRadius: 5,
  elevation: 5,
  shadowOffset: { width: 0, height: 2 }
}
});

export default HeaderRightButton;