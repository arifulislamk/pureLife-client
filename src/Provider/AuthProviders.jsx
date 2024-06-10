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
import app from '../firebase/firebase.config'
import useAxiosPublic from '../hooks/useAxiosPublic'
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
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
        return signOut(auth)
    }
    // for create new user 
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    // for update page
    const profileUpdate = (name, phoneNumber, email) => {
        console.log(phoneNumber, 'phone from auth')
        return updateProfile(auth.currentUser, {
            displayName: name,
            phoneNumber: phoneNumber,
            email: email,
        })
    }

    // {create token }
    const getToken = async userInfo => {
        await axiosPublic.post('/jwt', userInfo)
            .then(res => {
                if (res.data.token) {
                    console.log(res.data)
                    localStorage.setItem('access-token', res.data.token)
                    setLoading(false)
                }
                return res.data
            })
    }
    // save new user in database 
    const saveUser = async user => {
        console.log(user);
        const currentUser = {
            email: user?.email,
            name: user?.displayName,
            role: 'participant',
            photo: user?.photoURL,
        }
        const { data } = await axiosPublic.post(`/users`,
            currentUser)
        return data
    }

    // onAuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser, 'user from AuthProvider')
            setUser(currentUser)
            if (currentUser) {
                // sign webtoken
                const userInfo = { email: currentUser.email }
                getToken(userInfo)
                saveUser(currentUser)
            } else {
                // TODO: remove webtoken 
                localStorage.removeItem('access-token')
                setLoading(false)
            }
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
        profileUpdate,
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