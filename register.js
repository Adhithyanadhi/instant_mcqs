import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import firebase from "firebase"
require("firebase/firestore");

function signup(user, pass, navigation){
  let data = {
    password : pass
  }; 
  firebase
    .database()
    .ref("student/")
    .child(user)
    .set(data); 
  global.g_username = user;
  navigation.navigate('login');
}

export default function Register(props) {
 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { navigation } = props;

  return (


    <View style={styles.container}>
      <View style={styles.item0}>
        <Text style={styles.text}>Sign Up</Text>
      </View>
    
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.item2}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress = {() => navigation.navigate('login')}
          >
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress = {() => signup(username, password, navigation)}
          >
            <Text style={styles.buttonText}> Sign Up </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  
  item0:{
    marginBottom: 30,
   },

  item2: {
    flexDirection: "row",
  },

  inputView: {
    backgroundColor: "#98fb98",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20, 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },

  buttonContainer: {
    backgroundColor: '#006400',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 15,
    color: '#fff'
  },

});
