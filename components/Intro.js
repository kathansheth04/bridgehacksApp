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
            this.props.navigation.navigate('main');
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
            
            <Image style={{width: 250, height: 250}}source={require('./assets/logo.png')}/>
            {/*loading bar*/}
            <View style={styles.ActivityIndicator}>
              <ActivityIndicator size="small" color="#bf6b6b"/>
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
      backgroundColor: '#ffffff', 
      alignItems: 'center',
      justifyContent: 'center',
    },
    ActivityIndicator: {
      alignContent: 'center',
      marginTop: 220,
    }
  });