import { use, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import usePageTitle from "../../hooks/usePageTitle";

const swalError = (msg) => {
    Swal.fire({
        position: "top-end",
        icon: "error",
        text: msg,
    });
};

const Login = () => {
    usePageTitle("Login");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { userSignIn, googleSignIn } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        userSignIn(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                swalError(error.message);
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {
                navigate(location?.state || "/");
            })
            .catch((error) => {
                setError(error.code);
            });
    };

    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl p-5">
            <h2 className="font-bold text-2xl text-primary text-center">
                Login
            </h2>
            <div className="card-body text-base-content">
                <form onSubmit={handleLogin} className="fieldset">
                    <label className="font-semibold">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-primary bg-base-200 focus:border-base-100"
                        placeholder="Enter your email address"
                        required
                    />

                    <label className="font-semibold">Password</label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full text-sm bg-base-200 rounded px-4 py-2.5 pr-12 focus:outline-2 outline-offset-2 outline-primary border-1 border-primary focus:border-base-100"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-base-content cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible />
                            ) : (
                                <AiOutlineEye />
                            )}
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <p className="mt-2">
                        <Link
                            to="/auth/forgot-password"
                            state={{ email }}
                            className="text-sm text-primary hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </p>

                    <button type="submit" className="btn btn-primary mt-4">
                        Login
                    </button>
                </form>

                <div className="divider">OR</div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn btn-outline flex items-center justify-center gap-2"
                >
                    <FcGoogle className="text-xl" />
                    <span>Continue with Google</span>
                </button>

                <p className="text-center font-semibold mt-3">
                    Don't Have An Account?{" "}
                    <Link className="text-primary" to={"/auth/register"}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
