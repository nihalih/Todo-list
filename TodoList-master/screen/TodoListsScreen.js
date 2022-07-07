import React, { useEffect, useState,useContext } from "react";
import { View, Text,FlatList,Button,StyleSheet } from 'react-native'
import TodoLists from '../components/todo/TodoLists.js';
import { taskLists,createTaskLists,deleteTaskLists,deleteAllTask } from "../components/todoAPI";
import { TokenContext, UsernameContext } from '../context/Context'
import Input from "../components/UI/Input.js";
import EmptyList from "../components/UI/EmptyList";


export default function TodoListsScreen ({navigation,route}) {
    const [username, setUsername] = route.params !== undefined ? useState(route.params.username) : useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [data,setData] = useState([]);
    const [TextInput,setTextInput] = useState("");
    const updateTextInput = (text)=>setTextInput(text);
    const [todotmp,setTodosTmp]=useState(data);
    
    
    const MiseAJourAffichage=()=>{taskLists(username,token).then(data => {
        setData(data)
    }).catch(err => {
        console.log(err)
      });
    }
    
    useEffect( () =>
    MiseAJourAffichage(), [])
    
    //Use effect pour le text input qui est modifié dans le composant input
    useEffect(()=> {
        if(TextInput != "") {
        createTaskLists(TextInput,username,token).then(data => {
        MiseAJourAffichage();
        setTextInput("")
               
    }).catch(err => {
        console.log(err);
    })}},[TextInput])


    //Delete la todo et egalement les item à l'interieur
    const deleteTodos = (id) => {
        //Commencer par supprimer tous les item associé à la todo
        deleteAllTask(id,token).then(nbtaskdelete =>{
            //console.log(nbtaskdelete)
            //Supprimer la todo si reussite
            deleteTaskLists(id,token).then(noeudDeleted => {
        
                MiseAJourAffichage();
                 }).catch(err => {
                console.log(err)
              })
        }).catch(err => {
            console.log(err)
          })
    }
    return (
        <View style={styles.contenaire} >
            {data.length=== 0 ? (<EmptyList text={"Veuillez ajouter une liste..."}></EmptyList>) : (<FlatList
                style={{ paddingLeft: 10 }}
                data={data}
                renderItem={({item}) => <TodoLists title={item.title}
                id={item.id}
                deleteTodos={deleteTodos}
                navigation={navigation}/>}     
            />)}
             
            <Input saisi={"Saisir une nouvelle todoList"}
            updateTextInput={updateTextInput}
            >

            </Input>

        </View>
    )
}

const styles = StyleSheet.create({
    contenaire:{
        flex:1,
        backgroundColor:"#818be6",
        justifyContent :'center',
        alignItems:'center',
    },
  
    element :{
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    text_item: {
        marginLeft: 10,
        width: 150
    }, 
    filtre : {
        flexDirection:"row",
        justifyContent:'space-between',
            
    },
});