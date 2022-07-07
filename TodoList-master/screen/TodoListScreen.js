import React, { useEffect, useState,useContext } from "react";
import { Image, View, Text,Button, StyleSheet, TouchableOpacity,FlatList,Pressable } from 'react-native';
import TodoList from '../components/todo/TodoList.js';
import { TokenContext, UsernameContext } from '../context/Context'
import {afficheTasks,createTask,deleteTask,UpdateTask,MakeAllTask,DemakeAllTask,ShowDoneTask,ShowNotDoneTask} from "../components/todoAPI"
import Input from "../components/UI/Input.js";
import EmptyList from "../components/UI/EmptyList";




export default function TodoListScreen({navigation,route}){
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [todoItem,setTodo] = useState([]);
    const [TextInput,setTextInput] = useState("");
    const updateTextInput = (text)=>setTextInput(text);
    const [count,setCount] = useState(todoItem.filter((item)=>item.done).length);
    const updateCount = (valeur)=>setCount(count+valeur);
    const [IDparent ,setIDparent] = useState(route.params.todoListID);
    const[todoTmp,setTodoTmp] = useState([]);
    const [textEmptyList,setTextEmptyList] =useState("");
    const [number,setNumber] = useState("");

    const calculPourcentage =(longueur,fait)=>{
        if(fait==0){
            return "0%";
        }
        return (fait/longueur)*100 +"%";
    }
      //Met a jour la liste des todo
      const MiseAjourTodoItem =()=> {
        afficheTasks(IDparent,token).then(data =>{
            setTodo(data);
            setTodoTmp(data);
            indication(data)
        }).catch(err => {
            console.log(err)
          });

    }
    //Met a jour un item
    const updatetask =(id,done)=>{
        UpdateTask(id,done,token).then(data =>{
            MiseAjourTodoItem();
        }).catch(err => {
            console.log(err)
          });

    }

    //Supprime l'item de la todo liste
    const deleteTodo = (id) => {
        deleteTask(id,token).then(noeudDeleted => {
            MiseAjourTodoItem();
        }).catch(err => {
            console.log(err)
          })
        }
    const makeAll=()=>{
        MakeAllTask(IDparent,token).then(data => {
            MiseAjourTodoItem();
        }).catch(err => {
            console.log(err)
          })
    }
    const demakeAll=()=>{
        DemakeAllTask(IDparent,token).then(data => {
            MiseAjourTodoItem();
        }).catch(err => {
            console.log(err)
          })
    }
    const showAllDone=()=>{
        ShowDoneTask(IDparent,token).then(data => {
            setTodo(data);
        }).catch(err => {
            console.log(err)
          })

    }
    const showAllNotDone =()=>{
        ShowNotDoneTask(IDparent,token).then(data => {
            setTodo(data);
        }).catch(err => {
            console.log(err)
          })
    }

    //Indication sur les task disponible
    const indication =(data)=> {
        if(data.length==0){
           setTextEmptyList("Aucune task disponible..");
        }
        else {
            setTextEmptyList("");
        }
           
    }

  
    //Initialisation des todo item
    useEffect( () =>{
        MiseAjourTodoItem(); 
        } , [])

    //Text input pour saisie task modifié donc ajout d'une tasklist
    useEffect(()=> {
        if(TextInput != "") {
        createTask(IDparent,TextInput,token).then(data => {
        MiseAjourTodoItem();
        setTextInput("")
               
    }).catch(err => {
        console.log(err);
    })}},[TextInput])
    
    //Lorsque modif todo item mettre a jour le count
    useEffect(()=>{
        setCount(todoItem.filter((item)=>item.done).length);
        setNumber(calculPourcentage(todoItem.length,todoItem.filter((item)=>item.done).length));
    }
    ,[todoItem])
  
    return (
        <View style={styles.contenaire}>
            <View style={styles.content}>
                <FlatList
                    style={{ paddingLeft: 10 }}
                    data={todoItem}
                    renderItem={({item}) => <TodoList item={item}
                
                    updateCount={updateCount}
                    deleteTodo={deleteTodo}
                    updateTask={updatetask}
                />} 
               
                />
            </View>

            <View>
                {todoTmp.length=== 0 ? (<EmptyList text={"Veuillez ajouter une tache..."}></EmptyList>) : 
                (
                <View>
                    <Text>Le nombre d'item éffectué est de {count} </Text>
                    <Text>Taches éffectuées à {number} </Text>
                    <View style={styles.progressBar}>
                        <View style={{borderRadius: 7,width:number,height:16,backgroundColor:"#8BED4F"}}></View>
                    </View>
            
                    <View style={styles.filtre}>

                        <Pressable style={styles.checkbutton}
                        onPress={()=> makeAll()}>
                            <Text>Tout cocher</Text>
                        </Pressable >
                        <Pressable style={styles.checkbutton}
                        onPress={()=> demakeAll()}>
                            <Text>Decocher tout</Text>
                        </Pressable >
                        <Pressable style={styles.checkbutton}
                        onPress={() => showAllDone()}>
                            <Text>Afficher fait</Text>
                        </Pressable >
                        <Pressable style={styles.checkbutton}
                        onPress={()=>showAllNotDone()}>
                            <Text>Afficher non fait</Text>
                        </Pressable >
                    </View>

                </View>
                ) } 
                
            </View>

           
            <View>
                <Input saisi={"Saisir une nouvelle tâche"}
                updateTextInput={updateTextInput}
                />
            </View>

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
    content: {
        
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
    checkbutton: {
        width:70,
        height:40,
        backgroundColor:'grey',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
    },
    progressBar: {
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 3,
        borderRadius: 5
    },
    BackGroundProgress:{
        height:16,
        width : "50%",
        backgroundColor: '#8BED4F',
        borderRadius: 7
       
    }
});