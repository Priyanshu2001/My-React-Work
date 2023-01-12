import { useReducer } from "react";
import useValidate from "./use-validate";
const initialState = {
    value : "",
    isTouched : false
};

const inputStateReducer = (state, action) =>{
    if(action.type == "INPUT"){
      //  console.log(action.value);
        return {value : action.value, isTouched : false}
    }
    if(action.type == "BLUR"){
        return {value : state.value, isTouched : true}
    }
    if(action.type == "RESET"){
        return {value : '', isTouched : false}
    }
    return inputStateReducer;
}

const useInput = (type) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialState);
   //  console.log(inputState.value);

    const valueIsValid = useValidate(inputState.value, type);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (value) => {
        dispatch({type : 'INPUT', value:value})
    }

    const inputBlurHandler = () => {
        dispatch({type : 'BLUR'})
    }

    const resetHandler = () => {
        dispatch({type : 'RESET'})
    }

    return {
        value : inputState.value,
        isValid : valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        resetHandler
    }


}

export default useInput;