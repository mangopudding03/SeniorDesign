import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";



const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [userNameAvailable, setUserNameAvailable] = useState(false);
    const [checkingUsername, setCheckingUsername] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const {SignUpNewUser} = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userName) return;
        setUserNameAvailable(false);
        setUsernameError("");

        const timer = setTimeout(() => {
            const check = async () => {
                setCheckingUsername(userName);
                const {data , error} = supabase
                    .from("profiles")
                    .select("name")
                    .eq("name", userName)
                    .maybeSingle();
                if (error) {
                    console.error("Error checking username:", error);
                    setUsernameError("Error checking username");
                    setUserNameAvailable(false);
                } 
                else if (data) {
                    setUsernameError("Username already taken");
                    setUserNameAvailable(false);
                } else {
                    setUsernameError("");
                    setUserNameAvailable(true);
                }

                setCheckingUsername(false); 
            }; 
            check();
        }, 500);

        return () => clearTimeout(timer);}, [userName]);
    

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (usernameError || !userNameAvailable) return;
        setLoading(true);
        try {
            const result = await SignUpNewUser(firstName, lastName , userName, email, password);

            if (result.success) {
                navigate("/Dashboard");
            }

        } 
        catch (err) {
            setError("Error occurred");
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div>
            <form onSubmit={handleSignUp} className="max-w-md mx-auto mt-10 p-8">
                <h2 className="text-center text-xl font-bold">Sign Up Today!</h2>
                <p className="text-center">Already have an account? <Link to="/SignIn" className="">Sign In</Link></p>
                <div className="flex flex-col py-4">
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="border border-gray-300 rounded-md p-2 m-2" type="text" />
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="border border-gray-300 rounded-md p-2 m-2" type="text" />
                   
                    <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" 
                    className={` rounded-md p-2 m-2 border
                    ${!userNameAvailable ? "border-red-500" : userNameAvailable ? "border-green-500" : "border-gray-300"}`} type="text" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border border-gray-300 rounded-md p-2 m-2" type="email" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border border-gray-300 rounded-md p-2 m-2" type="password" />
                    <button className="mt-4" type="submit" disabled={loading || checkingUsername || !userName || !!usernameError || !userNameAvailable}>Sign Up</button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </div>
            </form>

            
        </div>
    );

}

export default SignUp;