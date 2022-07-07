import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View} from 'react-native';
import Navigation from './navigation/Navigation';
import { TokenContext, UsernameContext,RoleContext } from './context/Context';

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [role,setRole] =useState(null);
 


  useEffect(()=> {
    setToken(token);
  },[token])

  return (
    
    <UsernameContext.Provider value={[username, setUsername]}>
    <TokenContext.Provider value={[token, setToken]}>
    <RoleContext.Provider value={[role,setRole]}>
      <Navigation  />
     </RoleContext.Provider>
    </TokenContext.Provider>
  </UsernameContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#311b97',
  },
});
