import React, {Component} from 'react';
import {Button, Image, StyleSheet, KeyboardAvoidingView, Text, View, Alert, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from "firebase"
import FireBase from './config/FireBase';

export default class Main extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello World</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})