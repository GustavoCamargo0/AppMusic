import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

export default function Search() {
  const [pesquisa, setPesquisa] = useState('')
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (pesquisa.length > 2) {
      fetch(`https://api.deezer.com/search/track?q=${pesquisa}`)
        .then(res => res.json())
        .then(data => {
          setTracks(data.data)
        })
    } else {
      setTracks([])
    }
  }, [pesquisa])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Music</Text>
      <TextInput
        style={styles.input}
        placeholder='Pesquisar música...'
        value={pesquisa}
        onChangeText={setPesquisa}
        keyboardType='default'
      />

      <FlatList
        data={tracks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderWidth: 1, margin: 5, borderColor: 'black', height: 80, width: 300, textAlign: 'center', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: 'black',
  }
});
