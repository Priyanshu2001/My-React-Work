import { CONSTANTS } from "../utils/Constants";
const useValidate = (value, type) => {
   let isValid = false;
   //let length = value.trim().length;
    switch(type){

        case CONSTANTS.email :
            isValid = value.includes("@")  && !value.includes(" ");
            break;

        case CONSTANTS.phoneNo:
            isValid = value.trim().length === 10;
            break;
        
        case CONSTANTS.password:
            isValid = value.trim().length > 5;
            break;
        
        case CONSTANTS.name:
            isValid =  value.trim().length > 1 ;
            break;
        
        case CONSTANTS.form:
            for(let bool of value){
                if(!bool){
                    isValid = false;
                    break;
                }
                else{
                    isValid = true;
                }
            }
            break;
        
    }

    return isValid;

}

export default useValidate;