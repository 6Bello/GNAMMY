import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AddRecipes2 from './AddRecipes copy';
import NewRecipeCategory from './NewRecipeCategory';

export default function AddRecipes3 ({isLoggedIn}) {
    const [chosen, SetChosen] = useState(false);
    
    if (chosen == false) {
        return (
            <NewRecipeCategory SetChosen={SetChosen} isLoggedIn={isLoggedIn}/>
        );
    } else {
        return (
            <AddRecipes2 SetChosen={SetChosen}/>
        );
    }
}