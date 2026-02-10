import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    const SignUpNewUser = async (firstName, lastName, userName, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) {
            console.log("Error signing up:", error.message);
            return {success: false, error};
        }

        const user = data.user;
        
        const { error: profileError } = await supabase
            .from('userprofiles')
            .insert(
                { id: user.id, firstname: firstName, lastname: lastName, username: userName},
            );

        if (profileError) {
            console.log("Error creating profile");
            return {success: false, error: profileError};
        }

        console.log("Sign-up successful:", data);

        return {success: true, data};
    }


    const SignInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) {
                console.log("Error signing in:", error);
                return {success: false, error: error.message};
            }
            console.log("Sign-in successful:", data);
            return {success: true, data};
        }
        catch (error) {
            console.log("Error signing in:", error);        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    const SignOut = () => {
        const { error } = supabase.auth.signOut();
    if (error){
        console.log("AuthContext Error:", error);
    }
}

    return (
        <AuthContext.Provider value={{ session, SignUpNewUser, SignInUser, SignOut }}>
            {children}
        </AuthContext.Provider>
    )

}

export const UserAuth = () => {
    return useContext(AuthContext);
};

