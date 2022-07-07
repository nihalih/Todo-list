import React, { useEffect, useState,useContext } from "react";
import { View, Text,Button,TextInput,StyleSheet,Pressable } from 'react-native'



export default function Input (props) {

    const[text,onChangeText] = useState("");
   
    return (
    <View style={styles.bloc}>
  
        <TextInput style={styles.input}
                    value={text}
                    onChangeText={onChangeText}
                    placeholder={props.saisi}     
                                        
        />
                
        <Pressable style={styles.button} 
            onPress={()=> { if(text!="") {props.updateTextInput(text); onChangeText("");}}}>
            <Text style={styles.texte}>+</Text>
        </Pressable>   

    </View>
    )
}

const styles = StyleSheet.create({
    bloc: {
        flexDirection:"row",
        justifyContent:'space-between',
    },
    input: {
        paddingVertical:15,
        borderRadius:60,
        height: "40%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width :'90%',
        backgroundColor :"white",
      },
      button: {
        width: 30,
        height : 30,
        marginTop:15,
        marginRight:20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#32CD32',
        borderRadius:60,

      },
      texte: {
        color:'white',
      },
  });