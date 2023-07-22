import React, {useState, useEffect} from 'react';
import CompileRecipe from './compileRecipe';
import SelectCategory from './selectCategory';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

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
      recipe.difficulty = starsSelected;
      console.log(recipe);
    }, [starsSelected]);
  
    
    const [category, setCategory] = useState("");
    
    useEffect(() =>{
        console.log(category)
    },[category])
  
    const [showCategories, setShowCategories] = useState(false);
    const handleShowCategories = () => {
      setShowCategories(!showCategories);
    }
  
    const recipeInitialState = {
      creator: '',
      title: '',
      category: '',
      time: '',
      portions: '',
      preparation: '',
      description: '',
      ingredients: '',
      gluten: 1,
      difficulty: 1,
    };
    const [recipe, setRecipe] = useState(recipeInitialState);

    const createRecipe = () => {
        recipe.creator = user.name;
        console.log(category)
        recipe.category = category;
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
          .post('http://79.32.231.27:8889/addRecipes', recipe)
    
          .then((response) => {
            console.log(response.data);
            setCategory(recipeInitialState)
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
    if (category == "") {
        return (
            <SelectCategory isLoggedIn={isLoggedIn} category={category} setCategory={setCategory}/>
        );
    } else {
        return (
            <CompileRecipe user={user} isLoggedIn={isLoggedIn} recipe={recipe} setRecipe={setRecipe} showCategories={showCategories} handleShowCategories={handleShowCategories} createRecipe={createRecipe} starsSelected={starsSelected} setStarsSelected={setStarsSelected}  />
        );
    }
}