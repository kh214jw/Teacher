import { getDocs, collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

  
function Chart() {
  const [students, setstudents] = useState();
  const readfromDB = async ()=>{
    try{
      const data = await getDocs(collection(db, "students" ))
      setstudents(data.docs.map(doc => ({ ...doc.data(), id : doc.id})))
    }catch(error){
      console.log(error.message)
    }
  }



    useEffect(() => { readfromDB() }, [])

    let labels1 = []
    let labels2 = []
    let labels3 = []

    let tempData1 = []
    let tempData2 = []
    let tempData3 = []   


    students?.map((student)=>{
      labels1.push(student.name)
      tempData1.push(student.test1)
    })

    students?.map((student)=>{
      labels2.push(student.name)
      tempData2.push(student.test2)
    })

    students?.map((student)=>{
      labels3.push(student.name)
      tempData3.push(student.test3)
    })


    
    const data1 = {
      labels : labels1, //x축
      datasets : [{
        data : tempData1, //y축
      }]}
    console.log(data1.labels)

    const data2 = {
      labels : labels2, //x축
      datasets : [{
        data : tempData2, //y축
      }]}
    console.log(data2.labels)

    const data3 = {
      labels : labels3, //x축 
      datasets : [{
        data : tempData3, //y축
      }]}
    console.log(data3.labels)



      return (
        <View style = {styles.background}>
          <Text>1번 시험 정답</Text>
          <LineChart
            data = {data1}
            width={Dimensions.get("window").width} 
            height={220}
            yAxisSuffix="점" //Y축 값 단위
            yAxisInterval={1} // Y축 간격
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#347c17", //차트 왼쪽 색 (그라데이션)
              backgroundGradientTo: "#b2c248", // 차트 오른쪽 색 (그라데이션)
              decimalPlaces: 1, // 소수점 자릿수
              color: (opacity = 1) => `rgba(195, 253, 184, ${opacity})`, // 점 색
              labelColor: (opacity = 1) => `rgba(195, 253, 184, ${opacity})`, // X, Y 라벨 색
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6", // 포인트 크기
                strokeWidth: "2", //포인트 테두리
                stroke: "#b2c248" //포인트 테두리 색
              }
            }}
            bezier
            style={{
              marginVertical: 8, //윗 여백
              borderRadius: 16 //모서리 각
            }}
          />

          <Text>2번 시험 정답</Text>
            <LineChart
              data = {data2}
              width={Dimensions.get("window").width} 
              height={220}
              yAxisSuffix="점" //Y축 값 단위
              yAxisInterval={1} // Y축 간격
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#347c17", //차트 왼쪽 색 (그라데이션)
                backgroundGradientTo: "#b2c248", // 차트 오른쪽 색 (그라데이션)
                decimalPlaces: 1, // 소수점 자릿수
                color: (opacity = 1) => `rgba(195, 253, 184, ${opacity})`, // 점 색
                labelColor: (opacity = 1) => `rgba(195, 253, 184, ${opacity})`, // X, Y 라벨 색
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6", // 포인트 크기
                  strokeWidth: "2", //포인트 테두리
                  stroke: "#b2c248" //포인트 테두리 색
                }
              }}
              bezier
              style={{
                marginVertical: 8, //윗 여백
                borderRadius: 16 //모서리 각
              }}
            />

          <Text>3번 시험 정답</Text>
            <LineChart
              data = {data3}
              width={Dimensions.get("window").width} 
              height={220}
              yAxisSuffix="점" //Y축 값 단위
              yAxisInterval={1} // Y축 간격
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#347c17", //차트 왼쪽 색 (그라데이션)
                backgroundGradientTo: "#b2c248", // 차트 오른쪽 색 (그라데이션)
                decimalPlaces: 1, // 소수점 자릿수
                color: (opacity = 1) => `rgba(195, 253, 184, ${opacity})`, // 점 색
                labelColor: (opacity = 1) => `rgba(195, 253, 184, ${opacity})`, // X, Y 라벨 색
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6", // 포인트 크기
                  strokeWidth: "2", //포인트 테두리
                  stroke: "#b2c248" //포인트 테두리 색
                }
              }}
              bezier
              style={{
                marginVertical: 8, //윗 여백
                borderRadius: 16 //모서리 각
              }}
            />
        </View>
      );
    }

    
  const styles = StyleSheet.create({ //화면 표시 크기조절
    background: {
      backgroundColor: '#C4E693',
      paddingHorizontal: 20,
      flex: 1,
    },
    container: {
      justifyContent: "center",
      height: responsiveHeight(50), // 50% of window height
      width: responsiveWidth(50), // 50% of window width
      alignItems: "center"
    },
    sampleText: {
      fontSize: responsiveFontSize(2) // 2% of total window size
    }
  });
  
export default Chart;


