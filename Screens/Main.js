import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const Main = (props) => {
    const [users, setUsers] = useState();
    //로그인 정보를 받아옴
    const {params} = props.route
    const userEmail = params? params.email:null;
    
    //파이어베이스 DB읽기
    const readfromDBUser = async() => {
        //DB읽기 성공시 실행
        try {
            const data = await getDocs(collection(db, "users"))
            let selectedUser = {}
            //받아온 값과 일치하는 유저 정보를 불러옴
            data.docs.map((doc) =>{
                if(doc.data().email === userEmail ){
                    selectedUser = { ...doc.data(), id: doc.id }
                    setUsers(selectedUser)
                }
            })
            //DB읽기 실패 시 실행
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{ readfromDBUser() }, [] )

    return(
        <View style = {styles.background}>
            
            <View style = {styles.marginView}>
            <Button 
                title="Students List" 
                color= '#2C952C'
                onPress={() => props.navigation.navigate("StudentsList")}
            ></Button>
            </View>

            <View style = {styles.marginView}>
            <Button
                title = "test add"
                color= '#2C952C'
                onPress={() => props.navigation.navigate("TestAdd")}
            ></Button>
            </View>

            <View style = {styles.marginView}>
            <Button
                title = "test list"
                color= '#2C952C'
                onPress={() => props.navigation.navigate("TestList")}
            ></Button>
            </View>
            
            <View style = {styles.marginView}>
            <Button
                title = "test Score Chart"
                color= '#2C952C'
                onPress={() => props.navigation.navigate("Chart")}
            ></Button>
            </View>

            {users? 
                <View style = {styles.bodyContainer}>
                    <Text style = {styles.infoText}>※ User Information ※</Text>
                    <Text style = {styles.infoText}>My Name : {users.name}</Text>
                    <Text style = {styles.infoText}>My E-Mail : {users.email}</Text>
                    <Text style = {styles.infoText}>My Class Number : {users.classNum}</Text>
                </View>
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
    infoText: {
        paddingTop: 5,
        marginBottom: 5,
        color: "gray",
        textAlign: 'center',
        fontSize: 10,
      },
    background: {
      backgroundColor: '#C4E693',
      paddingHorizontal: 20,
      flex: 1,
    },
    marginView: {
        paddingTop: 20,
        marginBottom: 20,
    }
});

export default Main;