export function initItems ({items, updateItems}) {   
    if(!items) return;      // Se la lunghezza dell'array 'items' è 0, non fare nulla (non ci sono elementi da inizializzare
    
    const itemsWithIsDescriptionVisible = items.map(item => {
        return { ...item, isDescriptionVisible: false };
    });
    updateItems(itemsWithIsDescriptionVisible);        // Imposta i dati nello stato del componente utilizzando 'setItems'
    

    const addDescriptionVisible = () => {
        const updatedItems = items.map(item => {
            return { ...item, descriptionVisible: false };
        });
        updateItems(updatedItems);
    };
    addDescriptionVisible();

}