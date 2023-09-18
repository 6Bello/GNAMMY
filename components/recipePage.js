import react from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { domain } from "../dns";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Image } from "react-native";

export default function RecipePage({ user, item, idUser }) {

    const [recipes, setRecipes] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
    const updateRecipes = (data) => {
        setRecipes(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
    };

    return (
        <View style={{ backgroundColor: '#FFEFAF', height: '100%', width: '100%' }}>
            {/* <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>Nome Ricetta</Text>

                <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>By {idUser}</Text>
                        <View style={{ alignItems: 'center', padding: 10 }}>
                            <Image style={{ width: 70, height: 70, }} source={require("../assets/hamburger.png")}></Image>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Tempo di preparazione</Text>
                                <Text style={{ fontSize: 15, textAlign: 'center' }}>30 minuti</Text>
                            </View>
                            <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Difficoltà</Text>
                                <Text style={{ fontSize: 15 }}>Facile</Text>
                            </View>
                            <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Persone</Text>
                                <Text style={{ fontSize: 15 }}>4</Text>
                            </View>
                            <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Calorie</Text>
                                <Text style={{ fontSize: 15 }}>500</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View> */}
            <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
                <View style={{ backgroundColor: '#FFC90E', borderRadius: 20, width: '95%', height: 600, alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#FF7F27', borderRadius: 10, width: '85%', height: 90, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold', marginBottom: 5 }}>Nome Ricetta</Text>
                        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 5 }}>By {idUser}</Text>
                    </View>
                    <View style={{ alignItems: 'center', padding: 10 }}>
                        <Image style={{ width: 70, height: 70, }} source={require("../assets/hamburger.png")}></Image>
                    </View>
                    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10, width: '85%', height: 200, marginTop: 20, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 20 }}>
                            <View style={{ width: '50%', alignItems: 'center', }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Tempo di preparazione</Text>
                                <Text style={{ fontSize: 15, textAlign: 'center' }}>30 minuti</Text>
                            </View>
                            <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Difficoltà</Text>
                                <Text style={{ fontSize: 15 }}>Facile</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 20 }}>
                            <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Persone</Text>
                                <Text style={{ fontSize: 15 }}>4</Text>
                            </View>
                            <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Calorie</Text>
                                <Text style={{ fontSize: 15 }}>500</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
