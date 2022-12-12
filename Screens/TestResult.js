import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function TestResult(props) {
    const {params} = props.route
    const testName = params? params.addTestName:null;
    const studentName = params? params.studentName:null

    const [testAnswer, setTestAnswer] = useState();

    const readfromDBTestAnswer = async() => {
        try {
            const data = await getDocs(collection(db, "testResult"))
            let selectedTestName = {}
            data.docs.map((doc) =>{
                if(doc.data().addTestName === testName,  doc.data().StudentName === studentName){
                    selectedTestName = { ...doc.data(), id: doc.id }
                    setTestAnswer(selectedTestName)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [ question1, setQuestion1] = useState('');
    const [ question2, setQuestion2] = useState('');
    const [ question3, setQuestion3] = useState('');

    const addtoDBRequest = async() => {
        try {
            const data = await getDocs(collection(db, "testResult"))
            data.docs.map((doc) =>{
                if(doc.data().StudentName === studentName ){

                    addDoc(collection(db, "testReqest"), {
                        testName: testName,
                        studentName: studentName,
                        answer1: question1,
                        answer2: question2,
                        answer3: question3,
                    });
                }
            })
            alert("Request Send!!")
            setQuestion1("")
            setQuestion2("")
            setQuestion3("")
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{ readfromDBTestAnswer() }, [] )

    return(
        <View style = {styles.background}>
           {testAnswer?
                <View>
                    <Text>Test Name: {testAnswer.addTestName}</Text>
                    <Text>Student Name: {testAnswer.StudentName}</Text>
                    <Text>Test Question 1: {testAnswer.addTestFirst}</Text>
                    <Text>Test Question 2: {testAnswer.addTestSecond}</Text>
                    <Text>Test Question 3: {testAnswer.addTestThird}</Text>
                </View>
            :null} 

            <View>
                <TextInput
                    style = {styles.textInput}
                    placeholder="Input Question1 Answer"
                    value={question1}
                    onChangeText={setQuestion1}
                ></TextInput>
                <TextInput
                    style = {styles.textInput}
                    placeholder="Input Question2 Answer"
                    value={question2}
                    onChangeText={setQuestion2}
                ></TextInput>
                <TextInput
                    style = {styles.textInput}
                    placeholder="Input Question3 Answer"
                    value={question3}
                    onChangeText={setQuestion3}
                ></TextInput>
                <Button title = "Request Answer" color= '#2C952C' onPress={addtoDBRequest}></Button>
            </View>
        </View>     
    );
}

const styles = StyleSheet.create({
    background: {
      backgroundColor: '#C4E693',
      paddingHorizontal: 20,
      flex: 1,
    },
    textInput: {
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1
      },
});