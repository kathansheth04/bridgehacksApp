import React, {Component} from 'react';
import {View, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';


export default class Search extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 40, marginBottom: 100}}>Dashboard</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MainCourse')}
                        style={{
                        backgroundColor: '#fff',
                        height: 125,
                        width: 125,
                        position: 'relative',
                        borderRadius: 30,
                        marginRight: 50
                    }}>
                    <ImageBackground
                        source={ require('./assets/main-course.jpeg') }
                        style={styles.image}
                    />
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>  Main {'\n'} Course</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Dessert')}
                        style={{
                        backgroundColor: '#fff',
                        height: 125,
                        width: 125,
                        position: 'relative',
                        borderRadius: 30
                    }}>
                    <ImageBackground
                        source={ require('./assets/dessert.jpg') }
                        style={styles.image}
                    />
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>Dessert</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection: 'row', padding: 30}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Appetizer')}
                        style={{
                        backgroundColor: '#fff',
                        height: 125,
                        width: 125,
                        position: 'relative',
                        borderRadius: 30,
                        marginRight: 50
                    }}>
                    <ImageBackground
                        source={ require('./assets/appetizer.jpg') }
                        style={styles.image}
                    />
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>Appetizer</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Salad')}
                        style={{
                        backgroundColor: '#fff',
                        height: 125,
                        width: 125,
                        position: 'relative',
                        borderRadius: 30
                    }}>
                    <ImageBackground
                        source={ require('./assets/salad.jpg') }
                        style={styles.image}
                    />
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>Salad</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 100}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Soup')}
                        style={{
                        backgroundColor: '#fff',
                        height: 125,
                        width: 125,
                        position: 'relative',
                        marginRight: 50
                    }}>
                    <ImageBackground
                        source={ require('./assets/soup.jpg') }
                        style={styles.image}
                    />
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>Soups</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('mainScreen')}
                        
                        style={{
                        backgroundColor: '#fff',
                        height: 125,
                        width: 125,
                        position: 'relative',
                        borderRadius: 30
                    }}>
                    <ImageBackground
                        source={ require('./assets/trending.jpg') }
                        style={styles.image}
                    />
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>Trending</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 30
    },
    image: {
        height: 125,
        width: 125,
        opacity: 0.5,
        position: 'absolute',
    },
    text: { 
        fontSize: 20
    }
})