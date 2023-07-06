const handleScroll = (event, updatePaddingTop) => {
    const { contentOffset } = event.nativeEvent; // Ottiene lo spostamento dello scroll dall'evento
    updatePaddingTop(contentOffset.y); // Imposta il valore dello stato paddingTop con il valore di spostamento dello scroll
  };

  export default handleScroll;