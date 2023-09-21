import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { domain } from "./dns";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import LogOutButton from "./components/logOutButton";
import {
  View,
  StyleSheet,
  Animated,
} from "react-native";

import {
  storeData,
  getData,
  removeData,
  loginUserSavedData
} from "./components/functions/AsyncStorage";

import Home from "./screens/Home";
import Account from "./screens/Account";
import Search from "./screens/Search";
import RecipePage from "./components/recipePage";
import HeaderRightButton from "./components/HeaderRightButton";
import AddRecipes from "./screens/addRecipes/AddRecipes";

const Tab = createBottomTabNavigator();

function MainScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [idUser, setIdUser] = useState(0);

  const updateUserData = (data, isLoggedInNow) => {
    setUser(data);
    if (isLoggedIn != isLoggedInNow && isLoggedInNow) {
      setIdUser(data.id);
      const userJSON = JSON.stringify(data);
      console.log("userJson", userJSON);
      storeData(userJSON, "userSavedData")
        .then(() => {
          console.log("Data stored");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else if (isLoggedIn != isLoggedInNow && !isLoggedInNow) {
      setIdUser(0);
      storeData(userDataSaved)
        .then(() => {
          console.log("Data stored");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
    setIsLoggedIn(isLoggedInNow);

    console.log(user);
  };
  
  const isFirstRender = useRef(true); //variabile per verificare se è la prima volta che l'effetto viene eseguito
  useEffect(() => {
    // Verifica se è la prima volta che l'effetto viene eseguito
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loginUserSavedData(setUser, setIdUser, setIsLoggedIn);
      return;
    }
    setUserFavouriteRecipes(user.favouriteRecipes); //aggiorna lo stato userFavouriteRecipes con i preferiti dell'utente
  }, [user]);

  const [userFavouriteRecipes, setUserFavouriteRecipes] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca

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
    outputRange: ["0deg", "360deg"],
  });

  const [tabBarVisible, setTabBarVisible] = useState(true); // Stato per nascondere la tab bar durante la splash screen
  const handleTabBarVisible = () => {
    setTabBarVisible(true);
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            display: tabBarVisible ? "flex" : "none",
          },
        }}
      >
        {/* <Tab.Screen
        name=" "
        component={SplashScreen}
        initialParams={{ setTabBarVisible: handleTabBarVisible }} // Pass the prop tabBarVisible to SplashScreen
        options={{
          tabBarItemStyle: { display: 'none' },
        }}
      /> */}
        <Tab.Screen
          name="Search"
          options={{
            tabBarItemStyle: { display: "none" },
          }}
        >
          {() => (
            <Search
              user={user}
              idUser={idUser}
              isLoggedIn={isLoggedIn}
              userFavouriteRecipes={userFavouriteRecipes}
              setUserFavouriteRecipes={setUserFavouriteRecipes}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Home"
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#FFEFAF', // Cambia il colore di sfondo dell'header
            },
  
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
            headerRight: () => <HeaderRightButton />,
          }}
        >
          {() => (
            <Home
              user={user}
              idUser={idUser}
              isLoggedIn={isLoggedIn}
              userFavouriteRecipes={userFavouriteRecipes}
              setUserFavouriteRecipes={setUserFavouriteRecipes}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AddRecipes"
          options={{
            tabBarLabel: "",
            headerStyle: {
              backgroundColor: '#FFEFAF', // Cambia il colore di sfondo dell'header
            },
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                style={{
                  width: 65,
                  height: 65,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 25,
                }}
                onPress={handlePress}
              >
                <View style={[{ alignItems: "center" }, styles.shadow]}>
                  <Animated.View
                    style={{ transform: [{ rotate: rotateInterpolation }] }}
                  >
                    <View
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 50,
                        backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        color="white"
                        size={40}
                      />
                    </View>
                  </Animated.View>
                </View>
              </TouchableOpacity>
            ),
          }}
        >
          {() => <AddRecipes user={user} isLoggedIn={isLoggedIn} />}
        </Tab.Screen>
        <Tab.Screen
          name="Account"
          options={{
            headerTitle: user ? user.username : "",
            headerStyle: {
              backgroundColor: '#FFEFAF', // Cambia il colore di sfondo dell'header
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),            
            headerRight: () => isLoggedIn ? <LogOutButton setIsLoggedIn={setIsLoggedIn} setIdUser={setIdUser} /> : null,
          }}
        >
          {() => (
            <Account
              user={user}
              isLoggedIn={isLoggedIn}
              updateUserData={updateUserData}
              userFavouriteRecipes={userFavouriteRecipes}
              setUserFavouriteRecipes={setUserFavouriteRecipes}
            />
          )}
        </Tab.Screen>
        {/* <Tab.Screen
          name="ProfilePage"
          component={ProfilePage}
          initialParams={{setUserFavouriteRecipes: setUserFavouriteRecipes}}
          options={{
            tabBarItemStyle: { display: 'none' },
          }}
        /> */}
        <Tab.Screen
          name="recipePage"
          options={{
            tabBarItemStyle: { display: "none" },
              headerTitle: "",
              headerStyle: {
                backgroundColor: '#FFEFAF', // Cambia il colore di sfondo dell'header
              },
          }}
        >
          {() => (
            <RecipePage
            user={user}
            idUser={idUser}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default MainScreen;
