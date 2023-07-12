import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HeaderRightButton () {
    const navigation = useNavigation();
    
    const Press = () => {
      navigation.navigate('Search');
    };
    
    return (
      <TouchableOpacity onPress={Press} >
        <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../assets/search.png")} />
      </TouchableOpacity>
    );
};