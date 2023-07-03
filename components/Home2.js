import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Input } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animate from "react-animate";
import { TextInput } from "react-native-gesture-handler";

export default function Home2 () {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.search} type="text" >
                <Text style={{textAlign: "center", marginLeft: -7, lineHeight: 47, fontSize: 18, fontWeight:"bold"}}>Cerca</Text>
                <Image style={{width: 25, height: 25, position: "absolute", left: 205, top: 12, }} source={require("../assets/search.png")}/>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
    search: {
        backgroundColor: "lightblue",
        width: "90%",
        height: "8%",
        marginLeft: "5%",
        marginTop: "5%",
        borderRadius: 10,
    },
});