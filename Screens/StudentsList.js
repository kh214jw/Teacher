import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, 
  FlatList, StyleSheet, 
  Text, StatusBar, 
  TouchableOpacity, Button } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

export default function StudentsList(props){

  const [selectedId, setSelectedId] = useState(null);
  
  //DB의 students의 name을 불러온다.
  const Item = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity 
      onPress={ () => props.navigation.navigate("StudentsInfo", {
        studentName : item.name
      }) }
      style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
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

  //파이어베이스에서 DB를 불러옴
  const [studentName, setStudentName] = useState();
  const readfromDBStudentList = async() => {
    try {
        const studentsData = await getDocs(collection(db, "students"))
        setStudentName(studentsData.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{ readfromDBStudentList() }, [] )

  return(
    <View style = {styles.background}>
      {studentName?
        <SafeAreaView style={styles.container}>
          <FlatList
            data={studentName}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          >
          </FlatList>
        </SafeAreaView> 
      :null}
    </View>
    
  );
}
  
const styles = StyleSheet.create({
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
    fontSize: 32,
  },
});
