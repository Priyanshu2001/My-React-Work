import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import { View } from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './utils/Colors';
import GameOverScreen from './screens/GameOverScreen';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const[userNumber, setUserNumber] = useState();
  const[isGameOver, setIsGameOver] = useState(true);
  const[guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if(!fontsLoaded){
    return <AppLoading/>;
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setIsGameOver(false);
  }

  function gameOverHandler(numberOfRounds){
    setIsGameOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber = {pickedNumberHandler} />;

  if(userNumber){
    screen = <GameScreen userNumber = {userNumber} onGameOver= {gameOverHandler}/>
  }

  if(isGameOver && userNumber){
    screen = <GameOverScreen userNumber= {userNumber} roundsNumber= {guessRounds} onStartNewGame={startNewGameHandler} />
  }

  return (
    <View style = {styles.rootScreen} >
    <ImageBackground 
      source={require('./assets/images/background-image.png')}
      resizeMode = 'cover'
      style = {styles.rootScreen}
      imageStyle={styles.backgroundImage}>
      
      <SafeAreaView style = {styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen : {
    flex : 1,
    backgroundColor : Colors.accent500
  },
  backgroundImage : {
    opacity : 0.15
  }
});
