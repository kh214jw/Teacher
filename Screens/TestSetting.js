import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';

export default function TestSetting(props) {
    const {params} = props.route
    const testName = params? params.addTestName:null;

    const [testInfo, setTestInfo] = useState();
    const [id, setID] = useState('');

    const [ addTestStat, setaddTestStat ] = useState('');
    
    const readfromDBTest = async() => {
        try {
            const data = await getDocs(collection(db, "testInfo"))
            let selectedTestName = {}
            data.docs.map((doc) =>{
                if(doc.data().addTestName === testName ){
                    selectedTestName = { ...doc.data(), id: doc.id }
                    setTestInfo(selectedTestName)
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const tStat = [{
        key: '1',
        value: 'false',
    }, {
        key: '2',
        value: 'true',
    }];

    const updatefromDBTest = async() => {
        try {
            const docRefd = doc(db, "testInfo", id);
            // if(await updateDoc(docRefd, {
            //     addTestStat: addTestStat
            // })) {
            
            if(await updateDoc(docRefd, {
                addTestStat: addTestStat
            })){
                readfromDBTest()
                await updateDoc(testInfo, {
                    addTestStat: 'false'
                });
            }
            alert("Test Info Updataed!")
            readfromDBTest()
        } catch (error) {
            console.log(error.message)
        }
    }

    const deletefromDBTest = async() => {
        try {
            const docRef = doc(db, "testInfo", id);
            await deleteDoc(docRef);
            alert("Test Info Deletaed!")
            readfromDBTest()
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{ readfromDBTest() }, [] )

    return(
        <View style = {styles.background}>
           {testInfo?
                <View>
                    <Text>Test ID : {testInfo.id}</Text>
                    <Text>Test Name: {testInfo.addTestName}</Text>
                    <Text>Test State: {testInfo.addTestStat}</Text>
                    <Text>Test Question 1: {testInfo.addTestFirst}</Text>
                    <Text>Test Question 2: {testInfo.addTestSecond}</Text>
                    <Text>Test Question 3: {testInfo.addTestThird}</Text>
                </View>
            :null} 
            <View>
                <TextInput
                    style = {styles.textInput}
                    placeholder="Input Test ID"
                    value={id}
                    onChangeText={setID}
                ></TextInput>
                
                <Text>Test State : </Text>
                <SelectList
                    data={tStat} 
                    save="value"
                    onSelect={() => addTestStat}
                    setSelected={setaddTestStat}
                ></SelectList>
            </View>
            
            <View>
                <Button
                    title = "Update Test State" onPress={updatefromDBTest} color= '#2C952C'
                ></Button>
            </View>

            <View>
                <Button
                    title = "Delete Test" onPress={deletefromDBTest} color= '#2C952C'
                ></Button>
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