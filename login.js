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

function signin(user, pass, qpid, navigation){
      firebase
      .database()
      .ref(`student/${user}`)
      .on("value", snapshot => {
        try{
          var x = snapshot.val().password;
          if(x === pass){
            global.g_username = user;
            global.g_qpid = qpid;
            navigation.navigate('student');
          }else{
            alert("in correct password");
          }
        }catch(e){
          alert("Unknown user name");
        }
      });
}


export default function Login(props) {
 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [qpid, setqpid] = useState("");

  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.item0}>
        <Text style={styles.text}>Login</Text>
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

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="QPID"
          placeholderTextColor="#003f5c"
          onChangeText={(qpid) => setqpid(qpid)}
        />
      </View>

      <View style={styles.item2}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress = {() => navigation.navigate('register')}
          >
            <Text style={styles.buttonText}>Go to Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress = {() => signin(username, password, qpid, navigation)}
          >
            <Text style={styles.buttonText}>Login</Text>
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