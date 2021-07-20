import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, Paragraph, Text, TouchableOpacity, TextInput, Button, View, StyleSheet, CheckBox, NumberInput } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, FontAwesome, FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import firebase from "firebase"
require("firebase/firestore");

export default class Results extends React.Component {
    
  state = {
    marks: [],
  };

  getData = async () => {
      firebase
      .database()
      .ref('marks/'+g_qpid)
      .once("value", snapshot => {
        var x = snapshot.val();
        let mrks = [], i = 0, y = 0;
        while(true){
          try{
            y = x[i].mark;
            mrks.push({ index: i, mark: x[i].mark, name: x[i].name});
            i++;
          }catch(e){
            this.setState({marks: mrks});
            break;
          }
        }
      });
  }

  async componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior = {'height'} >
        <ScrollView>

        <View style= {styles.marks}>
          <Text style = {{color: 'black', fontSize: 25}}> {g_qpid} </Text>
        </View>

  
        <View style = {styles.rows1}>
            {
              this.state.marks.length > 0 && this.state.marks.map((element) => (
              <View style = {styles.row}>
                <View style = {styles.item1}>
                  <TextInput
                    style = {styles.textInput}
                    value = {element.name}
                    editable={false}
                    style={{ color: this.state.editable ? 'red' : 'black', fontSize: 20, alignItems: "center", padding: 5 }}
                  />
                </View>
                <View style = {styles.item2}>
                  <TextInput
                    style = {styles.textInput}
                    value = {JSON.stringify(element.mark)}
                    editable={false}
                    style={{ color: this.state.editable ? 'red' : 'black', fontSize: 20, alignItems: "center", padding: 5 }}
                  />
                </View>
              </View>
              ))
            }      
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  marks:{
    flex: 1,
    flexDirection : 'row',
    margin: 10,
    padding: 10,
    marginTop: 10,
  },
  marksButton:{
    flex: 1,
  },
  rows1: {
  },
  row: {
    flex: 0.1,
    flexDirection: 'row',
    borderBottomWidth : 1,
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10,
  },
  item1:{
    flex: 8,
    flexDirection: 'row',
    marginLeft: 20,
  },
  item2:{
    flex: 2,
    flexDirection: 'row',
    marginLeft: 20,
  },
  textInput: {
    borderColor: 'black', 
    borderWidth: 3,
    borderRadius: 5,
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 20,
  },

});
