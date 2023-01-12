import  {useContext, useEffect, useState} from "react";
import { View, StyleSheet, Dimensions, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { CONSTANTS } from "../../utils/Constants";
import Input from "../UI/Input";
import InstructionText from "../UI/InstructionText";
import PrimaryButton from "../UI/PrimaryButton";
import RoundedSheet from "../UI/RoundedSheet";
import Title from "../UI/Title";
import useInput from "../../hooks/use-input";
import useValidate from "../../hooks/use-validate";
import { loginUser } from "../../utils/auth";
import { AuthContext } from "../../store/auth-context";

const LoginScreen = ({navigation}) => {  
  const [formIsValid, setFormIsValid] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const email = useInput(CONSTANTS.email);
  const password = useInput(CONSTANTS.password);


  useEffect(() => {
    const isValid = useValidate([email.isValid, password.isValid], CONSTANTS.form);
    setFormIsValid(isValid)
  },[email.isValid, password.isValid]);

  
  function pressHandler(){
    navigation.navigate("SignupScreen");
  }

  async function signInHandler(){
    setIsAuthenticating(true);
    try{
      const data = await loginUser(email.value, password.value);
      setIsAuthenticating(false);
      if(data.idToken != undefined){
        authCtx.authenticate(data.idToken);
      }
     else{
      Alert.alert(
        "Login Failed!",
        "Something went wrong. Please Try Again Later"
      );
     }
    }
    catch(error){
      
      //navigation.navigate("HomeScreen");
    } 
  }

    
  return (
    <View style ={styles.container}>
    <Title >BeYourself</Title>
    <RoundedSheet style= {styles.contents} >
      <Input placeholder="E-mail" keyboardType='email-address' isSecure= {false} entity = {email} type = {CONSTANTS.email} />
      <Input placeholder="Password" keyboardType='default' isSecure= {true} entity = {password} type = {CONSTANTS.password} />
      <View style = {styles.groupElements} >
      <PrimaryButton formIsValid = {formIsValid} onPress={signInHandler} isAuthenticating = {isAuthenticating} >Login</PrimaryButton>
      <InstructionText >OR</InstructionText>
      <InstructionText style={styles.text}>-----   New User ?   -----</InstructionText>
      <PrimaryButton onPress={pressHandler} >Create Account</PrimaryButton>
      </View>
      </RoundedSheet>
      </View>

  );
};

export default LoginScreen;
const {width : deviceWidth, height : deviceHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: deviceWidth < 380 ? 50 : 80,
    },

    contents:{
        marginTop: deviceWidth < 380 ? 50 : 80,
    },
    text:{
      fontWeight: 'bold',
    },

    buttonValidity:{
      opacity:0.6,
    },

    groupElements:{
      marginTop: 16,
      width: '100%',
      alignItems: 'center'
    }
  });
