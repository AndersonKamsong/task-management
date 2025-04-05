import React, { useState } from "react";
import UserService from "../services/UserService";
import SweetAlert2 from 'react-sweetalert2';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [swalProps, setSwalProps] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        let user = {
            email: email,
            password: password,
        }
        e.preventDefault();
        setLoading(true)
        setSwalProps({})
        try {
            let result = await UserService.login(user)
            // console.log(result);
            setSwalProps({
                show: true,
                title: 'Login successfully ',
                text: result.message,
                icon: 'success',
            });
            setTimeout(() => {
                localStorage.setItem("user_token", JSON.stringify(result.token));
                window.location = '/'
            }, 1000);
        } catch (error) {
            setSwalProps({
                show: true,
                title: 'An error occur',
                text: error || "Some went wrong try later",
                icon: 'error',
                // icon: 'success',
            });
            // setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-[#f4d03f] flex items-center justify-center font-montserrat">
            <div className="w-full max-w-md bg-[#263d3d] p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 w-96">Login</h2>
                <SweetAlert2 {...swalProps} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2 text-[#f4d03f]"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-[#1e1e1e] text-[#f4d03f] border border-[#f4d03f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#308a8a] focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2 text-[#f4d03f]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-[#1e1e1e] text-[#f4d03f] border border-[#f4d03f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#308a8a] focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#f4d03f] text-[#1e1e1e] rounded-lg font-semibold hover:bg-opacity-90 focus:outline-none"
                    >
                        Login
                    </button>
                    <p className="text-sm mt-4 text-center">
                        {" "}
                        <a
                            onClick={() => { }}
                            className="text-[#308a8a] hover:underline"
                            style={{ cursor: "pointer" }}
                        >
                            {"Login with email"}
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
