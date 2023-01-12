
import {StyleSheet, View, Text, Pressable, ActivityIndicator} from "react-native";
import Colors from "../../utils/Colors";

function PrimaryButton ({children, onPress, formIsValid = true, isAuthenticating = false}){

    return (
        <View style = {styles.buttonOuterContainer}>
        <Pressable
            style={({pressed}) => pressed? [styles.buttonInnerContainer, styles.pressed] : [styles.buttonInnerContainer, !formIsValid && styles.pressed] }
            onPress={onPress}
            android_ripple={{color : Colors.primary600}}
            disabled = {!formIsValid} >
            {!isAuthenticating ? ( <Text
             style ={styles.buttonText}>{children}</Text>) : (<ActivityIndicator size= 'large' color={Colors.primary800} />) }
              
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer :{
        borderRadius : 24,
        marginTop : 16,
        marginBottom:8,
        overflow : 'hidden',
        width: '75%',
    },
    buttonInnerContainer :{
        backgroundColor : Colors.accent500,
        paddingVertical : 8,
        paddingHorizontal : 16,
        elevation : 2,
        
    },
    buttonText : {
        color : Colors.primary700,
        textAlign : 'center',
        fontSize:20,
        fontWeight: 'bold',
    },
    pressed :{
        opacity : 0.60
    }
});

export default PrimaryButton;