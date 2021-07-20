import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Home(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Instant MCQs</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('faculty')}
      >
        <Text style={styles.buttonText}>Faculty</Text>
      </TouchableOpacity>
 
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('register')}
      >
        <Text style={styles.buttonText}>Student Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.buttonText}>Student Login</Text>
      </TouchableOpacity>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    width: "70%",
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

export default Home;