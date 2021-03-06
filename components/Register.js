import React, {Component} from 'react';
import {Button, Image, StyleSheet, KeyboardAvoidingView, Text, View, Alert, TextInput, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from "firebase"
import FireBase from './config/FireBase';
import logo from './assets/logo.png'

export default class Register extends Component {
    constructor(props){
        super(props) 
        //parameters required for user registeration
        this.state = ({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          })
          //initialize firebase
        if(!firebase.apps.length) {
            firebase.initializeApp(FireBase.config);
        }
    }

    signupUser = (Name) => {
        if(this.state.password.length < 7) {
                 Alert.alert("Please enter at least 7 characters");
                 return;
             } else if(this.state.password.toString() != this.state.confirmPassword.toString()) {
                 Alert.alert("Passwords do not match. Please try again");
                 return;
             } else if(this.state.name.toString() == '' || this.state.email.toString() == '' || this.state.password.toString() == '' || this.state.confirmPassword.toString() == ''){
                 Alert.alert("Please fill in all missing values");
                 return;
             }
             firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                 //username will be added in the firebase database
                 .then(() => firebase.database().ref('Users/' + firebase.auth().currentUser.uid).child("Name: ").set({
                     name : Name
                 }))
                 .then(() => this.props.navigation.navigate("mainScreen"))
                 .catch(error => {
                    console.log("error");
                    Alert.alert("Cannot Register user at the moment. Try again later.");
                 })
    }

    render(){
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
            >

                <KeyboardAvoidingView
                    style={{marginTop: 10}}
                    behavior="padding"
                >
                    <Image style={{marginTop: -height*0.1}}source={logo}></Image>
                </KeyboardAvoidingView>

                <TextInput style={styles.TextInput} 
                    onChangeText={name => this.setState({name})}
                    placeholder="Name"
                    placeholderTextColor="#2c2f33"
                />
                <TextInput style={styles.TextInput} 
                    onChangeText={email => this.setState({ email })}
                    placeholder="Email" 
                    placeholderTextColor="#2c2f33"
                    autoCapitalize='none'
                />
                <TextInput style={styles.TextInput} 
                    onChangeText={password => this.setState({ password })}
                    placeholder="Password" 
                    placeholderTextColor="#2c2f33"
                    secureTextEntry={true}
                    autoCapitalize='none'
                />

                <TextInput style={styles.TextInput} 
                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                    placeholder="Confirm Password" 
                    placeholderTextColor="#2c2f33"
                    secureTextEntry={true}
                    autoCapitalize='none'
                />

                <TouchableOpacity style={styles.Login} onPress={()=> {this.signupUser(this.state.name)}}>
                    <Text style={{fontSize: 24, color: "#fff"}}>Sign up</Text>
                </TouchableOpacity>
                <KeyboardAvoidingView
                    style={styles.BottomView}
                    keyboardVerticalOffset={
                        Platform.select({
                        ios: () => 0,
                        android: () => height * -0.48
                        })()
                    }
                >
                    <TouchableOpacity
                        style={styles.createAccount}
                        onPress={()=> {this.props.navigation.navigate("loginScreen")}}
                        >
                        <Text style={{color: '#d69b67'}}>Already have an account? Sign in</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </KeyboardAvoidingView>
            )
        }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextInput: {
        backgroundColor: '#ffffff',
        paddingLeft: width * 0.08,
        borderWidth: 1,
        borderRadius: 35,
        height: height * 0.065, 
        width: width * 0.9, 
        marginTop: height * 0.023
    },
    goToLogin: {
        flex: 1,
        alignContent: 'flex-end',
        left: 0,
      },
    Login: {
        alignItems: "center",
        backgroundColor: "#bf6b6b",
        padding: height * 0.016,
        borderRadius: 60,
        width: width * 0.9,
        marginTop: height * 0.023
    },
    BottomView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.064
      },
      
});
