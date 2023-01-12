import { View, StyleSheet, useWindowDimensions, ScrollView, KeyboardAvoidingView } from "react-native";
import Colors from "../../utils/Colors";

function RoundedSheet({children, style}){
    const {width, height} = useWindowDimensions();
    return (  
        <View style = {[styles.inputContainer, style, {width : width}]}>
        <ScrollView>
        <KeyboardAvoidingView  style = {styles.screen} behavior="padding" >
        <View style= {styles.innerContainer} >{children}</View>
        </KeyboardAvoidingView>
        </ScrollView>
        </View>


    );
}

export default RoundedSheet;



const styles = StyleSheet.create({
    screen : {
        flex : 1
      },
    inputContainer :{
        backgroundColor : Colors.primary800,
        borderTopStartRadius:20,
        borderTopEndRadius: 20,
        elevation : 8,
        shadowColor : 'black',
        shadowOffset : {width : 0, height : 2},
        shadowRadius : 8,
        shadowOpacity : 0.25
    },
    innerContainer:{
        padding : 16,
        paddingBottom:100,
        alignItems: 'center',
    }
});