import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

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
  }, [pesquisa]);

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
            <View style={{ borderWidth: 1, margin: 5, borderColor: 'black', height: 80, width: 300, color: 'white' }}>
              <View style={styles.row}>
                <Image
                  source={{ uri: item.album.cover }}
                  style={{ height: 50, width: 50, margin: 7 }}
                />
                <View style={styles.collum}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.text}>{item.artist.name}</Text>
                </View>
              </View>
            </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    padding: 2,
    backgroundColor: 'gray',
    margin: 20,
    borderRadius: 5,
  
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    color: 'white',
  },
  row: {
    flexDirection: 'row'
  },
  collum: {
    flexDirection: 'column'
  }
});