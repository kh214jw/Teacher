import { StyleSheet, Text, View, Button, Image } from 'react-native';

const Main = (props) => {
    return(
        <View style = {styles.container}>
            <View>
                <Text style = {styles.headerText}>Math Teacher</Text>
                <View style = {styles.iconView}>
                </View>
            </View>
            <View style = {styles.loginButton}>
                <Button 
                    title="Go To Login Page" 
                    color= '#2C952C'
                    onPress={() => props.navigation.navigate("Login")}
                />
            </View>
            <View style = {styles.signupButton}>
                <Button 
                    title="Go To Sign Up Page" 
                    color= '#2C952C'
                    onPress={() => props.navigation.navigate("Signup")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#C4E693',
      paddingHorizontal: 20,
      flex: 1,
    },
    headerText: {
      paddingTop: 20,
      marginBottom: 200,
      color: "gray",
      textAlign: 'center',
      fontSize: 35,
    },
    bodyContainer: {
      backgroundColor: '#FDF5DC',
      marginBottom: 10,
      paddingHorizontal: 10,
      marginVertical: 10,
      flex: 1,
    },
    iconView:{
      marginBottom: 30,
      marginTop: 10,
      justifyContent: "center",
      alignItems: 'center',
    },
    icon:{
      marginTop: 10,
      marginBottom: 30,
      width: "100%",
      height: 400,
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
    loginButton: {
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 20,
      height: 40,
    },
    signupButton: {
      marginTop: 20,
      marginBottom: 20,
      paddingHorizontal: 20,
      height: 40,
    }
  });

export default Main;