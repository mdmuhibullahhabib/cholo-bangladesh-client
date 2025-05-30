import React, { createContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';


export const AuthContext = createContext(null)
const provider = new GoogleAuthProvider();
const auth = getAuth(app)

const Authprovider = ({ children }) => {

  const [user, setUser]= useState(null)
  const [loading, setLoading]= useState(true)
  const axiosPublic = useAxiosPublic();
  console.log(user, loading)

  const signInWithGoogle = () => {
        setLoading(true)
    return signInWithPopup(auth, provider)
  }

  const signUp = ( email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const signIn = ( email, password )=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut =()=> {
    setLoading(true)
    return signOut(auth);
  }

  const authInfo = {
    user,
    setUser,
    signUp,
    signIn,
    logOut,
    loading,
    updateUserProfile,
    signInWithGoogle
  }  
  

  useEffect (()=>{
   const unsubscribe= onAuthStateChanged(auth, (currentUser) =>{
      // setUser(currentUser);
      console.log('current user', currentUser)
      if(currentUser){
        // Get token
        const userInfo = {
          email: currentUser.email
        }
        axiosPublic.post('/jwt', userInfo)
        .then(res =>{
          if(res.data.token){
                  setUser(currentUser);
            localStorage.setItem('access-token', res.data.token)
          }
        })
      }
      else{
        // remove token
        localStorage.removeItem('access-token')
      }
      setLoading(false)
    });
    return () => {
      return unsubscribe();
    }
  }, [axiosPublic])

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default Authprovider;