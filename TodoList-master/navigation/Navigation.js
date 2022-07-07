import React, { useEffect, useState,useContext } from "react";
import { View, Text,TextInput,StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link } from '@react-navigation/native';
import { TokenContext, UsernameContext,RoleContext } from '../context/Context';



import TodoListsScreen from '../screen/TodoListsScreen' 
import HomeScreen from '../screen/HomeScreen'
import SignInScreen from '../screen/SignInScreen'
import SignOutScreen from '../screen/SignOutScreen'
import SignUpScreen from '../screen/SignUpScreen'
import NavigationTodo from './NavigationTodo'
import NavigationAdminUser from './NavigationAdminUser';
import AdminScreenUser  from "../screen/AdminScreenUser";



const Tab = createBottomTabNavigator();


export default function Navigation () {
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);
  const [role,setRole] = useContext(RoleContext);
 

  return (
        <NavigationContainer>
          {token == null ? (
            <Tab.Navigator>
              <Tab.Screen name='SignIn' component={SignInScreen} />
              <Tab.Screen name='SignUp' component={SignUpScreen} />
            </Tab.Navigator>
          ) : ( role==="admin" ? (
            <Tab.Navigator>
              <Tab.Screen name='Home' component={HomeScreen} />
              <Tab.Screen name='TodoLists' component={NavigationTodo}  options={{ headerShown: false }} />
              <Tab.Screen name ="GestionUser" component={NavigationAdminUser} options={{ headerShown: false }} />
              <Tab.Screen name='SignOut' component={SignOutScreen} />
            </Tab.Navigator>
          ) :
            (<Tab.Navigator>
              <Tab.Screen name='Home' component={HomeScreen} />
              <Tab.Screen name='TodoLists' component={NavigationTodo}  options={{ headerShown: false }} />
              <Tab.Screen name='SignOut' component={SignOutScreen} />
            </Tab.Navigator>)
          )}
        </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({
  content: {
      backgroundColor: '#311b97',
  },
  text: {
      marginLeft: 20,
      width: 150
  }
})