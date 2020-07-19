import React from 'react';
import {StyleSheet, View, Image, Text } from 'react-native';
import Login from './components/Login'
import Intro from './components/Intro'
import Register from './components/Register'
import Main from './components/Main'
import Search from './components/Search'
import Settings from './components/Settings'
import MainCourse from './components/MainCourse'
import Soup from './components/Soup'
import Salad from './components/Salad'
import Appetizer from './components/Appetizer'
import Dessert from './components/Dessert'
import uploadScreen from './components/uploadScreen'
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';

//used to customize the header
const myOptions = {
  title: " ",
  headerStyle:{
    shadowColor:  '#000',
    
  }
}

function tabNavigator() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = 'ios-apps'
        } else if (route.name === 'Settings') {
          iconName = 'ios-options'
        } else if (route.name === 'Info') {
          iconName = 'ios-wallet'
        } 

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={20} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: '#bf6b6b',
        inactiveTintColor: '#000',
        style: {
          backgroundColor: '#fff',
          position: 'absolute',
          height: 100,
          left: 0,
          bottom: 0,
          right: 0,
          paddingTop: 8
        }
      }}>
      <Tab.Screen name="Dashboard" component={Search}/>
      <Tab.Screen name="Marketplace" component={uploadScreen}/>
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  )
}

//Consists of Stack Navigator with all the screens and tab navigator nested inside
function App(){
  return(
    <View style ={styles.container}> 
       <Stack.Navigator>
        <Stack.Screen name="loadingScreen" component={Intro} 
        options={{...myOptions, headerShown: false, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="loginScreen" component={Login}
        options={{...myOptions, headerShown: false, headerLeft: null, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}} />
        <Stack.Screen name="registerScreen" component={Register}
        options={{...myOptions, headerShown: false, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="mainScreen" component={Main}
        options={{...myOptions, headerTitle: "Trending", headerShown: true, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="Appetizer" component={Appetizer}
        options={{...myOptions, headerTitle: "Appetizer", headerShown: true, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="Soup" component={Soup}
        options={{...myOptions, headerTitle: "Soups", headerShown: true, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="MainCourse" component={MainCourse}
        options={{...myOptions, headerTitle: "Main Course", headerShown: true, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="Salad" component={Salad}
        options={{...myOptions, headerTitle: "Salad", headerShown: true, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="Dessert" component={Dessert}
        options={{...myOptions, headerTitle: "Dessert", headerShown: true, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}}/>
        <Stack.Screen name="main" component={tabNavigator}
        options={{...myOptions, headerLeft: false, headerShown: true, gestureEnabled: false, headerStyle: {backgroundColor: "#fff", shadowColor: 'transparent'}}}/>
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