import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.container}>Home</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

