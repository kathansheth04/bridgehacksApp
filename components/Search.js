import React, {Component} from 'react';
import {FlatList, Platform, StyleSheet, ActivityIndicator, Text, View, Alert, TextInput } from 'react-native';
import {SearchBar} from 'react-native-elements'

export default class Search extends Component {
    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: true, search: ''};
        this.arrayholder = [];

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
    render() {
        return (
            <View>
                <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    showLoading="True"
                    onClear={text => this.SearchFilterFunction('')}
                    cancelButtonTitle="cancel"
                    placeholder="Type Here..."
                    lightTheme="True"
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    />
            </View>
        )
    }
}