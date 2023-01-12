import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
    token : null,
    isAuthenticated : false,
    authenticate : (token) => {},
    logout: () => {},
});

function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
       async function fetchToken(){
        const storedToken = await AsyncStorage.getItem("token");
        if(storedToken){
            setAuthToken(storedToken);
            console.log(storedToken);
        }
        }

        fetchToken();
    }, []);

    function authenticate(token){
        setAuthToken(token);
        AsyncStorage.setItem("token", token);
    }

    function logout(){
        console.log("token Logout: " , authToken)
        setAuthToken(null);
        console.log("token Logout 2: " , authToken)
        AsyncStorage.removeItem("token");
    }

    const value = {
        token : authToken,
        isAuthenticated : authToken!=null,
        authenticate,
        logout
    }

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

export default AuthContextProvider;