import React from 'react';
import {StyleSheet, View, Image, Text } from 'react-native';
import Login from './components/Login'
import Intro from './components/Intro'
import Register from './components/Register'
import Main from './components/Main'
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

//used to customize the header
const myOptions = {
  title: " ",
  headerStyle:{
    shadowColor: 'transparent',
    shadowOffset: {
      height: 0,
    },
  }
}

//Consists of Stack Navigator with all the screens and tab navigator nested inside
function App(){
  return(
    <View 
      style ={styles.container}
    > 
       <Stack.Navigator>
        <Stack.Screen name="loadingScreen" component={Intro} 
        options={{...myOptions, headerShown: false, gestureEnabled: false, headerStyle: {backgroundColor: "#000", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="loginScreen" component={Login}
        options={{...myOptions, headerShown: false, headerLeft: null, gestureEnabled: false, headerStyle: {backgroundColor: "#000", shadowColor: 'transparent'}}} />
        <Stack.Screen name="registerScreen" component={Register}
        options={{...myOptions, headerShown: false, gestureEnabled: false, headerStyle: {backgroundColor: "#000", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="mainScreen" component={Main}
        options={{...myOptions, headerShown: false, gestureEnabled: false, headerStyle: {backgroundColor: "#000", shadowColor: 'transparent'}}}/>
      </Stack.Navigator>
      
    </View>
  );
}

//export the navigation
export default ()=>{
    return(
      <NavigationContainer>
        <App/>
      </NavigationContainer>
    )
}

//stylesheet for App() function
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})