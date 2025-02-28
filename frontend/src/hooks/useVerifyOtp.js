import { useDispatch, useSelector } from "react-redux";
import { appLogout, emailVerified } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const useVerifyOtp = () => {
  const { token } = useSelector((e) => e.auth);
  const dispatch = useDispatch();

  const verifyOtp = async (otp) => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/v1/otp/verify`, {
        method: "POST",
        body: JSON.stringify({ otp }),
        headers: {
          "content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
      const data = await res.json();

      console.log(data);

      if (data.message === "Unauthorized") {
        dispatch(appLogout());
      } else if (data.status === "success") {
        dispatch(emailVerified());
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
  return { verifyOtp };
};

export default useVerifyOtp;