import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState,useContext } from "react";
import { StyleSheet, Text, View,Button,FlatList} from 'react-native';
import { TokenContext, UsernameContext } from '../context/Context';
import {ShowUser,DeleteUser,deleteAllTaskUser,deleteAllTasksUser} from "../components/todoAPI";
import UserList from '../components/user/UserList';

export default function AdminScreenUser({navigation,route}) {
  const [token, setToken] = useContext(TokenContext);
  const [Userslist,setUsersList] = useState();
  
   

    const listUsers = () => {
        ShowUser(token).then(users => {
           setUsersList(users)
        }).catch(err => {
            console.log(err)
          })
    }
    const deleteUser =(id)=>{
        deleteAllTasksUser(id,token).then(nombreSup => {
        }).catch(err => {
            console.log(err)
          })
          deleteAllTaskUser(id,token).then(nombreSup => {
        }).catch(err => {
            console.log(err)
          })
        DeleteUser(id,token).then(nombreSup => {
            listUsers();
         }).catch(err => {
             console.log(err)
           })
    }

    useEffect( () =>
    listUsers(), [])

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Liste des utilisateurs</Text>
        <FlatList
                style={{ paddingLeft: 10 }}
                data={Userslist}
                renderItem={({item}) => <UserList username={item.username}
                id={item.id}
                navigation={navigation}
                deleteUser={deleteUser}
               />}     
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
      backgroundColor:"#818be6",
      justifyContent :'center',
      alignItems:'center',
    justifyContent: 'center',
    
  },
  text :{
    color:'black',
  }
});
