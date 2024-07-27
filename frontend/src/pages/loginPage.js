import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { NavLink } from "react-router-dom";
import { FaApple, FaFacebook, FaGoogle, FaUser } from "react-icons/fa";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonColor, setButtonColor] = useState('#3498db'); // Initial button color
    const { login } = useLogin();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            login({ email, password });
        } else {
            alert("Validation failed");
        }
    };

    const handleButtonClick = () => {
        setButtonColor('#5dade2'); // Change color on click
        setTimeout(() => setButtonColor('#3498db'), 300); // Reset color after 300ms
    };

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
                boxSizing: 'border-box', // Ensure padding is included in the height
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
                    <FaUser style={{ fontSize: '48px' }} />
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
                            Sign in
                        </p>
                    </div>
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
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                            Don’t have an account yet?
                        </p>
                        <NavLink
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: '#3498db',
                                fontWeight: 'bold',
                            }}
                        >
                            Register now!
                        </NavLink>
                    </div>

                    <div style={{ marginTop: '28px' }}>
                        <button
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: buttonColor,
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onClick={() => {
                                handleButtonClick();
                                handleSubmit();
                            }}
                        >
                            <p style={{ margin: '0' }}>Login</p>
                        </button>

                        <p style={{ margin: '16px 0', color: '#999' }}>
                            - Or Sign in with -
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '12px',
                                marginTop: '12px'
                            }}
                        >
                            <a
                                href="https://accounts.google.com/signin"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textDecoration: 'none',
                                    color: '#333',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s, color 0.3s',
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGoogle size={24} />
                                <p style={{ fontSize: '16px', margin: '0' }}>Google</p>
                            </a>
                            <a
                                href="https://appleid.apple.com/"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textDecoration: 'none',
                                    color: '#333',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s, color 0.3s',
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaApple size={24} />
                                <p style={{ fontSize: '16px', margin: '0' }}>Apple ID</p>
                            </a>
                            <a
                                href="https://www.facebook.com/login"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textDecoration: 'none',
                                    color: '#333',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s, color 0.3s',
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebook size={24} />
                                <p style={{ fontSize: '16px', margin: '0' }}>Facebook</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @media (max-width: 600px) {
                    div {
                        padding: 16px;
                    }
                    input, button {
                        font-size: 14px;
                        padding: 10px;
                    }
                    .social-icons a {
                        font-size: 14px;
                        padding: 6px;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
