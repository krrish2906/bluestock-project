import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import api from "../api/axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            dispatch(loginSuccess(res.data.data.token));
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full flex">
                {/* Left Side */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-pink-200 via-purple-300 to-purple-300 items-center justify-center">
                    <img src="/Login.svg" alt="login" className="h-95" />
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Login as a Company
                    </h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email ID
                            </label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <a
                                href="#"
                                className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                            >
                                Login with OTP
                            </a>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter your password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="cursor-pointer" size={20} />
                                    ) : (
                                        <FiEye className="cursor-pointer" size={20} />
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center mt-2">
                                <span className="text-yellow-500 mr-1">🔑</span>
                                <a
                                    href="#"
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    Forgot Password ?
                                </a>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#5c7fff] hover:bg-[#5c7fff]/90 text-white font-medium py-3 rounded-3xl transition-colors duration-200 mt-6 cursor-pointer"
                        >
                            Login
                        </button>

                        {/* Sign Up */}
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
