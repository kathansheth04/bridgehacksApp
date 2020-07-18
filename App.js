import { StatusBar } from 'expo-status-bar';
import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://webknox.com:8080/recipes/search?query=tomato soup&apiKey=c9f71a6be7174d85ae404ae2a9cb7e39')
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
          <Text>{item.title}, {item.readyInMinutes}, {item.sourceUrl}</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
