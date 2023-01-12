import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Colors from "../../utils/Colors";
import Card from "./Card";
import InstructionText from "./InstructionText";
import { CONSTANTS } from "../../utils/Constants";

const Input = ({placeholder, keyboardType, isSecure, entity, type}) => {
  let error = entity.hasError;
  const valueChangeHandler = (text) => {
    //console.log(text);
    entity.valueChangeHandler(text);
  }

  return (
    <View style={styles.container}>
    <InstructionText style= { error && styles.titleInvalid } >{error && 'Invalid '} {`${placeholder} `}</InstructionText>
    <Card style= {styles.holder} >
    <TextInput
      style={[styles.input, error && styles.inputInvalid]}
      keyboardType={keyboardType}
      selectionColor={Colors.white}
      placeholder = { (type === CONSTANTS.password) ?  'Min 6 Characters' : `Enter Your ${placeholder}`}
      placeholderTextColor = {Colors.accent500}
      value = { entity.value }
      secureTextEntry = {isSecure}
      onChangeText = {valueChangeHandler}
      onBlur = { entity.inputBlurHandler }
      maxLength = {(type === CONSTANTS.phoneNo) ? 10 : 30}
    />
    </Card>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width:'100%',
    fontSize: 20,
    color: Colors.white,
    fontWeight: "bold",
  },

  titleInvalid :{
    color: Colors.errorLabel,
  },

  inputInvalid: {
    color: Colors.error,
  },

  container:{
    marginTop: 8,
    width: '100%'
  },

  holder:{
    borderColor:Colors.primary500,
    borderWidth: 2,
  }
});
