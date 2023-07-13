import React, { useState, useRef } from 'react';
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
import Search from './screens/Search';
import HeaderRightButton from './components/HeaderRightButton';

const Tab = createBottomTabNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const handleIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const updateUserData = (data) => {
    setUser(data);
    console.log("ao");
    console.log("user: ", user);
  };


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
          component={Search}
          options={{
            tabBarItemStyle:{display:'none'},
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
            headerRight: () => (
              <HeaderRightButton />
            )
          }}
        />
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
          {() => <AddRecipes user={user}/> }
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
          {() => <Account user={user} isLoggedIn={isLoggedIn} handleIsLoggedIn={handleIsLoggedIn} updateUserData={updateUserData} />}
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