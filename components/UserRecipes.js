import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import { initRecipes } from './initRecipes';
import Recipe from './Recipe';
import axios from 'axios';
import { domain } from '../dns';

const UserRecipes = ({
  idUser,
  isLoggedIn = false,
  userFavouriteRecipes = [0],
  setUserFavouriteRecipes,
  endRefreshing,
  onEndRefresh,
  user,
}) => {
  const [recipes, setRecipes] = useState([0]);
  const updateRecipes = (newRecipes) => {
    setRecipes(newRecipes);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    axios
      .get(`${domain}/getRecipesById`, {
        params: {
          recipeIds: user.createdRecipes,
        },
      })
      .then((response) => {
        const data = response.data;
        const updatedData = data.map((item) => {
          if (userFavouriteRecipes.includes(item.id)) {
            return { ...item, isLiked: true };
          } else {
            return { ...item, isLiked: false };
          }
        });
        setRecipes(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefreshing(false);
  }, [refreshing, user]);

  const addFavouriteRecipe = (idRecipe) => {
    const updatedRecipes = [...userFavouriteRecipes, idRecipe];
    setUserFavouriteRecipes(updatedRecipes);
  };

  const removeFavouriteRecipe = (idRecipe) => {
    const updatedRecipes = userFavouriteRecipes.filter(
      (recipeId) => recipeId !== idRecipe
    );
    setUserFavouriteRecipes(updatedRecipes);
  };

  initRecipes(recipes, updateRecipes);

  const { width, height } = Dimensions.get('screen');
  const ITEM_WIDTH = width * 0.77;
  const ITEM_HEIGHT = 350;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const renderRecipeItem = ({ item, index }) => {
    // La parte iniziale della lista è il profilo, il nome utente e le statistiche
    if (index === 0) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.profileInfo}>
            <Image
              source={require('../assets/user.png')}
              style={styles.profileImage}
            />
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.handle}>@{user.username}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>
                  {userFavouriteRecipes.length}
                </Text>
                <Text style={styles.statName}>Like messi</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>#</Text>
                <Text style={styles.statName}>Media Like</Text>
              </View>
            </View>
          </View>
          {/* Dopo il profilo, visualizziamo la prima ricetta */}
          <Recipe
            key={index}
            idUser={idUser}
            isLoggedIn={isLoggedIn}
            item={item}
            index={index}
            updateRecipes={updateRecipes}
            recipes={recipes}
            userFavouriteRecipes={userFavouriteRecipes}
            addFavouriteRecipe={addFavouriteRecipe}
            removeFavouriteRecipe={removeFavouriteRecipe}
            ITEM_HEIGHT={ITEM_HEIGHT}
            ITEM_WIDTH={ITEM_WIDTH}
            scrollY={scrollY}
            height={height}
            inputRange={[
              (index - 1) * ITEM_HEIGHT,
              index * ITEM_HEIGHT,
              (index + 1) * ITEM_HEIGHT,
            ]}
          />
        </View>
      );
    }

    // Le ricette successive vengono visualizzate normalmente
    return (
      <View style={{ alignItems: 'center' }}>
        <Recipe
          key={index}
          idUser={idUser}
          isLoggedIn={isLoggedIn}
          item={item}
          index={index}
          updateRecipes={updateRecipes}
          recipes={recipes}
          userFavouriteRecipes={userFavouriteRecipes}
          addFavouriteRecipe={addFavouriteRecipe}
          removeFavouriteRecipe={removeFavouriteRecipe}
          ITEM_HEIGHT={ITEM_HEIGHT}
          ITEM_WIDTH={ITEM_WIDTH}
          scrollY={scrollY}
          height={height}
          inputRange={[
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
          ]}
        />
      </View>
    );
  };

  return (
    <View style={{ justifyContent: 'center', height: '100%' }}>
      <Animated.FlatList
        style={styles.container}
        data={recipes}
        renderItem={renderRecipeItem}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndRefresh}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20, // Aggiunto margine superiore per spaziare l'immagine del profilo dalla parte superiore
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  handle: {
    fontSize: 15,
    opacity: 0.5,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statName: {
    fontSize: 15,
    opacity: 0.5,
  },
});


//     return (
//         <View style={styleContainer.container}>
//             <Recipes
//                 recipes={recipes}
//                 updateRecipes={updateRecipes}
//                 idUser={idUser}
//                 isLoggedIn={isLoggedIn}
//                 userFavouriteRecipes={userFavouriteRecipes}
//                 setUserFavouriteRecipes={setUserFavouriteRecipes}
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 endRefreshing={false}
//             />
//         </View>
//     );
// }

// const styleContainer = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 100,
//         width: '100%',
//     },
// });

export default UserRecipes;
