export function initRecipes ({recipes, updateRecipes}) {   
    if(!recipes) return;      // Se la lunghezza dell'array 'recipes' è 0, non fare nulla (non ci sono elementi da inizializzare
    
    const recipesWithIsDescriptionVisible = recipes.map(item => {
        return { ...item, isDescriptionVisible: false };
    });
    updateRecipes(recipesWithIsDescriptionVisible);        // Imposta i dati nello stato del componente utilizzando 'setRecipes'
    

    const addDescriptionVisible = () => {
        const updatedRecipes = recipes.map(item => {
            return { ...item, descriptionVisible: false };
        });
        updateRecipes(updatedRecipes);
    };
    addDescriptionVisible();

}