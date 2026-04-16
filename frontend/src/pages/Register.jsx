import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState("+91");
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags");
                const data = await res.json();

                const formatted = data.filter((c) => c.idd?.root && c.idd?.suffixes && c.idd.suffixes.length > 0)
                    .map((c) => ({
                        name: c.name.common,
                        code: `${c.idd.root}${c.idd.suffixes[0]}`,
                        flag: c.flags.png,
                    })).sort((a, b) => a.name.localeCompare(b.name));

                setCountries(formatted);
            } catch (error) {
                console.error("Registration error:", error);
                const errorMsg = error.response?.data?.message ||
                    error.message ||
                    "An error occurred during registration";
                setError(errorMsg);
                toast.error(errorMsg);
            } finally {
                setIsLoading(false);
            };
        };
        fetchCountries();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!fullName || !mobileNo || !email || !gender || !password || !confirmPassword) {
            const errorMsg = "Please fill in all fields";
            setError(errorMsg);
            toast.error(errorMsg);
            setIsLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            const errorMsg = "Passwords do not match";
            setError(errorMsg);
            toast.error(errorMsg);
            setIsLoading(false);
            return;
        }

        try {
            const res = await api.post("/auth/register", {
                fullName,
                email,
                password,
                mobileNo: `${countryCode}${mobileNo}`,
                gender,
            });

            if (res.data.success) {
                // Sign in the user
                await signInWithEmailAndPassword(auth, email, password);
                // Send verification email
                await sendEmailVerification(auth.currentUser);
                setRegistered(true);
                toast.success('Registration successful! Please check your email for verification.');
                // Redirect to login after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                const errorMsg = res.data.message || "Registration failed";
                setError(errorMsg);
                toast.error(errorMsg);
            };

        } catch (error) {
            console.error("Registration error:", error);
            const errorMsg = error.response?.data?.message ||
                error.message ||
                "An error occurred during registration";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex animate-scale-in border border-gray-100/80">
                {/* Left */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300 items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                    <img src="/Signup.svg" alt="login" className="h-95 relative z-10 drop-shadow-lg" />
                </div>

                {/* Right */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center animate-slide-up">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center tracking-tight">
                        Register as a Company
                    </h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm animate-fade-in">
                            {error}
                        </div>
                    )}
                    {!error && registered && (
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-sm animate-fade-in">
                            Registration successful 🎉
                            Please check your email and verify your account before logging in.
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                placeholder="full name"
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all duration-200 bg-gray-50/50 hover:border-gray-300 input-enhanced"
                            />
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mobile No
                            </label>
                            <div className="flex gap-2">
                                {/* Country Code Dropdown */}
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="w-20 px-2 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
                                >
                                    {countries.map((country) => (
                                        <option key={`${country.name}-${country.code}`} value={country.code}>
                                            {country.code}
                                        </option>
                                    ))}
                                </select>

                                {/* Mobile Input */}
                                <input
                                    type="tel"
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                    placeholder="Enter mobile number"
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all duration-200 bg-gray-50/50 hover:border-gray-300 input-enhanced"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Organization Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                placeholder="email address"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all duration-200 bg-gray-50/50 hover:border-gray-300 input-enhanced"
                            />
                        </div>

                        {/* Gender Pills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender
                            </label>
                            <div className="flex gap-3">
                                {["Male", "Female", "Other"].map((gen) => (
                                    <button
                                        key={gen}
                                        type="button"
                                        onClick={() => setGender(gen)}
                                        className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-200
                                            ${gender === gen
                                                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent shadow-md shadow-indigo-200"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                                            }`}
                                    >
                                        {gen}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Passwords */}
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        placeholder="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm pr-10 transition-all duration-200 bg-gray-50/50 hover:border-gray-300 input-enhanced"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ?
                                            <FiEyeOff className="cursor-pointer" /> :
                                            <FiEye className="cursor-pointer" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        placeholder="confirm password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm pr-10 transition-all duration-200 bg-gray-50/50 hover:border-gray-300 input-enhanced"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ?
                                            <FiEyeOff className="cursor-pointer" /> :
                                            <FiEye className="cursor-pointer" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Register */}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`w-full btn-primary-gradient text-white py-3 px-4 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registering...
                                </>
                            ) : 'Register'}
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-0">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
