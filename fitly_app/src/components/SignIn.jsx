import { Link } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const {session, SignInUser} = UserAuth();
    const navigate = useNavigate();
    console.log("Current Session:", session);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await SignInUser(email, password);
            if (result.success) {
                navigate("/Dashboard");
            }

        } catch (err) {
            setError("Error occurred");
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div>
            <form onSubmit={handleSignIn} className="max-w-md mx-auto mt-10 p-8">
                <h2 className="text-center text-xl font-bold">Sign Up Today!</h2>
                <p className="text-center">Don't have an account? <Link to="/SignUp" className="">Sign Up</Link></p>
                <div className="flex flex-col py-4">
                    <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border border-gray-300 rounded-md p-2 m-2" type="email" />
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border border-gray-300 rounded-md p-2 m-2" type="password" />
                    <button className="mt-4" type="submit" disabled={loading}>Sign In</button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </div>
            </form>

            
        </div>
    );

}

export default SignIn;