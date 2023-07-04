import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const Recipes = () => {
    const [items, setItems] = useState([]);
    const addDescriptionVisible = () => {
        const updatedItems = items.map(item => {
            return { ...item, descriptionVisible: false };
        });
        setItems(updatedItems);
    };

    const [paddingTop, setpaddingTop] = useState(20);
    const [readingDescription, setReadingDescription] = useState(false);

    useEffect(() => {
        axios // Effettua una richiesta GET all'endpoint specificato utilizzando Axios
            .get('http://79.44.99.29:8889/getRecipes')
            .then(response => {
                const data = response.data;        // Quando la risposta viene ricevuta con successo, assegna i dati alla costante 'data'
                console.log(data);        // Stampa i dati sulla console
                const dataWithIsDescriptionVisible = data.map(item => {
                    return { ...item, isDescriptionVisible: false };
                });
                setItems(dataWithIsDescriptionVisible);        // Imposta i dati nello stato del componente utilizzando 'setItems'
            })
            .catch(error => {
                console.error(error);        // Se si verifica un errore durante la richiesta, visualizza un messaggio di errore sulla console

            });
        addDescriptionVisible();
    }, []);


    const renderItem = ({ item, index }) => {
        const timestamp = new Date().getTime();
        const imageUrlWithTimestamp = `http://79.44.99.29:8889/images/${item.id}?timestamp=${timestamp}`;
        const paddingItem = (items.length - index) * 250 - 2000;

        return (
            <TouchableOpacity style={{ marginBottom: 5, marginTop: 15 }}
                onPress={() => {
                    const updatedItems = [...items]; // Crea una copia dell'array items
                    updatedItems[index] = {
                        ...item,
                        isDescriptionVisible: !item.isDescriptionVisible, // Aggiorna il valore isDescriptionVisible
                    };
                    setItems(updatedItems); // Aggiorna lo stato con la nuova array aggiornata
                    console.log(item);
                }}
            >
                <ImageBackground
                    source={require('../R.jpg')}
                    style={{
                        ...(item.isDescriptionVisible ? styles.readingDescription : { height: 200 }),
                        width: '100%',
                        backgroundColor: 'black',
                        position: 'relative',
                    }}
                    imageStyle={{
                        resizeMode: "cover",
                        position: 'absolute',
                        width: '100%',
                        height: 200,
                        paddingBottom: paddingTop + paddingItem,
                        top: 0,
                        alignSelf: "flex-end",
                    }}
                    onScroll={handleScroll}
                >
                    <LinearGradient
                        colors={['transparent', 'black']}
                        locations={[0.5, 1.2]}
                        style={{ flex: 1 }}
                    >

                        <Text style={{ color: 'black', textAlign: 'center' }}>{item.name}</Text>
                        <Text style={{ color: 'grey', textAlign: 'center' }}>{item.description}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 100 }}>
                            <TouchableOpacity style={styles.circle} onPress={() => { }} />
                            <TouchableOpacity style={styles.circle} onPress={() => { }} />
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        setpaddingTop(contentOffset.y);
    };
    return (
        <FlatList data={items} renderItem={renderItem} onScroll={handleScroll} removeClippedSubviews={true} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    readingDescription: {
        height: 300,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'red',
    }
});


export default Recipes;