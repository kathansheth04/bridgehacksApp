import React, {Component} from 'react';
import {Button, Image, StyleSheet, Text, View, Alert, Dimensions } from 'react-native';
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
            this.props.navigation.navigate('mainScreen');
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
            
            <Text>Welcome to Recipe Dictionary</Text>
            <Text>recipes all in one place</Text>
            {/*loading bar*/}
            <View style={styles.ActivityIndicator}>
              <ActivityIndicator size="small" color="#333333"/>
            </View>
          </View>
      );
    }
  }

  const {height, width} = Dimensions.get('window');
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