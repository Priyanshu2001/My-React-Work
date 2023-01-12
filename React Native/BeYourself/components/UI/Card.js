import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../utils/Colors";

function Card({children, style, isShadow = true}){
    return (
        <View style = {[styles.inputContainer, isShadow && styles.shadowStyle ,style]}>{children}</View>
    );
}

export default Card;

const deviceWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    inputContainer :{
        alignItems: 'center',
       // width: '100%',
        marginVertical : deviceWidth < 380 ? 4 : 8,
        padding: 12,
        backgroundColor : Colors.primary800,
        borderRadius : 16,
       
    },
    shadowStyle:{
        elevation : 8,
        shadowColor : 'black',
        shadowOffset : {width : 0, height : 2},
        shadowRadius : 8,
        shadowOpacity : 0.25
    }
});