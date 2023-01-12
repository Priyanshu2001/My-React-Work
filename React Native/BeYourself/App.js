import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator}  from "@react-navigation/bottom-tabs";
import LoginScreen from "./components/screens/LoginScreen";
import SignupScreen from "./components/screens/SignupScreen";
import Colors from "./utils/Colors";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import HomeScreen from "./components/screens/HomeScreen";
import MyDiaryScreen from "./components/screens/MyDiaryScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import {Ionicons} from "@expo/vector-icons"
import Card from "./components/UI/Card";
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function BottomTabsNavigator(){
  return (
  //<Card style= { styles.container } >
  <BottomTabs.Navigator 
  screenOptions={{
    headerStyle: { backgroundColor: Colors.primary800 },
    tabBarStyle : { backgroundColor: Colors.primary800, height:64, borderTopStartRadius: 16,  borderTopEndRadius: 16},
    headerTitleStyle: { fontWeight: "bold", color: Colors.white },
    tabBarActiveTintColor : {icon:Colors.primary800, bg : Colors.accent400},
    tabBarInactiveTintColor : {icon:Colors.white, bg: Colors.primary800},
    tabBarShowLabel: false
  }} >
      <BottomTabs.Screen name="Home" component= {HomeScreen}
      options={{
          title: "BeYourself",
          tabBarLabel : "Home",
          tabBarIcon : ({color, size}) => (
            <Card style = {[{backgroundColor: color.bg}, styles.card]} isShadow = {false} >
          <Ionicons name="home" size={size} color={color.icon} />
          </Card>
          ),
        }} />
      <BottomTabs.Screen name = "MyDiary" component = {MyDiaryScreen}
       options={{
          title: "My Diary",
          tabBarLabel : "Diary",
          tabBarIcon : ({color, size}) => (
           <Card style = {[{backgroundColor: color.bg}, styles.card]} isShadow = {false} >
          <Ionicons name="book" size={size} color={color.icon} />
          </Card>), 
        }} />
        
      <BottomTabs.Screen name = "Profile" component = {ProfileScreen} 
         options={{
          title: "My Profile",
          tabBarLabel : "Profile",
          tabBarIcon : ({color, size}) => ( <Card style = {[{backgroundColor: color.bg}, styles.card]} isShadow = {false} >
          <Ionicons name="person" size={size} color={color.icon} />
          </Card>), 
        }}
      />
  </BottomTabs.Navigator>
 // </Card>
 );
}


const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 },
        headerTintColor: Colors.white,
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold", color: Colors.white },
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Welcome, User!",
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          title: "Create Your Account",
        }}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={BottomTabsNavigator}
        options = {
          {
            headerShown : false
          }
        }
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
 
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default function App() {


const[fontsLoaded] = useFonts({
    'lemon-jelly': require('./assets/fonts/LemonJelly.ttf'),
    'blackberry-jam': require('./assets/fonts/BlackberryJam.ttf'),
    'quite-magical-regular': require('./assets/fonts/QuiteMagicalRegular.ttf'),
    'amsterdam': require('./assets/fonts/Amsterdam.ttf'),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf"),
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'happiness-mood': require("./assets/fonts/HappinessMoodDemo.ttf")
  });
  
  if(!fontsLoaded){
    return null;
  }
 

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white,
    
  },
  card : {
    width : "75%",
    justifyContent: "center",
    height:"75%",
    padding:0,
    borderRadius:6
  }
});
