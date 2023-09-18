import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, FlatList, RefreshControl, ActivityIndicator, Image, Text } from 'react-native';
import { initRecipes } from './initRecipes';

import axios from "axios";
import { domain } from '../../dns';
import Recipe from './Recipe';

const UserPage = ({ idUser, isLoggedIn = false, userFavouriteRecipes = [0], setUserFavouriteRecipes, endRefreshing, onEndRefresh, user }) => {
    const [recipes, setRecipes] = useState([0]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
    const updateRecipes = (newRecipes) => {
        setRecipes(newRecipes);
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);

    //get recipes
    useEffect(() => {
        console.log("user.createdRecipes: ", user.createdRecipes);
        axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
            .get(`${domain}/getRecipesById`, {
                params: {
                    recipeIds: user.createdRecipes
                }
            })
            .then(response => {
                const data = response.data;        // Quando la risposta viene ricevuta con successo, assegna i dati alla costante 'data'
                const updatedData = data.map(item => {
                    if (userFavouriteRecipes.includes(item.id)) {
                        return { ...item, isLiked: true };
                    } else {
                        return { ...item, isLiked: false };
                    }
                });
                console.log(updatedData);        // Stampa i dati sulla console
                setRecipes(updatedData);        // Imposta gli elementi ottenuti come valore dello stato 'recipes'
            })
            .catch(error => {
                console.error(error);        // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console

            });
        setRefreshing(false);
    }, [refreshing, user]);

    const addFavouriteRecipe = (idRecipe) => {
        const updatedRecipes = [...userFavouriteRecipes, idRecipe];
        setUserFavouriteRecipes(updatedRecipes);
    };

    const removeFavouriteRecipe = (idRecipe) => {
        const updatedRecipes = userFavouriteRecipes.filter(recipeId => recipeId !== idRecipe);
        setUserFavouriteRecipes(updatedRecipes);
    };

    initRecipes(recipes, updateRecipes);

    const { width, height } = Dimensions.get('screen');
    console.log(width, height);
    const ITEM_WIDTH = width * 0.77;
    const ITEM_HEIGHT = 350;
    const scrollY = React.useRef(new Animated.Value(0)).current;
    console.log(userFavouriteRecipes.length);

    const renderRecipeItem = ({ item, index }) => {
        if (index === 0) {
            return (
                <View>
                    <ProfileInformationPage user={user} userFavouriteRecipes={userFavouriteRecipes} />
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
                </View>
            )
        }
        if (index === recipes.length - 1) {
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
                    {/* <View style={{ height: 40 }}>
                        <ActivityIndicator style={{ marginBottom: 20, alignSelf: 'center' }} animating={endRefreshing} size="large" />
                    </View> */}
                </View>
            );
        }
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

    if (recipes.length === 0) {
        return (
            <View>
                <ProfileInformationPage user={user} userFavouriteRecipes={userFavouriteRecipes} />
            </View>
        )
    } else {
        return (
            <View style={{ justifyContent: 'center', height: '100%' }} >
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
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        );
    }
};

const ProfileInformationPage = ({ user, userFavouriteRecipes }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            {/* Immagine del profilo */}
            <View>
                <Image source={require("../assets/user.png")} style={styles.profileImage} />

                {/* Nome utente */}
                <Text style={styles.username}>{user.name}</Text>
                <Text style={styles.handle}>@{user.username}</Text>
            </View>
            {/* Informazioni aggiuntive */}
            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{userFavouriteRecipes.length}</Text>
                    <Text style={styles.statName}>Like messi</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>#</Text>
                    <Text style={styles.statName}>Media Like</Text>
                </View>
            </View>
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
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
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

export default UserPage;
