import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";


function Title ({children, style}){
    return (
        <Text style = {[styles.title, style]} >{children}</Text>
    );
}

export default Title;

const styles = StyleSheet.create({
    title :{
        fontSize : 36,
        fontWeight: 'bold',
        color : Colors.primary700,
        textAlign :'center',
    }
})