import { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import usePageTitle from "../../hooks/usePageTitle";

const ForgotPassword = () => {
    usePageTitle("Forgot Password");
    const { resetPassword } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    const handleReset = (e) => {
        e.preventDefault();
        resetPassword(email)
            .then(() => {
                window.open("https://mail.google.com", "_blank");
                navigate("/auth/login");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "Error",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl p-5">
            <h2 className="font-bold text-2xl text-primary text-center">
                Reset Password
            </h2>
            <form
                onSubmit={handleReset}
                className="card-body text-base-content"
            >
                <label className="font-semibold">Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-primary bg-base-200 focus:border-base-100"
                    placeholder="Enter your email"
                    required
                />
                <button type="submit" className="btn btn-primary mt-4">
                    Send Reset Link
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
