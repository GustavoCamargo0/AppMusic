import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image } from 'react-native';

export default function MusicSearch() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      fetch(`https://api.deezer.com/search/track?q=${query}`)
        .then(res => res.json())
        .then(data => {
          setTracks(data.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setTracks([]);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar músicas..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      {loading && <Text>Carregando...</Text>}

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
}

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
