import React, {Component} from 'react';
import {FlatList, Image, Linking, StyleSheet, ActivityIndicator, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import {Header, Body, Right, Left, Icon} from 'native-base'
import { Title } from 'react-native-paper';

export default class Main extends Component {
    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: true, search: ''};
        this.arrayholder = [];

      }
      getImage(props) {
        var indexNum = props.indexNum;
        if(parseInt(indexNum, 10)%8 === 0) {
          return <Image style={styles.gridItemImage}source={require('./assets/foods/mainCourses/mainCourse5.jpg')}/>
        } else if(parseInt(indexNum, 10)%4 === 0) {
          return <Image style={styles.gridItemImage}source={require('./assets/foods/appetizers/appetizer4.jpg')}/>
        } else if(parseInt(indexNum, 10)%3 === 0) {
          return <Image style={styles.gridItemImage}source={require('./assets/foods/soups/soup3.jpg')}/>
        } else if(parseInt(indexNum, 10)%7 === 0) {
          return <Image style={styles.gridItemImage}source={require('./assets/foods/mainCourses/mainCourse2.jpg')}/>
        } else if(parseInt(indexNum, 10)%2 === 0) {
          return <Image style={styles.gridItemImage}source={require('./assets/main-course.jpeg')}/>
        } else {
          return <Image style={styles.gridItemImage}source={require('./assets/foods/salads/salad1.jpg')}/>
        }
      }
      componentDidMount() {
            return fetch('http://webknox.com/api/recipes/search?number=10000&apiKey=c9f71a6be7174d85ae404ae2a9cb7e39')
            .then(response => response.json())
            .then(responseJson => {
              this.setState(
                {
                  isLoading: false,
                  dataSource: responseJson.results,
                },
                function() {
                  this.arrayholder = responseJson.results
                }
              );
            })
            .catch(error => {
              console.error(error);
            });
        
      }

      updateSearch = (search) => {
        this.setState({ search });
      };
      search = text => {
        console.log(text);
      };
      clear = () => {
        this.search.clear();
      };
      SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function(item) {
          //applying filter for the inserted text in search bar
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
          const textData = text
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          //setting the filtered newData on datasource
          //After setting the data it will automatically re-render the view
          dataSource: newData,
          search:text,
        });
      }
      ListViewItemSeparator = () => {
        //Item sparator view
        return (
          <View
            style={{
                justifyContent: 'center',
                alignItems: "center",
              height: 1,
              width: '110%',
              backgroundColor: '#080808',
            }}
          />
        );
      };
      render() {
        if (this.state.isLoading) {
          //Loading View while data is loading
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator />
            </View>
          );
        }
        return (
          //ListView to show with textinput used as search bar
          <View style={styles.container}>
                <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                //Item Separator View
                renderItem={({ item, index }) => (
                    // Single Comes here which will be repeatative for the FlatListItems
                    <View style={{ flexDirection: 'row'}}>
                        <View style={styles.leftContainer}>
                        <this.getImage indexNum={index}/>
                        </View>
                        <View style={{flexDirection: 'column', justifyContent: 'center', paddingRight: 110, flexWrap: 'wrap'}}>
                            <View style={styles.rightContainer1}>
                                <TouchableOpacity onPress={() => Linking.openURL(item.sourceUrl)} >
                                <Text style={styles.gridItemText1}>{item.title.toString()}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rightContainer2}>
                                <Text style={styles.gridItemText2}>{item.readyInMinutes} {'mins'}</Text>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                />
          </View>
        );
      }
    }
    

    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor:'#fff',
        paddingBottom: 20,
      },
      leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        paddingRight: 100,
      },
      rightContainer1: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightContainer2: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
        gridItemImage: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100,
            width: 100,
            height: 100,
            borderWidth: 1.5, 
            borderColor: 'white',
            borderRadius: 20,
        },
        gridItemText1: {
            flexDirection: 'row',
            flex: 1,
            fontSize: 20,
            marginTop: 5,
            color: '#bf6b6b',
            paddingRight: 50,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        gridItemText2: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
            color: '#d69b67',
            fontSize: 16,
            marginTop: 5,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
    });