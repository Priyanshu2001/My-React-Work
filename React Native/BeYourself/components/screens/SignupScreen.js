import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import Input from "../UI/Input";
import PrimaryButton from "../UI/PrimaryButton";
import RoundedSheet from "../UI/RoundedSheet";
import Title from "../UI/Title";
import useInput from "../../hooks/use-input";
import useValidate from "../../hooks/use-validate";
import { createUser } from "../../utils/auth";
import { CONSTANTS } from "../../utils/Constants";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../UI/LoadingOverlay";

const SignupScreen = ({navigation}) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const email = useInput(CONSTANTS.email);

  const password = useInput(CONSTANTS.password);

  const name = useInput(CONSTANTS.name);

  const phoneNo = useInput(CONSTANTS.phoneNo);

  async function signupHandler() {
    setIsAuthenticating(true);
   try{
      const data = await createUser(email.value, password.value);
      setIsAuthenticating(false);
      if(data.idToken != undefined){
        authCtx.authenticate(data.idToken);
      }
     else{
      if(data.error.message === "EMAIL_EXISTS")
      Alert.alert(
        "User Already Exists",
        "The email is already registered. Please Try to Login instead"
      );
      else{
      Alert.alert(
        "Sign Up Failed!",
        "Something went wrong. Please Try Again Later"
      );
     }
    }

    }
    catch(error){
      
      //navigation.navigate("HomeScreen");
    } 

   
  }

  useEffect(() => {
    const isValid = useValidate(
      [name.isValid, phoneNo.isValid, email.isValid, password.isValid],
      CONSTANTS.form
    );
    setFormIsValid(isValid);
  }, [name.isValid, phoneNo.isValid, email.isValid, password.isValid]);

  if(isAuthenticating)
   return <LoadingOverlay message='Creating User...'/>

  return (
    <View style={styles.container}>
      <Title>Details</Title>
      <RoundedSheet style={styles.content}>
        <Input
          placeholder="Full Name"
          keyboardType="default"
          isSecure={false}
          entity={name}
          type={CONSTANTS.name}
        />
        <Input
          placeholder="Phone Number"
          keyboardType="phone-pad"
          isSecure={false}
          entity={phoneNo}
          type={CONSTANTS.phoneNo}
        />
        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          isSecure={false}
          entity={email}
          type={CONSTANTS.email}
        />
        <Input
          placeholder="Password"
          keyboardType="default"
          isSecure={true}
          entity={password}
          type={CONSTANTS.password}
        />
        <PrimaryButton
          formIsValid={formIsValid}
          onPress={signupHandler}
          isAuthenticating={isAuthenticating}
        >
          Sign Up
        </PrimaryButton>
      </RoundedSheet>
    </View>
  );
};

export default SignupScreen;
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: deviceWidth < 380 ? 16 : 24,
  },
  text: {
    fontWeight: "bold",
    alignItems: "center",
  },
  content: {
    marginTop: deviceWidth < 380 ? 16 : 24,
  },
});
