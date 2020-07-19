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
import logo from './assets/logo.png'

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
                    <Image style={{height: 225, width: 225}} source={logo}></Image>
                  </KeyboardAvoidingView>
                  <TextInput 
                    style={styles.Email}
                    onChangeText={email => this.setState({ email })}
                    placeholder = "Email"
                    placeholderTextColor="#2c2f33"
                    autoCapitalize='none'
                  />
                  <TextInput style={styles.password}
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                    placeholder = "Password" 
                    autoCapitalize='none'
                    placeholderTextColor="#2c2f33"
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
                                <Text style={{color: '#d69b67'}}>Don't have an account? Sign Up!</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextHeaders: {
    color: '#d69b67',
    fontSize: 60,
    paddingBottom: 100
},
  Email: {
    backgroundColor: '#fff',
    paddingLeft: width * 0.08,
    borderWidth: 1,
    borderRadius: 35,
    height: height * 0.065, 
    width: width * 0.9, 
    marginTop: height * 0.023
  },
  password: {
    backgroundColor: '#fff',
    paddingLeft: width * 0.08,
    borderWidth: 1,
    borderRadius: 35,
    height: height * 0.065, 
    width: width * 0.9, 
    marginTop: height * 0.023
  },
  Login: {
    alignItems: "center",
    backgroundColor: "#bf6b6b",
    padding: height * 0.016,
    borderRadius: 60,
    width: width * 0.9,
    marginTop: height * 0.023,
    marginBottom: height * 0.2
  },
  BottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: height * 0.064
  },
  createAccount: {
    marginBottom: height * 0.04,
  }
});
  