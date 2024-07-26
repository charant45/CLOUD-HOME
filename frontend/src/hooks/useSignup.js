import { useNavigate } from "react-router-dom";

const useSignup = () => {
    const navigate = useNavigate();

    const signup = async ({name, email, password}) => {
        try{
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/signup`, {
                method: "POST",
                body: JSON.stringify({name, email, password}),
                headers:{
                    "content-Type": "application/json",
                },
            })
            console.log(res);
            const data = await res.json();
            console.log(data);
            if(data.status === "success"){
                navigate(`/login?email=${email}`);
            }
        }catch(e){
            console.log(e.message);
            alert("Signup failed: " + e.message);

        }
    };
    return {signup};
};

export default useSignup;