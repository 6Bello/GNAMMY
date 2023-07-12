import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderRightButton = () => {
  const navigation = useNavigation();

  const showSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <TouchableOpacity onPress={showSearch} style={{ width: 25, height: 25 }}>
      <Image style={{ width: 25, height: 25 }} source={require("../assets/search.png")} />
    </TouchableOpacity>
  );
};

export default HeaderRightButton;
