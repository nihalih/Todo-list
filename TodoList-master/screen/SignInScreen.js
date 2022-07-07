import React, { useEffect, useState,useContext } from "react";
import { View, Text,Button,TextInput,StyleSheet } from 'react-native'
import { TokenContext, UsernameContext,RoleContext } from '../context/Context'
import { signIn,ShowRoles } from "../components/todoAPI";

export default function SignInScreen ({ navigation, route }) {

    const [login, onChangeLogin] = useState("");
    const [password, onChangePassword] = useState("");
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [role,setRole]=useContext(RoleContext);
    const showrole = (name,tok)=>{
        ShowRoles(name,tok).then(role => {
           setRole(role);
        }).catch(err => {
            console.log(err)
          })
    }

    const [erreur,setError] = useState("");
    const errReseau = ()=> {
        if(username==null && token==null && erreur ==null){
            erreur="Erreur de connexion au serveur ! ";
        }
    }
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
                    title='Sign in' 
                    onPress={()=> signIn(login,password).then(tok=> {
                        setToken(tok)
                        setUsername(login)
                        showrole(login,tok);
                    })
                    .catch(err => {
                        setError(err.message)
                      })} 
                      
                />  
            <Text style={styles.texterreur}>{erreur}</Text>
            </View>  
          )}
      


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