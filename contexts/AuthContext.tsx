import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, User} from 'firebase/auth'
import { auth } from '../firebaseConfig'


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
    user: User | null; 
    userId: string | null;
    loading: boolean;
}


export const AuthProvider = ({children} : {children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect (() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                setUser(currentUser);
                setUserId(currentUser.uid);
            } else {
                setUser(null);
                setUserId(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])

    const value: AuthContextType = {
        user,
        userId,
        loading
    };


    return (
        <AuthContext.Provider  value={value}>
            {children}
        </AuthContext.Provider>
    );
};
    

export const useAuth = () => {
        const context = useContext(AuthContext);
        if(context === undefined) {
            throw new Error('Error');

        }
        return context;
    }