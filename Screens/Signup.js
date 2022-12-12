import React, { useState } from 'react';
import { db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

export default function Signup(props){
    const [addname, setaddName] = useState('');
    const [addEmail, setaddEmail] = useState('');
    const [addclassNum, setClassNum] = useState('');
    const [addPassword, setaddPassword] = useState('');

    const signup = async() => {
        try {
            const auth = getAuth();
            const result = await createUserWithEmailAndPassword(auth, addEmail, addPassword);
            const addtoDBUser = async () => {
              try {
                  await addDoc(collection(db, "users"),{
                      name: addname,
                      email: addEmail,
                      classNum: addclassNum,
                  });
                  setaddName("")
                  setaddEmail("")
                  setClassNum("")
                  console.log("add!")
              } catch (error) {
                  console.log(error.message)
              }
            }
            addtoDBUser();
            console.log(result);
            alert("Sign up Success!!")
        } catch (error) {
            console.log(error.message)
            alert("Sign up Failed! (check the conditions.)")
        }
        
    }

    return(
        <View style = {styles.container}>
          <View>
            <Text style = {styles.headerText}>Teacher Sign Up!</Text>
          </View>
            <TextInput
                style = {styles.textInput}
                placeholder="Input Name"
                value={addname}
                onChangeText={setaddName}
            ></TextInput>
            <TextInput
                style = {styles.textInput}
                placeholder="Input Class Number"
                value={addclassNum}
                onChangeText={setClassNum}
            ></TextInput>
            <TextInput
                style = {styles.textInput}
                placeholder="Input E-mail"
                value={addEmail}
                onChangeText={setaddEmail}
            ></TextInput>
            <TextInput
                style = {styles.lastInput}
                placeholder="Input Password (Enter at least 6 characters.)"
                value={addPassword}
                onChangeText={setaddPassword}
            ></TextInput>
            <View style={styles.signupButton}>
                <Button 
                title="Sign Up!"
                color= '#2C952C'
                onPress={signup}
                ></Button>
            </View>
            <View style={styles.mainButton}>
              <Button
                title="Go To Main"
                color= '#2C952C'
                onPress={() => props.navigation.navigate("Start")}
                ></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#C4E693',
      paddingHorizontal: 30,
      flex: 1,
    },
    headerText: {
      paddingTop: 20,
      color: "gray",
      marginBottom: 150,
      fontSize: 35,
    },
    textInput: {
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 20,
      height: 40,
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth: 1
    },
    lastInput: {
      marginTop: 20,
      marginBottom: 20,
      paddingHorizontal: 20,
      height: 40,
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth: 1
    },
    signupButton: {
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 20,
      height: 40,
    },
    mainButton: {
      marginTop: 20,
      marginBottom: 45,
      paddingHorizontal: 20,
      height: 40,
    }
  });