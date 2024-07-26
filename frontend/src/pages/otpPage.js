import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import useGenerateNewOtp from "../hooks/useGenerateNewOtp";
import useVerifyOtp from "../hooks/useVerifyOtp";

const OtpPage = () => {
    const {email} = useSelector((e)=>e.auth);
    const [otp, setOtp] = useState("");
    const {generateNewOtp} = useGenerateNewOtp();
    const {verifyOtp} = useVerifyOtp();

    const handleSubmit = () => {
        if(otp.length < 4) {
            alert("Please enter a valid OTP");
        }
        else{
            const num = parseInt(otp);
            if(num >= 1000 && num <9999) {
                verifyOtp(num);
            }
            else{
                alert("Invalid OTP. OTP must me a number");
            }
        }
    }

    useEffect(() =>{
        generateNewOtp();
    }, []);

    return (<>
        <Navbar/>
        <div className="otp-page-container">
        <p>Email: {email}</p>
        <div className="otp-input-container">
                <input maxLength={4} type="text" value={otp} onChange={(e) => setOtp(e.target.value)}/>
        <div className="otp-column c1"></div>
        <div className="otp-column c2"></div>
        <div className="otp-column c3"></div>
        <div className="otp-column c4"></div>
        </div>
            <button
                style={{
                    backgroundColor: "#B4E380",
                    transition: "background-color 0.3s, transform 0.3s",
                }}
                onClick={handleSubmit}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#deb887";
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#B4E380";
                }}
                >
                Verify
            </button>
        </div>
        </>
    )
}

export default OtpPage;