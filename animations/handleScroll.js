const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent; // Ottiene lo spostamento dello scroll dall'evento
    setpaddingTop(contentOffset.y); // Imposta il valore dello stato paddingTop con il valore di spostamento dello scroll
  };

  export default handleScroll;