import React, { useEffect, useState,useContext } from "react";
import { View, Text,Button,StyleSheet } from 'react-native'
import { TokenContext, UsernameContext,RoleContext } from '../context/Context'


export default function SignOutScreen ({ navigation, route }) {
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [role,setRole] = useContext(RoleContext);
    const SignOut = ()=>{
        setToken(null);
        setUsername(null);
    }

    return (
    <View style={styles.content}>
        <Text style={styles.texterreur}>{username} vous allez être déconnecté</Text>
        <Button title='Sign me out' onPress={() => {setRole("");SignOut();}} />
                    
    </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#818be6',
        justifyContent :'center',
        
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        backgroundColor:'white'
    },
    text :{
        color:"black",
    },
    texterreur: {
        color:'#cd171c',
        alignSelf : "center",
        backgroundColor:"black"
    }
  });