import React, {Component} from 'react';
import {Button, Image, StyleSheet, Text, View, Alert } from 'react-native';
import logo from './assets/logo.png'
import { ActivityIndicator } from 'react-native-paper';
import * as firebase from "firebase"
import FireBase from './config/FireBase';
export default class Intro extends Component {

    constructor(props){
      super(props)
      this.state = {
        isLoadingComplete: false,
      };
      if(!firebase.apps.length) {
        //firebase initialization
        firebase.initializeApp(FireBase.config);
      }
    }
    componentDidMount() {
      firebase.auth().onAuthStateChanged((user)=> {
        //if user is logged in
        if(user){
  
          firebase.database().ref('Users/' + firebase.auth()
          .currentUser.uid).child('Info:')
          .once("value", snapshot => {
            //if user's info value (income, savings, food, and other parameters) exists in the database:
            if(snapshot.exists()) {
              //navigate to main, which is the drawer navigator, chatbot being the default screen
              console.log('exists')
              this.props.navigation.navigate("main")
            } else {
              //if the info does not exist, take the user to the info screen so that they can enter their information
              this.props.navigation.navigate("infoScreen") 
              console.log('does not exist')
            }
          })
          //if the user is not logged in, take the user to the login screen where they can login  
        }else {
          setTimeout(() => {
            this.props.navigation.navigate('loginScreen');
          }, 3000);
          
        }
        
      })
    }
  
    //layout of the page
    render() {
      return (
          <View style={styles.container}>
            {/*logo*/}
            <Image source = {logo} style={{marginTop:160, width: 305, height: 200}}/>
            {/*loading bar*/}
            <View style={styles.ActivityIndicator}>
              <ActivityIndicator size="small" color="#333333"/>
            </View>
          </View>
      );
    }
  }
  
  //stylesheet 
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#38C7E5', //main blue color of the logo and the overall theme
      alignItems: 'center',
      justifyContent: 'center',
    },
    ActivityIndicator: {
      alignContent: 'center',
      marginTop: 220,
    }
  });