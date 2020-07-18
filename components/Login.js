import React, {Component} from 'react';
import {Button, 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  TextInput, 
  KeyboardAvoidingView,
Dimensions} from 'react-native';
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
              this.props.navig.navigate("")
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
                    <Text style={styles.TextHeaders}>Login</Text>
                  </KeyboardAvoidingView>
                  <TextInput 
                    style={styles.Email}
                    onChangeText={email => this.setState({ email })}
                    placeholder = "Email"
                    placeholderTextColor="#BBE1FA"
                    autoCapitalize='none'
                  />
                  <TextInput style={styles.password}
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                    placeholder = "Password" 
                    autoCapitalize='none'
                    placeholderTextColor="#BBE1FA"
                  />
        
                  <TouchableOpacity style={styles.Login}  onPress={()=> {this.loginAction()}}>
                    <Text style={{fontSize: 24, color: "#BBE1FA"}}>Login</Text>
                  </TouchableOpacity>
                  </KeyboardAvoidingView>
                  <KeyboardAvoidingView style={styles.BottomView}>
                            <TouchableOpacity
                                style={styles.createAccount}
                                onPress={()=> {this.props.navigation.navigate("registerScreen")}}
                                >
                                <Text style={{color: '#BBE1FA'}}>Don't have an account? Sign Up!</Text>
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
    backgroundColor: '#1B262C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextHeaders: {
    backgroundColor: '#1B262C', 
    color: '#BBE1FA',
    fontSize: 60
},
  Email: {
    backgroundColor: '#1B262C',
    paddingLeft: width * 0.08,
    borderWidth: 1,
    borderRadius: 35,
    height: height * 0.065, 
    width: width * 0.9, 
    marginTop: height * 0.023
  },
  password: {
    backgroundColor: '#1B262C',
    paddingLeft: width * 0.08,
    borderWidth: 1,
    borderRadius: 35,
    height: height * 0.065, 
    width: width * 0.9, 
    marginTop: height * 0.023
  },
  Login: {
    alignItems: "center",
    backgroundColor: "#2c2f33",
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
  createAccount: {
    marginBottom: height * 0.04
  }
});
  