import React, { useState, useEffect } from "react";
import { SafeAreaView, View, 
    FlatList, StyleSheet, 
    Text, StatusBar, 
    TouchableOpacity } from "react-native";
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { SelectList } from 'react-native-dropdown-select-list';

export default function StudentsInfo(props){

    const {params} = props.route
    const studentName = params? params.studentName:null;

    const [studentInformation, setstudentInformation] = useState();
    const readfromDBInformation = async() => {
        try {
            const data = await getDocs(collection(db, "students"))
            let selectedStudent = {}
            data.docs.map((doc) =>{
                if(doc.data().name === studentName ){
                    selectedStudent = { ...doc.data(), id: doc.id }
                    setstudentInformation(selectedStudent)
                }
            })
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const [selectedId, setSelectedId] = useState(null);

    //DB의 testInfo의 addTestName을 불러온다.
    const Item = ({ item, backgroundColor, textColor }) => (
        <TouchableOpacity 
          onPress={ () => props.navigation.navigate("TestResult", {
              addTestName : item.addTestName,
              studentName : studentName
          }) }
          style={[styles.item, backgroundColor]}>
          <Text style={[styles.title, textColor]}>{item.addTestName}</Text>
        </TouchableOpacity>
      );
    
      //DB에서 블러온 리스트에 대한 콜백 함수
      const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#74C600" : "#ABDC65";
        const color = item.id === selectedId ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
        );
      };

    const [ testName, settestName ] = useState();
    const readfromDBtestName = async() => {
      try {
          const testData = await getDocs(collection(db, "testInfo"))
          settestName(testData.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      } catch (error) {
        console.log(error.message)
      }
    }
    

    useEffect(()=>{ readfromDBInformation() }, [] )
    useEffect(()=>{ readfromDBtestName() }, [] )

    return(
        <View style = {styles.background}>
            {studentInformation? 
                <View style = {styles.bodyContainer}>
                    <Text>Student ID : {studentInformation.studentId}</Text>
                    <Text>Student Name : {studentInformation.name}</Text>
                    <Text>Student ClassNumber :{studentInformation.classNum}</Text>
                </View>
            :null}

            {testName?  
                <SafeAreaView style={styles.container}>
                    <FlatList
                    data={testName}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    />
                </SafeAreaView> 
            :null} 
        </View>
        
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
      backgroundColor: '#D9EFB9',
      marginBottom: 10,
      paddingHorizontal: 20,
      marginVertical: 20,
    },
    background: {
      backgroundColor: '#C4E693',
      paddingHorizontal: 20,
      flex: 1,
    },
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#ABDC65',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 25,
    },
  });