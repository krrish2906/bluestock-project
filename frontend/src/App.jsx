import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

const App = () => {
    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? <Navigate to="/" replace /> : <Login />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            isAuthenticated ? <Navigate to="/" replace /> : <Register />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default App;
