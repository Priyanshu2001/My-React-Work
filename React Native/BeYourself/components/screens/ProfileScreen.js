import {useContext} from 'react';
import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import Card from "../UI/Card";
import InstructionText from "../UI/InstructionText";
import PrimaryButton from "../UI/PrimaryButton";
import Title from "../UI/Title";
import { AuthContext } from "../../store/auth-context";


const ProfileScreen = ({navigation}) => {
    const authCtx = useContext(AuthContext);


    function onLogoutHandler(){
        authCtx.logout();
       // navigation.navigate("LoginScreen")
    }

    return (
        <Card style={styles.card} >
        <InstructionText>ProfileScreen</InstructionText>
        <PrimaryButton onPress = {onLogoutHandler}>Logout</PrimaryButton>
        </Card>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    card:{
        margin : 16,
        backgroundColor: Colors.primary700,
    }
});