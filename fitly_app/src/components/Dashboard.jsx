import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";




const Dashboard = () => {
    const { session, SignOut } = UserAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUsername = async () => {
            if (!session?.user?.id) return; 
                const {data, error} = await supabase
                    .from("profiles")
                    .select("name")
                    .eq("user_id", session.user.id)
                    .single();
                if (error) {
                    console.error("Error fetching username:", error);
                } else {
                    setUsername(data.name);
                }
        }
        

        fetchUsername();    
    }
    , [session]);


    const handleSignOut = async (e) => {
        e.preventDefault()
        try {
            await SignOut();
            navigate("/");
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };

    return (
        <div>
            <h1>Dashboard Page</h1>
            <h2>Welcome, {username}</h2>
            <div>
                <p onClick={handleSignOut} className="hover:cursor-pointer border inline-block mt-4 px-4 py-2">
                    Sign Out
                </p>
            </div>
        </div>
    );
};

export default Dashboard;