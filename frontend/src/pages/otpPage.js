import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import useGenerateNewOtp from "../hooks/useGenerateNewOtp";
import useVerifyOtp from "../hooks/useVerifyOtp";

const OtpPage = () => {
const { email } = useSelector((e) => e.auth);
const [otp, setOtp] = useState(["", "", "", ""]);
const { generateNewOtp } = useGenerateNewOtp();
const { verifyOtp } = useVerifyOtp();

const handleChange = (value, index) => {
    if (value.length <= 1) {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
        document.getElementById(`otp${index + 1}`).focus();
    }
    }
};

const handleSubmit = () => {
    const otpString = otp.join("");
    if (otpString.length < 4) {
    alert("Please enter a valid OTP");
    } else {
    const num = parseInt(otpString);
    if (num >= 1000 && num < 9999) {
        verifyOtp(num);
    } else {
        alert("Invalid OTP. OTP must be a number");
    }
    }
};

useEffect(() => {
    generateNewOtp();
}, []);

return (
    <>
    <Navbar />
    <div style={styles.otpPageContainer}>
        <p>Email: {email}</p>
        <div style={styles.otpInputContainer}>
        {otp.map((value, index) => (
            <input
                key={index}
                id={`otp${index}`}
                maxLength={1}
                type="text"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                style={styles.input}
            />
        ))}
        </div>
        <button
            style={styles.button}
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
);
};

const styles = {
    otpPageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    margin: "20vh 25vw",
    gap: "20px",
    border: "1px solid gray",
    borderRadius: "5px",
    backgroundColor: "cadetblue",
    fontSize: "20px",
},
otpInputContainer: {
    display: "flex",
    gap: "10px",
},
input: {
    width: "50px",
    height: "50px",
    textAlign: "center",
    fontSize: "24px",
    border: "1px solid gray",
    borderRadius: "5px",
    outline: "none",
},
button: {
    backgroundColor: "#B4E380",
    transition: "background-color 0.3s, transform 0.3s",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
},
};

export default OtpPage;
