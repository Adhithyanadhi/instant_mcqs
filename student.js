import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, Paragraph, Text, TouchableOpacity, TextInput, Button, View, StyleSheet, CheckBox, NumberInput } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, FontAwesome, FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import firebase from "firebase"
require("firebase/firestore");

export default class App extends React.Component {
    
  state = {
    mcq: [],
  };

  getData = async () => {
    firebase
      .database()
      .ref(`qp/${g_qpid}`)
      .on("value", snapshot => {
        var qp = snapshot.val();
        var i = 0;
        let textInput = [];
        
        while(true){
          try{
            let opt = [];
            opt.push({label: qp[i].optA, value: 1},{label: qp[i].optB, value: 2},{label: qp[i].optC, value: 3},{label: qp[i].optD, value: 4} );
            textInput.push({ index: i, ques: qp[i].ques, ans: qp[i].ans, ansd: 0, options: opt});
            i++;
          }catch(e){
            this.setState({mcq: textInput});
            break;
          }
        }

      });
  }

  async calc(){
    var total = 0;
    this.state.mcq.forEach(element => {
      if(element.ans == element.ansd) total++;
    });
    alert("You scored " + total);
    await this.setMark(total);
  }


  setMark = async (total) => {
    let data = [];
    let i = 0;
    let fb = await firebase
      .database()
      .ref(`marks/${g_qpid}`)
      .once("value", snapshot => {
        var mark = snapshot.val();
        while(true){
          try{
            var y = mark[i].mark;
            data.push(mark[i]);
            i++;
          }catch(e){
            break;
          }
        }
      });
    let x = {
      name : g_username,    
      mark : total
    };
    data.push(x);

    fb = await firebase
      .database()
      .ref("marks/")
      .child(g_qpid)
      .set(data); 
    alert("Successfully submitted, Go back to Main menu");
  }


  async componentDidMount() {
    await this.getData();
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior = {'height'} >
        <ScrollView>

        <View style= {styles.name}>
          <Text style = {styles.gname}>{"Name : "} {g_username} </Text>
        </View>

        <View style= {styles.button}>
          <Button style= {styles.submitButton} color="green" title="Submit"  onPress = {() => this.calc()} />
        </View>
  
        <View style = {styles.rows1}>
            {
              this.state.mcq.length > 0 && this.state.mcq.map((element) => (

              <View style = {styles.elements}>
                <View style = {styles.element0}>
                  <View style = {styles.index}>          
                    <Text style = {styles.text}>
                      {element.index + 1}
                    </Text>
                  </View>
                  <View style = {styles.ques}>
                    <TextInput style = {styles.textInput}
                      value={element.ques}
                      key = {element.index}
                      editable={false}
                      style={{ color: this.state.editable ? 'red' : 'black', fontSize: 20, alignItems: "center", padding: 5 }}
                    />
                  </View>
                </View>

                <View style = {styles.element1}>
                  <View style = {styles.radio}>
                    <RadioForm>
                      {
                        element.options.map((obj, i) => (
                          <RadioButton key={i} >
                            <RadioButtonInput
                              obj={obj}
                              radio_props={element.options}
                              key = {element.index}
                              onPress={(ansd) => {
                                this.setState({value:ansd}),
                                this.setState((state) => {
                                  const index = state.mcq.findIndex(
                                    (x) => x.index === element.index
                                  );
                                  return {
                                    mcq: [
                                      ...state.mcq.slice(0, index),
                                      { index: element.index, ques: element.ques, ans: element.ans, ansd, options: element.options},
                                      ...state.mcq.slice(index + 1),
                                    ],
                                  };
                                })
                              }}
                              isSelected={(this.state.mcq[element.index].ansd)-1 === i}
                              borderWidth={2}
                              buttonInnerColor={'green'}
                              buttonOuterColor={this.state.mcq[element.index].ansd-1 === i ? 'green' : '#000'}
                              buttonSize={30}
                              buttonOuterSize={40}
                              buttonStyle={{}}
                              buttonWrapStyle={{marginTop: 5, marginBottom: 5}}
                            />

                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              labelHorizontal={true}
                              labelStyle={{fontSize: 20, color: 'black'}}
                              labelWrapStyle={{}}
                            />

                          </RadioButton>
                        ))
                      }  
                    </RadioForm>
                  </View>
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
  container: {
    margin: 20,
    backgroundColor: '#f8f8f8',
  },
  name: {
    fontSize: 20,
    margin: 20,
  },
  gname: {
    fontSize: 20,
    color: 'blue',
  },
  button: {
    margin: 15,
  },
  row0: {
    flexDirection: 'row',
  },
  row1: {
    flexDirection: 'column',
  },
  elements: {
    flexDirection: 'column',
    backgroundColor: '#d0d0d0',
    margin: 10,
    borderColor: '#d0d0d0',
    borderBottomColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
},
  element0: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    height: 'auto',
    width: 'auto',
    padding: 10,
    fontSize: 20,
  },
  textInput: {
    height: 'auto',
    width: 'auto',
    margin: 7,
    padding: 5,
    fontSize: 30,
  },
  index: {
    flex: 1,
    fontSize: 15,
    alignItems: 'center',
  },
  ques: {
    flex: 9,
    fontSize: 15,
  },
  element1: {
    flex: 1,
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radio: {
    flex: 1,
    padding: 10,
  },
  options: {
    flex: 9,
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#101010',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
