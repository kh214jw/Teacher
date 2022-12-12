import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Start from './Screens/Start';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Main from './Screens/Main';
import StudentsList from './Screens/StudentsList';
import StudentsInfo from './Screens/StudentsInfo';
import TestAdd from './Screens/TestAdd';
import TestList from './Screens/TestList';
import TestSetting from './Screens/TestSetting';
import TestResult from './Screens/TestResult';
import Chart from "./Screens/Chart";

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Start" component={Start}></Stack.Screen>
        <Stack.Screen name = "Signup" component={Signup}></Stack.Screen>
        <Stack.Screen name = "Main" component={Main}></Stack.Screen>
        <Stack.Screen name = "Login" component={Login}></Stack.Screen>
        <Stack.Screen name = "StudentsList" component={StudentsList}></Stack.Screen>
        <Stack.Screen name = "StudentsInfo" component={StudentsInfo}></Stack.Screen>
        <Stack.Screen name = "TestAdd" component={TestAdd}></Stack.Screen>
        <Stack.Screen name = "TestList" component={TestList}></Stack.Screen>
        <Stack.Screen name = "TestSetting" component={TestSetting}></Stack.Screen>
        <Stack.Screen name = "TestResult" component={TestResult}></Stack.Screen>
        <Stack.Screen name = "Chart" component={Chart}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}