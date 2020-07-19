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
  const [selectedImage, setSelectedImage] = ''
export default class uploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {uri: ''};
        if(!firebase.apps.length) {
            //firebase initialization
            firebase.initializeApp(FireBase.config);
          }
          
    }


    getImage() {
      firebase.storage().ref().child('Images').getDownloadURL()
      .then(function(url) {
        this.setState({uri: url})
        if(uri === '') {
          console.log(null)
        } else {
          console.log(url)
        }
      }).catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
      
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
      
          case 'storage/canceled':
            // User canceled the upload
            break;
      
      
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      
      });
      
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
        .child('Images')
        .put(blob)
        .then((snapshot) => {
            //You can check the image is now uploaded in the storage bucket
            this.state.uri = pickerResult.uri
            console.log(`${this.state.uri} has been successfully uploaded.`);
        })
        .catch((e) => console.log('uploading image error => ', e));
      }
    }
  
    
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                style={{justifyContent: 'center', alignItems: 'center'}} 
                onPress={() => this.openImagePickerAsync()}>
                  <Text>
                    Hello
                  </Text>
                </TouchableOpacity>
              {/*<Text onPress={() => this.getImage()}>{'\n'}click here</Text>*/}
              <Image source={{uri: this.state.uri}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff'
  }
})