import React, { useEffect, useState,useContext } from "react";
import { View, Text,Button,TextInput,StyleSheet } from 'react-native'
import { TokenContext, UsernameContext } from '../context/Context'
import { signUp } from "../components/todoAPI";


export default function SignUpScreen ({ navigation, route }) {
    
        const [login, onChangeLogin] = useState("");
        const [password, onChangePassword] = useState("");
        const [username, setUsername] = useContext(UsernameContext);
        const [token, setToken] = useContext(TokenContext);
        const [erreur,setError] = useState("");
    
        return (
        <View style={styles.content}>
        <Text style={styles.text}>Username</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeLogin}
            value={login}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
        />
        
        <Button 
            title='Sign up' 
            onPress={()=> signUp(login,password).then(token=> {
                setToken(token)
                setUsername(login)
            })
            .catch(err => {
                setError(err.message)
              })}
        />   
        <Text style={styles.texterreur}>{erreur}</Text> 
        </View>
        )
    }

    const styles = StyleSheet.create({
        content: {
            flex:1,
            flexDirection: 'column',
            backgroundColor: '#b3bde5',
            
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
            alignSelf : "center"
        }
      });