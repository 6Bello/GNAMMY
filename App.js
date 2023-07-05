import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home.js';
import Search from './Search.js';
import Account from './Account.js';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Home2 from './components/Home2.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home2} options={
          {headerTitle:"", 
            tabBarIcon: ({color, size}) => (
              <Ionicons name="ios-home" color={color} size={size}/>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => {
                return (
                  <Search />
                )
              }}>
              <Image style={{width: 25, height: 25, }} source={require("./assets/search.png")}/>
              </TouchableOpacity>
            )
          }
      }/>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Account" component={Account} options={{headerTitle:"", tabBarIcon:({color, size}) => (<MaterialCommunityIcons name='account' size={size} color={color} />)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;