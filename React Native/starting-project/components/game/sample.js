import {React, useState} from "react"
import { TextView, Pressable, TextInput } from "react-native"

const min = 1;
const max = 100;
const courseTitle = "React";
const instructor = "ABC"
const courseDate = Date.now();

export const CourseOffering = () =>{


    return(
        <div>
            <TextView>{courseTitle}</TextView>
            <TextView>{instructor}</TextView>
            <TextView>{courseDate.getDate()}</TextView>
            <TextView>{`Max = ${max} Min=${min}`}</TextView>
        </div>
    );
}

export const Registration = () =>{

    const [count, setCount] = useState();
    const [accepted, setAccepted] = useState(false);

    const countHandler=()=>{
        setCount((count) => {count + 1});
        setAccepted(true);
    }

    return(
        <div>
        <TextInput>Name</TextInput>
        {(count != max && !accepted) ? <Pressable onPress={countHandler}>Register</Pressable> : <TextView>Course_Full</TextView>}
        </div>
    );
}



//------------------------------------------INDEX.js-------------------------

// return(<div><CourseOffering/><Registration/></div>);

