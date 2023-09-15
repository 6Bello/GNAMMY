import React, {useState, useEffect} from 'react';
import CompileRecipe from './compileRecipe';
import SelectCategory from './selectCategory';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { set } from 'react-native-reanimated';

export default function AddRecipes ({isLoggedIn, user}) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setModalVisible(true);
      });
  
      return unsubscribe;
    }, [navigation]);
  
    const [starsSelected, setStarsSelected] = useState(0);
    useEffect(() => {
      setRecipe({...recipe, difficulty: starsSelected});
    }, [starsSelected]);
  
    const [showCategories, setShowCategories] = useState(false);
    const handleShowCategories = () => {
      setShowCategories(!showCategories);
    }
  
    const recipeInitialState = {
      creator: '',
      creatorId: '',
      title: '',
      category: '',
      time: '0:0:0',
      portions: '',
      preparation: '',
      description: '',
      ingredients: '',
      gluten: 1,
      difficulty: 1,
    };
    const [recipe, setRecipe] = useState(recipeInitialState);


    const createRecipe = () => {
        recipe.creator = user.username;
        recipe.creatorId = user.id;
        if (recipe.title === '') {
          alert('Inserisci il titolo');
          return;
        } else if (recipe.description === '') {
          alert('Inserisci la descrizione');
          return;
        } else if (recipe.category === '') {
          alert('Inserisci le categorie');
          return;
        } else if (recipe.ingredients === '') {
          alert('Inserisci gli ingredienti');
          return;
        } else if (recipe.preparation === '') {
          alert('Inserisci la preparazione');
          return;
        } else if (recipe.time === '') {
          alert('Inserisci il tempo');
          return;
        } else if (recipe.gluten === '') {
          alert('Inserisci se è gluten free');
          return;
        }
        console.log(recipe);
        axios
          .post('http://gnammy.mywire.org:80/addRecipes', recipe)    
          .then((response) => {
            user.createdRecipes.push(response.data[1]);
            console.log(response.data);
            setRecipe(recipeInitialState)
          })
          .catch((error) => {
            console.log(error);
          });
        setRecipe(recipeInitialState);
      };
    
    if (recipe.category == "") {
        return (
            <SelectCategory isLoggedIn={isLoggedIn} recipe={recipe} setRecipe={setRecipe}/>
        );
    } else {
        return (
            <CompileRecipe recipeInitialState={recipeInitialState} user={user} isLoggedIn={isLoggedIn} recipe={recipe} setRecipe={setRecipe} showCategories={showCategories} handleShowCategories={handleShowCategories} createRecipe={createRecipe} starsSelected={starsSelected} setStarsSelected={setStarsSelected}  />
        );
    }
}