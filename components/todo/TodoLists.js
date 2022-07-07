import React, { useEffect, useState } from "react";
import { Image, View, Text,Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';


export default function TodoLists (props) {

    const [title,setTitle] = useState(props.title);


    return (
        <View style={styles.content} >
            <TouchableOpacity style={styles.touchable} onPress={() => props.navigation.navigate('Details',{todoListID : props.id})}
            >
            <Text styles={styles.text}>{title}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {props.deleteTodos(props.id); }}>
                <Image source={require('../../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        width:'100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        justifyContent:'center',
    },
    text: {
       
    },
    touchable:{
        width:200,
        alignItems:"center"
    }
});