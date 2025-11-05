import { Input, View, Text, Button, YStack, XStack,  } from "tamagui"
import { auth } from '../firebaseConfig'
import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const Auth = () => {

    const [email, setEmail] = useState<string>("");
    const[password, setPassword] = useState<string>("");
    const[isSignUp, setIsSignUp] = useState<boolean>(false);

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            

    } catch (error:any) {
        console.error(error);
    }}

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.error(error)
        }
    }

    return (<View>
        <Text > {isSignUp ? 'Sign up' : 'Sign In' } </Text>
            <Input value={email} onChangeText={setEmail} placeholder="put your email here..."/>
            <Input value={password} secureTextEntry onChangeText={setPassword} placeholder="put your password here..." />
            

            
        
         <Button onPress={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp ? "Sign-up" : "Sign-In"}
            </Button>
         <Text onPress={() => setIsSignUp(!isSignUp) }>
            {isSignUp ? "Already have an account? Sign in" : "Don't have an Account? Sign up" } 
            </Text>   

        
    </View>)
    }