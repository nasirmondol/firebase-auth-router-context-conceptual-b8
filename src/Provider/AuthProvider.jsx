import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";


export const CreateContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleSignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const githubSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, gitProvider)
    }


    const logOut = () => {
        return signOut(auth)
    }

    const handleUpdateProfile = (name, image_url) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image_url
        })
    }

    useEffect(() => {
        const observer = onAuthStateChanged(auth, user => {
            setUser(user)
            setLoading(false)
        });
        return () => {
            observer();
        }
    }, []);

    // useEffect(() =>{
    //     onAuthStateChanged(auth, user =>{
    //         setUser(user)
    //         setLoading(false)
    //     })
    // }, [])

    


    const authInfo = { user, loading, handleUpdateProfile, googleSignIn, logOut, githubSignIn, createUser, handleSignIn }


    return (
        <CreateContext.Provider value={authInfo}>
            {children}
        </CreateContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}