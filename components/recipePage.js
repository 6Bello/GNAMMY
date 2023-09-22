import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';

export default function RecipePage() {
    const route = useRoute();
    const item = route.params .item
    console.log(item)

    const [recipes, setRecipes] = useState([]); // Stato per memorizzare gli elementi ricevuti dalla ricerca
    const updateRecipes = (data) => {
        setRecipes(data); // Aggiorna lo stato degli elementi con i risultati della ricerca
    };

    return (
        <ScrollView style={{ backgroundColor: '#FFEFAF', width: '100%'}}>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={require("../assets/hamburger.png")} />
        </View>
        <View style={{ backgroundColor: '#FFC90E', borderRadius: 20, width: '90%', marginHorizontal: '5%', alignItems: 'center', shadowColor: 'black', shadowOpacity: 0.8, shadowRadius: 5, elevation: 5, shadowOffset: { width: 0, height: 2 } }}>
          <View style={{ backgroundColor: '#FF7F27', borderRadius: 10, width: '85%', marginTop: 20, justifyContent: 'center' }}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around'}}>
                <Text style={{ width: '66%', fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>{item.title}</Text>
                <Text style={{width: '33%', fontSize: 15, textAlign: 'center'}}>{item.category}</Text>
            </View>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 5 }}>By {item.creator_username}</Text>
          </View>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10, width: '85%', marginTop: 20, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 }}>
              <Text>Contiene Glutine:</Text>
              {item.gluten === 0 ? <AntDesign name="closecircleo" size={20} color="red" /> : <AntDesign name="checkcircleo" size={20} color="green" />}
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Tempo di preparazione</Text>
                <Text style={{ fontSize: 15, textAlign: 'center' }}>{item.time}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginHorizontal: 20, marginVertical: 10 }}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Porzioni</Text>
                <Text style={{ fontSize: 15, textAlign: 'center' }}>{item.portions}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Difficoltà</Text>
                <Text style={{ fontSize: 15, textAlign: 'center' }}>{item.difficulty}/5</Text>
              </View>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 10, textAlign: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center'  }}>Descrizione</Text>
              <Text style={{ fontSize: 15, textAlign: 'center'  }}>{item.description}uidawhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Preparazione</Text>
              <Text style={{ fontSize: 15 }}>{item.preparation}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 50 }}/>
      </ScrollView>
    );
};
