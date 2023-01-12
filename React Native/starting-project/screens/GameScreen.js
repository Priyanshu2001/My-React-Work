import { useState, useEffect } from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import { View, useWindowDimensions } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';
import PrimaryButton from '../components/UI/PrimaryButton';
import Title from '../components/UI/Title';
import {Ionicons} from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';


function generateRandomBetween(min, max, exclude){
    const rndNum = Math.floor(Math.random()*(max -min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }
    else{
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen ({userNumber, onGameOver}){
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const[currentGuess, setCurrentGuess] = useState(initialGuess);
    const[guessRounds, setGuessRounds] = useState([initialGuess]);
    const{width, height} = useWindowDimensions();


    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    },[currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary =1;
        maxBoundary =100;
    },[]);
    
    function nextGuessHandler(direction){ //direction -> Higher, Lower
        if(
          (direction === 'Lower' && currentGuess < userNumber) ||
          (direction === 'Higher' && currentGuess > userNumber)){
            Alert.alert("Don't Lie", "You know that this is wrong..", [{text : 'Sorry!', style:'cancel'}]);
            return;
          }
        if(direction === 'Lower'){
           maxBoundary = currentGuess;
        }
        else{
            minBoundary = currentGuess + 1;
        }
        const nextGuess = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess (nextGuess);
        setGuessRounds((prevGuessRounds)=> [nextGuess, ...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;
    let content =(
    <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
            <View style = {styles.buttonsContainer}>
                <View style ={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'Lower')}>
                        <Ionicons name='md-remove' size={24} color = 'white'/>
                    </PrimaryButton>
                </View>
                <View style = {styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'Higher')}>
                    <Ionicons name='md-add' size={24} color = 'white'/>
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>
    );

    if(width > 500){
        content = (
            <>
             <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
             <View style={styles.buttonContainerWide}>
             <View style ={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'Lower')}>
                        <Ionicons name='md-remove' size={24} color = 'white'/>
                    </PrimaryButton>
                </View>
                 <NumberContainer>{currentGuess}</NumberContainer>
                <View style = {styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'Higher')}>
                    <Ionicons name='md-add' size={24} color = 'white'/>
                    </PrimaryButton>
                </View>
                 </View>
            </>
        );
    }

return (
    <View style ={styles.screen}>
        <Title>Opponent's Guess</Title>
        {content}
        <View style ={styles.listContainer} >
        <FlatList 
        data={guessRounds} 
        renderItem={(itemData) => 
        <GuessLogItem
         roundNumber={guessRoundsListLength - itemData.index} 
         guess = {itemData.item} />} 
        keyExtractor={(item) => item}
        />
        </View>
    </View>
);
}

export default GameScreen;

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding : 24,
        margin : 8
    },
    instructionText : {
        marginBottom: 24
    },
    buttonsContainer : {
        flexDirection : 'row'
    },
    buttonsContainerWide : {
        flexDirection : 'row',
        alignItems: 'center'
    },


    buttonContainer : {
        flex: 1
    },

    listContainer:{
        flex: 1,
        padding: 16
    }
});