import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView,  ScrollView } from "react-native";
import Card from "../components/UI/Card";
import InstructionText from "../components/UI/InstructionText";
import PrimaryButton from '../components/UI/PrimaryButton';
import Title from "../components/UI/Title";
import Colors from "../utils/Colors";

function StartGameScreen ({onPickNumber})  {
    const[enteredNumber, setEnteredNumber] = useState('');
    const {width, height} = useWindowDimensions();
    
    function numberInputHandler (enteredText) {
        setEnteredNumber(enteredText);
    }
    
    function resetInputHandler (enteredText) {
        setEnteredNumber('');
    }
    
    function confirmInputHandler () {
        const chooseNumber = parseInt(enteredNumber);
        
        if(isNaN(chooseNumber) || chooseNumber<=0 || chooseNumber>99){
            Alert.alert('Invalid Number!',
            'Number has to between 1 - 99',
            [{
                text:'Okay',
                style : 'destructive',
                onPress : resetInputHandler
            }]
            )
            return;
        }
        
        onPickNumber(chooseNumber);
    }
    
    const marginTop = height < 300 ? 30 : 100;


    return(
        <ScrollView style = {styles.screen}>
        <KeyboardAvoidingView style ={styles.screen} behavior="position" >
        <View style ={[styles.rootContainer, {marginTop : marginTop}]}>
        <Title>
            Guess My Number
        </Title>
        <Card>
            <InstructionText> Enter a Number</InstructionText>
                <TextInput
                    style = {styles.numberInput}
                    maxLength={2}
                    keyboardType = "number-pad"
                    onChangeText={numberInputHandler}
                    value={enteredNumber}/>
                    
            <View style ={styles.buttonsContainer}>
               <View style = {styles.buttonContainer}>
                   <PrimaryButton onPress = {resetInputHandler }>Reset</PrimaryButton>
               </View>
               <View style = {styles.buttonContainer}>
                   <PrimaryButton onPress={confirmInputHandler} >Confirm</PrimaryButton>
               </View>
            </View>
        </Card>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
    );
    
}
export default StartGameScreen;

//const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen:{
        flex : 1,
    },
    rootContainer :{
        flex : 1,
      //  marginTop : deviceHeight < 300 ? 30 : 100,
        alignItems: 'center'
    },

    numberInput : {
        height : 50,
        width : 50,
        fontSize : 32,
        borderBottomColor : Colors.accent500,
        borderBottomWidth : 2,
        color : Colors.accent500,
        marginVertical : 8,
        fontWeight : 'bold',
        textAlign : 'center'
    },
    
    buttonsContainer :{
        flexDirection : 'row'
    },

    buttonContainer :{
        flex : 1
    }
});
