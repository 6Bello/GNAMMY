import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Button, IconButton, Text, View, StyleSheet, Animated } from 'react-native';

import Home from './screens/Home';
import Account from './screens/Account';
import AddRecipes from './screens/AddRecipes';
import AddRecipes2 from './screens/AddRecipes copy';
import NewRecipeCategory from './screens/NewRecipeCategory';
import Search from './screens/Search';
import HeaderRightButton from './components/HeaderRightButton';
import AddRecipes3 from './screens/AddRecipes3';

const Tab = createBottomTabNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const updateUserData = (data, userLogged) => {
    setUser(data);
    setIsLoggedIn(userLogged);
  };
  const isFirstRender = useRef(true); //variabile per verificare se è la prima volta che l'effetto viene eseguito
  useEffect(() => {
    // Verifica se è la prima volta che l'effetto viene eseguito
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setUserFavouriteRecipes(user.favouriteRecipes); //aggiorna lo stato userFavouriteRecipes con i preferiti dell'utente
  }, [user]);

  const [userFavouriteRecipes, setUserFavouriteRecipes] = useState(''); // Stato per memorizzare gli elementi ricevuti dalla ricerca
  // setUserFavouriteRecipes(isLoggedIn ? user.favouriteRecipes : 0)
  const updateUserFavouriteRecipes = (updatedUserFavouriteRecipes) => {
    setUserFavouriteRecipes(updatedUserFavouriteRecipes);
  }



  const rotationValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.timing(rotationValue, {
      toValue: 360,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      rotationValue.setValue(0); // Resetta il valore di rotazione alla fine dell'animazione
    });
  };

  const rotateInterpolation = rotationValue.interpolate({
    inputRange: [0, 290],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Search"
          options={{
            tabBarItemStyle: { display: 'none' },
          }}
        >
          {() => <Search user={user} userFavouriteRecipes={userFavouriteRecipes} updateUserFavouriteRecipes={updateUserFavouriteRecipes} />}
        </Tab.Screen>
        <Tab.Screen
          name="Home"
          options={{
            headerTitle: "",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
            headerRight: () => (
              <HeaderRightButton />
            )
          }}
        >
          {() => <Home user={user} userFavouriteRecipes={userFavouriteRecipes} updateUserFavouriteRecipes={updateUserFavouriteRecipes} />}
        </Tab.Screen>
        <Tab.Screen name="AddRecipes"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity style={{ width: 65, height: 65, justifyContent: 'center', alignItems: 'center', marginBottom: 25 }} onPress={handlePress}>
                <View style={[{ alignItems: 'center' }, styles.shadow]}>
                  <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
                    <View
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 50,
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialCommunityIcons name="plus" color="white" size={40} />
                    </View>
                  </Animated.View>
                </View>
              </TouchableOpacity>

            ),
          }} >
          {() => <AddRecipes3 user={user} isLoggedIn={isLoggedIn}/>}
        </Tab.Screen>
        <Tab.Screen
          name="Account"
          options={{
            headerTitle: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='account' size={size} color={color} />
            ),
          }}
        >
          {() => <Account user={user} isLoggedIn={isLoggedIn} updateUserData={updateUserData} userFavouriteRecipes={userFavouriteRecipes} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
    elevation: 5,
  }
})

export default App;