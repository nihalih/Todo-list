import React, { useEffect, useState ,useContext} from "react";
import { View, Text,StyleSheet,Image } from 'react-native'
import { TokenContext, UsernameContext } from '../context/Context';



export default function HomeScreen () {
    const [username, setUsername] = useContext(UsernameContext);
  return (
    <View style={styles.content}>
      <Text style={styles.text}>Bienvenu {username} !</Text>
      <Text style={styles.text}>Tu as décidé de t'entrainé ?</Text>
      <Image style={styles.image} source={require("../assets/boxe-glove.png")}></Image>
     
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
      flex:1,
      flexDirection: 'column',
      backgroundColor: '#818be6',
      alignItems: 'center',
      justifyContent:'center',
      
  },
  text: {

     color:"white",
  },
  image:{
    marginTop:20,
    width: 150,
    height: 150,
   
},
})