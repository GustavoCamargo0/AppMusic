import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Search from './Search';


export default function App() {
  return (
      <Search />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pesquisa: {
    height: 60,
  },
  input: {
    backgroundColor: 'gray',
    padding: 5,
    flex: 1,
  }
});
