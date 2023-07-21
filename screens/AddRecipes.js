import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AddRecipes from './compileRecipe';
import NewRecipeCategory from './selectCategory';

export default function AddRecipes3 ({isLoggedIn, user}) {
    const [chosen, SetChosen] = useState(false);
    
    if (chosen == false) {
        return (
            <NewRecipeCategory SetChosen={SetChosen} isLoggedIn={isLoggedIn}/>
        );
    } else {
        return (
            <AddRecipes SetChosen={SetChosen} user={user} isLoggedIn={isLoggedIn}/>
        );
    }
}