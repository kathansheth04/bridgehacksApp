import * as React from 'react';
import { StyleSheet, Image, View, Dimensions, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { ListItem, CardItem } from 'native-base';
import * as firebase from "firebase"
import FireBase from './config/FireBase';
const data = [];
var name = 'Tester';
export default class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      image: null,
      name: 'Tester',
      showMessage: false,
      button: false
    });
    this.handleClick = this.handleClick.bind(this)
    if (!firebase.apps.length) {
      //firebase initialization
      firebase.initializeApp(FireBase.config);
    }
  }

  _changeColorUp() {
    var Color1 = '#bf6b6b'
    var Color2 = '#000'
    this.setState({
      color1: Color1,
      color2: Color2
    })
  }
  handleClick(){
    this.setState({
      button:!this.state.button
    })
    if(this.state.button === true) {
      this.setState({
        color1: '#bf6b6b',
        color2: '#000'
      })
    } else {
      this.setState({
        color2: '#d69b67',
        color1: '#000'
      })
    }
  }
  
  _showMessage = (bool) => {
    this.setState({
      showMessage: bool
    });
  }

  render() {
    let { image } = this.state;
    
    return (
      <View style={styles.container}>
        <Ionicons name="ios-add-circle" onPress={this._showMessage.bind(null, true)} style={styles.button} size={60} color='#d69b67'/>
        <Ionicons name="ios-camera" onPress={() => this._pickImage()} style={{...styles.button, marginBottom: 135}} size={60} color='#d69b67'/>
        {this.state.showMessage && (
          <View style={styles.card1}>       
          <ListItem style={styles.ListItem}>         
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 150 }} />}  
          </ListItem>
          <ListItem style={styles.ListItem}>
            <Text style={{marginTop: 15}}>Recipe by {this.state.name}</Text>
            <Foundation name="arrow-up" size={20}  onPress={this.handleClick} color={this.state.color2} style={{marginTop: 15, marginLeft: 100}}/>
            <Foundation name="arrow-down" size={20} onPress={this.handleClick} color={this.state.color1} style={{marginTop: 15, marginLeft: 50}}/>
          </ListItem>
          </View>
        )}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}
const {
  height,
  width
} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start', 
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#fff'
    },
    button: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      flex: 1,
      justifyContent: 'flex-end', 
      alignItems: 'flex-end', 
      padding: 50,
      marginBottom: 50
    
    },
    text: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    card1: {
      marginTop: 50,
      flexDirection: 'column',
      borderRadius: 20, 
      elevation: 3, 
      height: height * 0.28,
      width: width * 0.85,
      backgroundColor: '#fff',
      shadowOffset: {wdith: 3, height: 1},
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ListItem: {
      width: width * 0.7,
      alignItems: 'center',
      marginTop: -20,
      marginLeft: width * 0.00005
    }
})
