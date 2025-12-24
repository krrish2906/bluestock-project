import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState("+91");

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
            } catch (err) {
                setError("Failed to load countries")
                console.error("Failed to load countries", err);
            }
        };
        fetchCountries();
    }, []);
    
    const handleSubmit = async () => {
        setError("");
        
        if (!fullName || !mobileNo || !email || !gender || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        try {
            await api.post("/auth/register", {
                full_name: fullName,
                mobile_no: `${countryCode}${mobileNo}`,
                email,
                gender,
                password,
            });
            
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full flex">
                {/* Left */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-pink-200 via-purple-300 to-purple-300 items-center justify-center">
                    <img src="/Signup.svg" alt="login" className="h-95" />
                </div>

                {/* Right */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Register as a Company
                    </h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {error}
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
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
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
                                    className="w-20 px-2 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
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
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
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
                                        className={`px-6 py-2 rounded-full text-sm font-medium border transition
                                            ${gender === gen
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
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
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-full mt-2"
                        >
                            Register
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-0">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 font-medium hover:underline"
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
