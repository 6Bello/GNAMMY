import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home.js';
import Search from './Search.js';

const Tab = createBottomTabNavigator();

function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;