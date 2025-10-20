import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image } from 'react-native';

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
  }, [query]);

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
          <View style={styles.trackItem}>
            <Image source={{ uri: item.album.cover_small }} style={styles.cover} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.trackTitle}>{item.title}</Text>
              <Text style={styles.artistName}>{item.artist.name}</Text>
              <Text style={styles.albumName}>{item.album.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  trackItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cover: {
    width: 50,
    height: 50,
  },
  trackTitle: { fontSize: 16, fontWeight: 'bold' },
  artistName: { color: 'gray' },
  albumName: { color: 'darkgray' },
});