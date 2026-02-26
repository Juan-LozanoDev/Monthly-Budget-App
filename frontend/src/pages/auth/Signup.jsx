import { useContext, useState } from "react";
import Input from "../../components/auth/Input";
import { validateEmail, validateName, validatePassword } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../utils/apiRoutes";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { updateUser } = useContext(UserContext);


    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validateName(fullname)) {
            setError("Please, enter a valid name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please, enter a valid email address");
            return;
        }

        if (!validatePassword(password)) {
            setError("Please, enter a valid password");
            return;
        }

        if (password != confirmPassword) {
            setError("The passwords don't match, please confirm the password");
            return;
        }

        setError("");

        // Validation successfully
        // API CALL SIGN UP

        try {
            const response = await fetch(`http://localhost:8000${API_ROUTES.AUTH.REGISTER}`, {
                method: "POST",
                body: JSON.stringify({ Fullname: fullname, Email: email, Password: password }),
                headers: { "content-type": "application/json; charset=UTF-8" },
                credentials: "include",
            });

            if (response.status !== 200) {
                const message = await response.json();
                setError(message);
                return;
            }

            const { authenticated, user } = await response.json();

            if (user) {
                localStorage.setItem("autheticated", authenticated);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <main className="h-dvh w-full flex justify-center items-center">
            <section className="p-4 md:w-2/5 md:min-w-lg bg-white rounded-xl shadow">
                <h3>Create an account</h3>
                <p className="text-blue-400 text-lg italic">Start managing your wealth with professional tools</p>

                <form>
                    <Input
                        value={fullname}
                        type={"text"}
                        placeholder={"Juan Lozano"}
                        onChange={({ target }) => setFullName(target.value)}
                        label={"Full name"}
                        name={fullname}
                    />

                    <Input
                        value={email}
                        type={"email"}
                        placeholder={"example@mail.com"}
                        onChange={({ target }) => setEmail(target.value)}
                        label={"Email Address"}
                        name={"email"}
                    />

                    <div className="block md:grid grid-cols-2 gap-4">
                        <Input
                            value={password}
                            type={"password"}
                            placeholder={"Min. 8 Characters"}
                            onChange={({ target }) => setPassword(target.value)}
                            label={"Password"}
                            name={"password"}
                        />

                        <Input
                            value={confirmPassword}
                            type={"password"}
                            placeholder={"Min. 8 Characters"}
                            onChange={({ target }) => setConfirmPassword(target.value)}
                            label={"Confirm Password"}
                            name={"confirm_password"}
                        />
                    </div>

                    {error ? <p className="text-rose-400">{error}</p> : <></>}
                    <button
                        className="w-full py-3 bg-blue-600 text-zinc-200 font-bold rounded-md my-6 cursor-pointer hover:bg-blue-600/90 transition-colors ease-in-out shadow-md shadow-gray-400"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center">
                    Already have an account?{" "}
                    <Link
                        to={"/login"}
                        className="text-blue-500 font-bold hover:text-blue-500/80 transition-all ease-in-out"
                    >
                        Login
                    </Link>
                </p>
            </section>
        </main>
    );
};

export default Signup;
