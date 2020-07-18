import React, {Component} from 'react';
import {Button, 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  TextInput, 
  KeyboardAvoidingView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase'
import FireBase from './config/FireBase';

export default class Login extends Component {
    constructor(props){
        super(props) 
        this.state = ({
            email: '',
            password: '',
            isLoadingComplete: false
          })
        }
        componentDidMount() { 
            if(!firebase.apps.length) {
              //initialize firebase
            firebase.initializeApp(FireBase.config);
            }
          }

        loginAction = () => {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                console.log("user signed in!");
            }).catch(error => {
                if(error.code === 'auth/email-already-in-use') {
                    Alert.alert("This email already exists");
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('This email address is invalid');
                  }
            })
        }
        render() {
            return(
                <KeyboardAvoidingView style={styles.container}>
                <KeyboardAvoidingView 
                style={styles.container}
                behavior='padding'>
                  <KeyboardAvoidingView
                    style={styles.Logo}
                    behavior="padding"
                    keyboardVerticalOffset={
                        Platform.select({
                        ios: () => 0,
                        android: () => height * -0.48
                        })()
                    }
                  >
                    
                  </KeyboardAvoidingView>
                  <TextInput 
                    style={styles.Email}
                    onChangeText={email => this.setState({ email })}
                    placeholder = "Email"
                    placeholderTextColor="#505050"
                    autoCapitalize='none'
                  />
                  <TextInput style={styles.password}
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                    placeholder = "Password" 
                    autoCapitalize='none'
                    placeholderTextColor="#505050"
                  />
        
                  <TouchableOpacity style={styles.Login}  onPress={()=> {this.loginAction()}}>
                    <Text style={{fontSize: 24, color: "#fff"}}>Login</Text>
                  </TouchableOpacity>
                  </KeyboardAvoidingView>
                  <KeyboardAvoidingView style={styles.BottomView}>
                            <TouchableOpacity
                                style={styles.createAccount}
                                onPress={()=> {this.props.navigation.navigate("registerScreen")}}
                                >
                                <Text>Don't have an account? Sign Up!</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </KeyboardAvoidingView> 
                )
            }

}
  