import React, { useEffect, useState } from "react";
import { Image, View, Text,Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';


export default function UserList (props) {

    const [username,setUsername] = useState(props.username);


    return (
        <View style={styles.content} >
            <Text> Utilisateur {username}</Text>
            <TouchableOpacity style ={styles.bouton} onPress={()=> props.deleteUser(props.id)}>
                <Text style={styles.text}>Supprimer l'utilisateur</Text>
            </TouchableOpacity>   
            <TouchableOpacity style ={styles.bouton} onPress={()=> props.navigation.navigate('TodosUser',{username : props.username})}>
                <Text style={styles.text}>Liste des todos </Text>
            </TouchableOpacity>     
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        width:"100%",
        flexDirection: 'column',
        backgroundColor:"white",   
        borderWidth: 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20, 
        justifyContent:"center",
        alignItems:'center',
    },
    bouton :{
        backgroundColor: "grey",
        borderWidth: 2,
        width:"50%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20, 
        width:200,
        alignItems:"center"
        
    },

    text : {
       color:"white"
    }
})