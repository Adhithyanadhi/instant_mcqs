import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, Paragraph, Text, TouchableOpacity, TextInput, Button, View, StyleSheet, CheckBox, NumberInput } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, FontAwesome, FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import firebase from "firebase"
require("firebase/firestore");

var config = {
    apiKey: "AIzaSyBjvajsfo-VZGi36DvescMbhkxOfv4mZcQ",
    authDomain: "examwebapp-54334.firebaseapp.com",
    projectId: "examwebapp-54334",
    storageBucket: "examwebapp-54334.appspot.com",
    messagingSenderId: "230879920394",
    appId: "1:230879920394:web:57885c2adf0155b054faf3",
    measurementId: "G-M6RWK4CHPG"
};

if (!firebase.apps.length) {
   firebase.initializeApp(config);
}else {
   firebase.app();
}


export default class qp extends React.Component {

  state = {
    mcq: [],
    options: [],
  };

  getData = async () => {
    firebase
      .database()
      .ref("qp/")
      .on("value", snapshot => {
        const id = snapshot.val().id;
        this.setState({mcq: id});
      });
  }

  setData = async () => {
    var qpid = "QPID" + (Math.floor(1000 + Math.random() * 9000)).toString();
    let data = {
      qp : this.state.mcq 
    };
    firebase
      .database()
      .ref("qp/")
      .child(qpid)
      .set(this.state.mcq);
    alert("Qp created successfully :)");
    alert("Please note the QP-id for reference");
    alert(qpid);
    alert("Please return to the main menu");
  }


  async componentDidMount() {

    let rp = this.state.options;
    rp.push(
      {label: "", value: 1},
      {label: "", value: 2},
      {label: "", value: 3},
      {label: "", value: 4},
    );
    this.setState({options: rp});

    let textInput = this.state.mcq;
    textInput.push({ index: 0, ques: "", optA: "", optB: "", optC: "", optD: "", ans: ""});
    this.setState({mcq: textInput});

  }

  addTextInput = (index) => {
    let textInput = this.state.mcq;
    textInput.push({ index: index, ques: "", optA: "", optB: "", optC: "", optD: "", ans: "", optA: "", optB: "", optC: "", optD: ""});
    this.setState({mcq: textInput});
  }

  render() {
    return (
        <ScrollView>

      <View style={styles.row0}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress = {() => this.addTextInput(this.state.mcq.length)}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress = {() => this.setData()}
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
      </View>



        <View style = {styles.row1}>
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
                      placeholder = {"  Enter the question here..."}
                      onChangeText={(ques) =>
                        this.setState((state) => {
                          const index = state.mcq.findIndex(
                            (x) => x.index === element.index
                          );
                          return {
                            mcq: [
                              ...state.mcq.slice(0, index),
                              { index: element.index, ques, optA: element.optA, optB: element.optB, optC: element.optC, optD: element.optD, ans: element.ans},
                              ...state.mcq.slice(index + 1),
                           ],
                          };
                        })
                      }
                      value={element.ques}
                      key = {element.index}
                    />
                  </View>
                </View>

               <View style = {styles.element1}>
                  <View style = {styles.radio}>
                    <RadioForm>
                      {
                        this.state.options.map((obj, i) => (
                          <RadioButton key={i} >
                            <RadioButtonInput
                              obj={obj}
                              key = {element.index}
                              isSelected={(this.state.mcq[element.index].ans)-1 === i}
                              onPress={(ans) => {
                                this.setState({value:ans}),
                                this.setState((state) => {
                                  const index = state.mcq.findIndex(
                                    (x) => x.index === element.index
                                  );
                                  return {
                                    mcq: [
                                      ...state.mcq.slice(0, index),
                                      { index: element.index, ques: element.ques, optA: element.optA, optB: element.optB, optC: element.optC, optD: element.optD, ans},
                                      ...state.mcq.slice(index + 1),
                                    ],
                                  };
                                })
                              }}
                              borderWidth={2}
                              buttonInnerColor={'green'}
                              buttonOuterColor={this.state.mcq[element.index].ans-1 === i ? 'green' : '#000'}
                              buttonSize={30}
                              buttonOuterSize={40}
                              buttonStyle={{}}
                              buttonWrapStyle={{marginTop: 5, marginBottom: 5}}
                            />
                          </RadioButton>
                        ))
                      }  
                    </RadioForm>
                  </View>
                
                  <View style = {styles.options}>
                    <View style = {styles.opt}>
                      <View style = {styles.item0}>
                        <TextInput style = {styles.textInput}
                          placeholder = {"  Enter the option A here..."}
                          onChangeText={(optA) =>
                            this.setState((state) => {
                              const index = state.mcq.findIndex(
                                (x) => x.index === element.index
                              );
                              return {
                                mcq: [
                                  ...state.mcq.slice(0, index),
                                  { index: element.index, ques: element.ques, optA, optB: element.optB, optC: element.optC, optD: element.optD, ans: element.ans},
                                  ...state.mcq.slice(index + 1),
                               ],
                              };
                            })
                          }
                          value={element.optA}
                          key = {element.index}
                        />
                      </View>
                    </View>

                    <View style = {styles.opt}>
                      <View style = {styles.item0}>
                        <TextInput style = {styles.textInput}
                          placeholder = {"  Enter the option B here..."}
                          onChangeText={(optB) =>
                            this.setState((state) => {
                              const index = state.mcq.findIndex(
                                (x) => x.index === element.index
                              );
                              return {
                                mcq: [
                                  ...state.mcq.slice(0, index),
                                  { index: element.index, ques: element.ques, optA: element.optA, optB, optC: element.optC, optD: element.optD, ans: element.ans},
                                  ...state.mcq.slice(index + 1),
                               ],
                              };
                            })
                          }
                          value={element.optB}
                          key = {element.index}
                        />
                      </View>
                    </View>

                    <View style = {styles.opt}>
                      <View style = {styles.item0}>
                        <TextInput style = {styles.textInput}
                          placeholder = {"  Enter the option C here..."}
                          onChangeText={(optC) =>
                            this.setState((state) => {
                              const index = state.mcq.findIndex(
                                (x) => x.index === element.index
                              );
                              return {
                                mcq: [
                                  ...state.mcq.slice(0, index),
                                  { index: element.index, ques: element.ques, optA: element.optA, optB: element.optB, optC, optD: element.optD, ans: element.ans},
                                  ...state.mcq.slice(index + 1),
                               ],
                              };
                            })
                          }
                          value={element.optC}
                          key = {element.index}
                        />
                      </View>
                    </View>

                    <View style = {styles.opt}>
                      <View style = {styles.item0}>
                        <TextInput style = {styles.textInput}
                          placeholder = {"  Enter the option D here..."}
                          onChangeText={(optD) =>
                            this.setState((state) => {
                              const index = state.mcq.findIndex(
                                (x) => x.index === element.index
                              );
                              return {
                                mcq: [
                                  ...state.mcq.slice(0, index),
                                  { index: element.index, ques: element.ques, optA: element.optA, optB: element.optB, optC: element.optC, optD, ans: element.ans},
                                  ...state.mcq.slice(index + 1),
                               ],
                              };
                            })
                          }
                          value={element.optD}
                          key = {element.index}
                        />
                      </View>
                    </View>
              
                  </View> 
                </View> 
              </View>  
              ))
            }      
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    fontSize: 20,
    backgroundColor: '#f8f8f8',
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
    borderColor: 'black', 
    borderWidth: 2,
    borderRadius: 5,
    height: 'auto',
    width: 'auto',
    margin: 7,
    padding: 5,
    fontSize: 20,
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
