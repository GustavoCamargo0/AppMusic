import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function Search({ navigation }) {
  const [pesquisa, setPesquisa] = useState('');
  const [tracks, setTracks] = useState([]);
  const [sound, setSound] = useState(null);
  const [playingTrackId, setPlayingTrackId] = useState(null);

  const playSound = async (previewUrl, trackId) => {
    try {

      if (sound) {
        await sound.unloadAsync();
      }

      if (playingTrackId === trackId) {
        setPlayingTrackId(null);
        setSound(null);
        return;
      }


      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: previewUrl },
        { shouldPlay: true }
      );
      
      setSound(newSound);
      setPlayingTrackId(trackId);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlayingTrackId(null);
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

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

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
            <TouchableOpacity 
              style={{ margin: 5, height: 80, width: 300, color: 'white' }}
              onPress={() => playSound(item.preview, item.id)}
            >
              <View style={styles.row}>
                <Image
                  source={{ uri: item.album.cover }}
                  style={{ height: 50, width: 50, margin: 7 }}
                />
                <View style={styles.collum}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.text}>{item.artist.name}</Text>
                  <Text style={[styles.text, { color: playingTrackId === item.id ? '#4CAF50' : 'white' }]}>
                    {playingTrackId === item.id ? 'Tocando...' : 'Toque para ouvir'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414A4C',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    padding: 2,
    backgroundColor: '#F5F5F5',
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