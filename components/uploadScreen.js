import React, {Component} from 'react';
import {Button, Image, StyleSheet, Text, View, Alert, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import * as firebase from "firebase"
import FireBase from './config/FireBase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
export default class uploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {uri: ''};
        if(!firebase.apps.length) {
            //firebase initialization
            firebase.initializeApp(FireBase.config);
          }
          
    }    

    openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);
      const response = await fetch(pickerResult.uri);
      const blob = await response.blob();
      if(selectedImage !== null) {
        firebase
        .storage()
        .ref()
        .child("Images")
        .put(blob)
        .then((snapshot) => {
            //You can check the image is now uploaded in the storage bucket
            console.log(`${this.state.localUri} has been successfully uploaded.`);
        })
        .catch((e) => console.log('uploading image error => ', e));
      }
    }
  
    
    
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity 
                style={{justifyContent: 'center', alignItems: 'center'}} 
                onPress={() => this.openImagePickerAsync()}>
                  <Text>
                    Hello
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>World</Text>
                </TouchableOpacity>
            </View>
        )
    }
}