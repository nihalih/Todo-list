import React, { useEffect, useState } from "react";
import { Image, View, Text,Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function TodoList(props){
    const [done, setDone] = useState(props.item.done);
    useEffect (()=>{
        setDone(props.item.done);
    },[props.item.done])

  
    return (
        <View style={styles.content}>
            <Switch value={done} onValueChange={(state) => {setDone(state);props.updateTask(props.item.id,state);
            props.updateCount(done ? -1 : 1)}}
            />
            <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>
            <TouchableOpacity onPress={() => {props.deleteTodo(props.item.id); props.updateCount(done ? -1 : 0) }}>
                <Image source={require('../../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems:"center",
        justifyContent:'center',
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    text_item: {
        marginLeft: 15,
        width: 150
    }
});