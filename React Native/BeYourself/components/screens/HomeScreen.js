import { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";

import Card from "../UI/Card";
import InstructionText from "../UI/InstructionText";
import Title from "../UI/Title";

const api_url = "https://zenquotes.io/api/today/";
const initialState = [{
    "a" : "",
    "q": ""
}];


const HomeScreen = ({ navigation }) => {

    const [data, setData]  = useState(initialState);
    useEffect(() => {
        async function getQuote(url) {
            const response = await fetch(url);
            const d = await response.json();
            setData(d);
            console.log(d);
          }
          getQuote(api_url);
    }, []);
 



  return (
    <>
    <Card style={styles.quoteCard}>
      <InstructionText style={styles.thought} >{`${data[0].q}`}</InstructionText>
      <InstructionText style={styles.author} >{`- By ${data[0].a}`}</InstructionText>
    </Card>
    <Card style={styles.card} isShadow={false} >
        <Title>CONTENT HERE</Title>
    </Card>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  quoteCard: {
    margin: 16,
    //backgroundColor: Colors.primary700,
  },
  card: {
    backgroundColor: Colors.accent400,
  },
  author:{
    color: Colors.accent400, fontSize : 24, fontFamily:'blackberry-jam'
  },
  thought:{
    color: Colors.white, fontSize : 20, fontFamily:"open-sans", textAlign: 'center'
  }
});
