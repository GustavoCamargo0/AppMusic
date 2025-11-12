import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesome, AntDesign } from '@expo/vector-icons';
import Search from './screens/Search';
import Home from './screens/Home';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
         screenOptions={{
        tabBarActiveTintColor: '#353839',
        tabBarInactiveTintColor: 'black',
        headerStyle: { backgroundColor: '#353839' },
        headerTitleStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: '#353839' }
      }}>
        <Tab.Screen name="Home" component={Home} 
           options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={'white'} />
          ),
        }}/>
        <Tab.Screen name="Search" component={Search} 
            options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={'white'} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
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