import React, { useEffect, useState,useContext } from "react";
import { View, Text,TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../screen/TodoListScreen'
import TodoListsScreen from "../screen/TodoListsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationTodo () {
    return (
        <Stack.Navigator>
          <Stack.Screen name='TodoList' component={TodoListsScreen}  />
          <Stack.Screen name='Details' component={TodoListScreen} />
        </Stack.Navigator>
    )
  }