import { use, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
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

const Register = () => {
    usePageTitle("Register");
    const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Validation
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < 8) {
            swalError("Password must be at least 8 characters long");
            return;
        }

        if (!uppercaseRegex.test(password)) {
            swalError("Password must contain at least one uppercase letter");
            return;
        }

        if (!lowercaseRegex.test(password)) {
            swalError("Password must contain at least one lowercase letter");
            return;
        }

        if (!specialCharRegex.test(password)) {
            swalError("Password must contain at least one special character");
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo }).then(() => {
                    setUser({ ...user, displayName: name, photoURL: photo });
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Registration successful!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/");
                });
            })
            .catch((err) => {
                swalError(err.message);
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                swalError(err.message);
            });
    };

    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl p-5">
            <h2 className="font-bold text-2xl text-primary text-center">
                Register
            </h2>
            <div className="card-body text-base-content">
                <form onSubmit={handleRegister} className="fieldset">
                    {/* Name */}
                    <label className="font-semibold">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        className="input input-primary bg-base-200 focus:border-base-100"
                        placeholder="Enter your name"
                        required
                    />

                    {/* Photo URL */}
                    <label className="font-semibold">Photo URL</label>
                    <input
                        type="text"
                        name="photo"
                        className="input input-primary bg-base-200 focus:border-base-100"
                        placeholder="Enter your photo url"
                        required
                    />

                    {/* Email */}
                    <label className="font-semibold">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        className="input input-primary bg-base-200 focus:border-base-100"
                        placeholder="Enter your email address"
                        required
                    />

                    {/* Password */}
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

                    <button type="submit" className="btn btn-primary mt-4">
                        Register
                    </button>
                </form>

                <div className="divider">or</div>

                <button
                    onClick={handleGoogleLogin}
                    className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                    <FcGoogle className="text-2xl" />
                    Continue with Google
                </button>

                <p className="text-center font-semibold mt-3">
                    Have An Account? Please{" "}
                    <Link className="text-primary" to={"/auth/login"}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
