import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const useGenerateNewOtp = () => {
    const { token } = useSelector((e) => e.auth);
    const generateNewOtp = async () => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/otp/generate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (data.status === 'success') {
                toast.error(data.message);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (e) {
            console.log(e.message);
            toast.error("Error: " + e.message);
        }
    };

    return { generateNewOtp };
};

export default useGenerateNewOtp;