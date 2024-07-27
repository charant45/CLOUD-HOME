// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appLogin } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const useLogin = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const login = async ({ email, password }) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "content-Type": "application/json",
                },
            })
            console.log(res);
            const data = await res.json();
            console.log(data);
            if (data.status === "success") {
                dispatch(appLogin(data));
                // navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            console.log(e.message);
            toast.error("Signup failed: " + e.message);

        }
    };
    return { login };
};

export default useLogin;