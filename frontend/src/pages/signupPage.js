// import "../../globalStyle.css";
import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { NavLink } from "react-router-dom";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const SignupPage = () => {

    // const SignupPageStyle = {
    //             display: 'flex',
    //             flexDirection: 'column',
    //             alignItems: 'center', 
    //             justifyContent: 'center',
    //             padding: '24px',
    // }
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signup} = useSignup();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            signup({email, password});
        }
        else{
            alert("Validation failed");
        }
    }

    
return (
    <div
    style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://res.cloudinary.com/dhja9jrwn/image/upload/v1721970433/icon.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '24px',
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        fontFamily: 'Arial, sans-serif',
    }}
    >
    <div
        style={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
    >
        <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px'
            }}
        >
            <FaUser style={{ fontSize: '48px' }}/>
        </div>
        <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '24px' }}>
            <p
            style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333',
            }}
            >
            Sign Up
            </p>
            {/* <p
            style={{
                fontSize: '16px',
                color: '#666',
            }}
            >
            Hey, Enter your details to login to your account
            </p> */}
        </div>
        {/* <input
            style={{
                width: '100%',
                padding: '12px',
                margin: '8px 0',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '16px',
            }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
        /> */}
        <input
            style={{
                width: '100%',
                padding: '12px',
                margin: '8px 0',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '16px',
            }}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
        />
        <input
            type="password"
            style={{
                width: '100%',
                padding: '12px',
                margin: '8px 0',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '16px',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <div style={{ marginTop: '26px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#666' , marginBottom: '10px' }}>
            Already have an account !
            </p>
            <NavLink
            to="/login"
            style={{
                textDecoration: 'none',
                color: '#3498db',
                fontWeight: 'bold',
                // marginLeft: '35%',
                // marginTop: '20px',
                // display: 'flex',
                // justifyContent: 'space-between'
            }}
            >
            Sign in!
            </NavLink>
        </div>

        <div style={{ marginTop: '28px' }}>
            <button
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#3498db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, transform 0.3s',
                }}
                onClick={handleSubmit}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#5dade2';
                    e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#3498db';
                    e.target.style.transform = 'scale(1)';
                }}
                >
                <p style={{ margin: '0' }}>Sign Up</p>
            </button>

            <p style={{ margin: '16px 0', color: '#999' }}>
            - Or Sign up with -
            </p>
            <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                gap: '8px',
            }}
            >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                }}
            >
                <FaGoogle size={15} />
                <p style={{ fontSize: '14px', color: '#333' }}>Google</p>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                }}
            >
                <FaApple size={15} />
                <p style={{ fontSize: '14px', color: '#333' }}>Apple ID</p>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                }}
            >
                <FaFacebook size={15} />
                <p style={{ fontSize: '14px', color: '#333' }}>Facebook</p>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
);
};

export default SignupPage;