import React, { useState } from 'react';
import { db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore';
import { View, TextInput, Button, StyleSheet,Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function TestAdd(){
    const [ addTestName, setaddTestName ] = useState('');
    const [ addTestStat, setaddTestStat ] = useState('');
    const [ addTestFirst, setaddTestFirst ] = useState('');
    const [ addTestSecond, setaddTestSecond ] = useState('');
    const [ addTestThird, setaddTestThird ] = useState('');

    // const [selected, setSelected] = useState("");
    
    const addtoDBTest = async () => {
        try {
            await addDoc(collection(db, "testInfo"),{
                addTestName: addTestName,
                addTestStat: addTestStat,
                addTestFirst: addTestFirst,
                addTestSecond: addTestSecond,
                addTestThird: addTestThird,
                createdAt: new Date(),
            });
            alert("Test Added!")
            setaddTestName("")
            setaddTestStat("")
            setaddTestFirst("")
            setaddTestSecond("")
            setaddTestThird("")
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

    const tList = [{
        key: '11',
        value: "Question 1_A"
    }, {
        key: '11',
        value: "Question 1_B"
    },{
        key: '11',
        value: "Question 1_C"
    },{
        key: '5 7/8 miles',
        value: "Question 2_A"
    }, {
        key: '5 7/8 miles',
        value: "Question 2_B"
    },{
        key: '5 7/8 miles',
        value: "Question 2_C"
    },{
        key: '10.8 yards',
        value: "Question 3_A"
    }, {
        key: '10.8 yards',
        value: "Question 3_B"
    },{
        key: '10.8 yards',
        value: "Question 3_C"
    },{
        key: 'Faye',
        value: "Question 4_A"
    },{
        key: 'Faye',
        value: "Question 4_B"
    },{
        key: 'Faye',
        value: "Question 4_C"
    }, {
        key: '6 sections',
        value: "Question 5_A"
    },{
        key: '6 sections',
        value: "Question 5_B"
    },{
        key: '6 sections',
        value: "Question 5_C"
    }, {
        key: '20',
        value: "Question 6_A"
    },{
        key: '20',
        value: "Question 6_B"
    },{
        key: '20',
        value: "Question 6_C"
    }, {
        key: '4 days',
        value: "Question 7_A"
    },{
        key: '4 days',
        value: "Question 7_B"
    },{
        key: '4 days',
        value: "Question 7_C"
    }, {
        key: '15 feet',
        value: "Question 8_A"
    },{
        key: '15 feet',
        value: "Question 8_B"
    },{
        key: '15 feet',
        value: "Question 8_C"
    }];

    return(
        <View style = {styles.background}>
            <TextInput
                style = {styles.textInput}
                placeholder="Test Name"
                value={addTestName}
                onChangeText={setaddTestName}
            ></TextInput>

            <Text>Test State : </Text>
            <SelectList
                data={tStat} 
                save="value"
                onSelect={() => addTestStat}
                setSelected={setaddTestStat}
            >
            </SelectList>

            <Text>Select Test Question : </Text>
            <SelectList
                data={tList} 
                save="key"
                onSelect={() => addTestFirst}
                setSelected={setaddTestFirst}
            ></SelectList>

            <Text>Select Test Question : </Text>
            <SelectList
                data={tList} 
                save="key"
                onSelect={() => addTestSecond}
                setSelected={setaddTestSecond}
            ></SelectList>

            <Text>Select Test Question : </Text>
            <SelectList
                data={tList} 
                save="key"
                onSelect={() => addTestThird}
                setSelected={setaddTestThird}
            ></SelectList>
        
            <Button
                title = "Add Test" onPress={addtoDBTest} color= '#2C952C'
            ></Button>
        </View>
    ); 
}

const styles = StyleSheet.create({
    textInput: {
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1
      },
    background: {
      backgroundColor: '#C4E693',
      paddingHorizontal: 20,
      flex: 1,
    },
});