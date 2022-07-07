import React, { useEffect, useState,useContext } from "react";
import { View, Text,Button,TextInput,StyleSheet,Pressable,Image } from 'react-native'

export default function EmptyList(props) {
  return (
    <View style={styles.bloc}>
      <Image style={styles.image}
        source={require("../../assets/bonhome.png")}
      />
      <Text style={styles.text}> {props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    bloc: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: 80,
        height: 160,
       
    },

    text: {
        color: 'white',
        margintop: 30,
        fontsize: 30,
      },
      
      texte: {
        color:'white',
      },
  });