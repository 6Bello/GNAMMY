import react from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const LoggedInPage = ({ user, handleIsLoggedIn }) => {
    return (
        <View style={{  marginLeft: 40,  display: "flex", flexDirection: "row"}}>
            <View style={{ }}>
                <Image source={require("../assets/user.png")} style={{ width: 50, height: 50 }} />
                <Text style={styles.title}>{user.name}</Text>
                <Text style={styles.subtitle}>@{user.name}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginLeft: 10, alignItems: "flex-end"  }}>
                <View style={{ display: "flex", width: 100, alignItems: 'flex-end', marginLeft: -20}}>
                    <Text style={styles.infoName}>Ricette</Text>
                    <View style={{ alignItems: 'center', flexDirection: "row"}}>
                        <Text style={styles.infoNumber}>3</Text>
                        <TouchableOpacity style={styles.addButton}>
                            <View style={{ backgroundColor: 'grey', borderRadius: 50, padding: 1, marginRight: -5, marginLeft: 7 }}>
                                <MaterialCommunityIcons name="plus" color={"black"} size={20} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginLeft: 25}}>
                    <Text style={styles.infoName2}>Like{'\n'}totali</Text>
                    <Text style={styles.infoNumber}>3</Text>
                </View>
                <View style={{ marginLeft: 25}}>
                    <Text style={styles.infoName2}>Media{'\n'}Like</Text>
                    <Text style={styles.infoNumber}>3</Text>
                </View>
            </View>
            {/* <TouchableOpacity onPress={handleIsLoggedIn}>
          <Text>Logout</Text>
        </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    subtitle: {
        fontSize: 15,
        opacity: 0.5,
    },

    infoNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },

    infoName: {
        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 10,
    },

    infoName2: {
        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
    },

    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default LoggedInPage