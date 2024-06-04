import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'
import axios from 'axios'
import app from '../firebase/firebase.config'
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = async () => {
        setLoading(true)
        // await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        //     withCredentials: true,
        // })
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    // {create token }

    // {save user }
    // onAuthStateChange
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser, 'user from AuthProvider')
            setUser(currentUser)
            // if (currentUser) {
            //     getToken(currentUser?.email)
            //     saveUser(currentUser)
            // }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])

    const name = 'arif'
    const authInfo = {
        name,
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    // Array of children.
    children: PropTypes.array,
}

export default AuthProvider