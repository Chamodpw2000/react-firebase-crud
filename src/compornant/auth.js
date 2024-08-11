import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(auth?.currentUser?.email);
    
    const signIn = async () => {

        try {
            await createUserWithEmailAndPassword(auth, email, password);

        } catch (e) {
            console.log(e);
        }



    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (e) {
            console.log(e);
        }}

        const logOut = async () => {
            try {
                await signOut(auth);
            } catch (e) {
                console.log(e);
            }
        }
        return (
            <div>
                <input placeholder="Email...."
                    onChange={(e) => setEmail(e.target.value)}


                />
                <input placeholder="Password...."
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={signIn}>Sign in</button>
                <button onClick={signInWithGoogle} >Sign in with google</button>
                <button onClick={logOut}>Sign out</button>
            </div>
        );
    
}