import React, {Component} from 'react';
import {FlatList, Platform, StyleSheet, ActivityIndicator, Text, View, Alert, TextInput } from 'react-native';
import {Header, Right, Left, Icon} from 'native-base'


export default class Main extends Component {
    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: true, search: ''};
        this.arrayholder = [];

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
              height: 0.3,
              width: '90%',
              backgroundColor: '#080808',
            }}
          />
        );
      };
      render() {
        if (this.state.isLoading) {
          //Loading View while data is loading
          return (
            <View style={{ flex: 1, paddingTop: 20 }}>
              <ActivityIndicator />
            </View>
          );
        }
        return (
          //ListView to show with textinput used as search bar
          <View style={styles.container}>
              <Header style={{backgroundColor: '#fff'}}>
                  <Left>
                      <Icon name="search" onPress={() => this.props.navigation.navigate("searchScreen")}/>
                  </Left>
              </Header>
              <FlatList
              data={this.state.dataSource}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              //Item Separator View
              renderItem={({ item }) => (
                // Single Comes here which will be repeatative for the FlatListItems
              <Text style={styles.textStyle}>{item.title} {'\n'} {'ready in'} {item.readyInMinutes} {'mins'}</Text>
              )}
              enableEmptySections={true}
              style={{ marginTop: 10 }}
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
        marginTop: 0
      },
      textStyle: {
        padding: 10,
      },
    });