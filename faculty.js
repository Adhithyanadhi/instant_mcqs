import React from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';


function setqpid(qpid){
  global.g_qpid = qpid;
}

function Faculty(props) {
  const { navigation } = props;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.qp}>
          <View style={styles.itm2}>
            <Text style={styles.text}>Create QP</Text>
          </View>

          <View style={styles.itm3}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('qp')}
            >
            <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={styles.hr}
        />

        <View style={styles.result}>
          <View style={styles.item0}>
            <Text style={styles.text}>View Results</Text>
          </View>

          <View style={styles.item1}>
            <View style={styles.itm0}>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter QPID"
                placeholderTextColor="#101010"
                onChangeText={(qpid) => setqpid(qpid)}
              />
            </View>
            <View style={styles.itm1}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('results')}
              >
              <Text style={styles.buttonText}> Go </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: '#ebebeb'
  },
  box: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 5,
    marginTop: 100,
    marginBottom: 200,
    marginLeft: 30,
    marginRight: 30,
  },
  qp: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  hr: {
    margin: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  result: {
    flex: 3,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  item0: {
    flex: 1,
    marginBottom: 20,
  },
  item1: {
    flex: 4,
    flexDirection: "row",
    margin: 20,
  },
  itm0: {
    flex: 3,
    backgroundColor: "#98fb98",
    borderRadius: 30,
    width: "auto",
    height: 45,
    alignItems: "center",
  },
  itm1: {
    flex: 2,
  },
  itm2: {
    flex: 3,
    marginLeft: 50,
  },
  itm3: {
    flex: 2,
    marginLeft: -20,
    marginRight: 20,
  },
  text: {
    color: '#101010',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: '#006400',
    borderRadius: 5,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 5,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    color: "black",
  },
});

export default Faculty;