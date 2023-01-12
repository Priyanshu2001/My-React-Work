const API_KEY = 'AIzaSyDwVWhgvtuqChyipIau4tSH2V9VqePUj9Q'

async function authenticate(mode, email, password){
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=` + API_KEY;
    // const response = await axios.post(url, {
    //     email : email,
    //     password : password,
    //     returnSecureToken : true
    // });

    const response = await fetch(url, {
        method : 'POST',
        body : JSON.stringify({
            email : email,
            password : password,
            returnSecureToken : true
        }),
        headers : {
            'Content-Type' : 'application/json'
        }
    })

    const data = await response.json();
    console.log("Response :", data);
    const token = data.idToken;
    console.log("Token :",token);
    return data;

}

export function createUser(email, password){
   return  authenticate("signUp", email, password);
}

export  function loginUser(email, password){
  return  authenticate("signInWithPassword", email, password);
}