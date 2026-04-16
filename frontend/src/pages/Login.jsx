import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import api from "../api/axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await api.post("/auth/login", {
                email, password
            }, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });

            if (res.data.success) {
                dispatch(loginSuccess(res.data.data.token));
                toast.success('Logged in successfully!');
                navigate('/');
            } else {
                setError(res.data.message || 'Login failed');
                toast.error(res.data.message || 'Login failed');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Login failed";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }

        // Email verification
        try {
            await api.get('/auth/verify-email', {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Email verification failed";
            setError(errorMsg);
            toast.warning(errorMsg);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex animate-scale-in border border-gray-100/80">
                {/* Left Side */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300 items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                    <img src="/Login.svg" alt="login" className="h-95 relative z-10 drop-shadow-lg" />
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center animate-slide-up">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center tracking-tight">
                        Login as a Company
                    </h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm animate-fade-in">
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
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:border-gray-300 input-enhanced"
                            />
                            <a
                                href="#"
                                className="text-indigo-600 text-sm mt-2 inline-block hover:text-indigo-700 transition-colors font-medium"
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 pr-12 bg-gray-50/50 hover:border-gray-300 input-enhanced"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                                    className="text-indigo-600 text-sm hover:text-indigo-700 transition-colors font-medium"
                                >
                                    Forgot Password ?
                                </a>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full btn-primary-gradient text-white font-semibold py-3 rounded-xl mt-6 cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </>
                            ) : 'Login'}
                        </button>

                        {/* Sign Up */}
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
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
