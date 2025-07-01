import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "./Firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {

   const [user , setUser] = useState(null); // to store user login credentials 
   const [loading , setLoading] = useState(true);

   // to sign in user
   const signIn = async() =>{
         try{
             const result = await signInWithPopup(auth,provider);
             setUser(result.user);
          }
          catch(error){
            console.error(error);
          }
   }
   const signOutUser = async() =>{
    try{
        signOut(auth);
        setUser(null);
        console.log("Logged out successfully")
    }
    catch(error){
        console.log(error)
    }
   }

// to check and set if  a user is already loged in 
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });
  return () => unsubscribe();
}, []);



    return(
        <AuthContext.Provider value ={{user,loading,signIn,signOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)