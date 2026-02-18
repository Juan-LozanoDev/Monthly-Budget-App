import { Link } from "react-router-dom";
import Input from "../../components/auth/Input";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/helper";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault()

        if(!validateEmail(email)) {
            setError("Please, enter a valid email address")
            return;
        }

        if(!validatePassword(password)) {
            setError("Please, enter a valid password")
            return;
        }

        setError("")

        // Validation successfully
        // API CALL LOGIN
    }

    return (
        <main className="flex md:flex-row flex-col items-center justify-between h-dvh gap-1">
            <section className="dark m-auto flex flex-col gap-3 px-4 md:max-w-lg md:w-1/2 ">
                <h3>Welcome Back</h3>
                <p className="text-blue-400 text-lg italic">Please enter your details to access you dashboard</p>
                <form>
                    <Input
                        value={email}
                        type={"email"}
                        placeholder="example@mail.com"
                        onChange={({ target }) => setEmail(target.value)}
                        label={"Email Address"}
                        name={"email"}
                    />
                    <Input
                        value={password}
                        type={"password"}
                        placeholder="Min. 8 Characters"
                        onChange={({ target }) => setPassword(target.value)}
                        label={"Password"}
                        name={"password"}
                    />

                    {error ? <p className="text-rose-400">{error}</p> : <></>}
                    <button className="w-full py-3 bg-blue-600 text-zinc-200 font-bold rounded-md my-6 cursor-pointer hover:bg-blue-600/90 transition-colors ease-in-out" onClick={handleLogin}>Sign In</button>
                </form>
                <p className="text-center">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="text-blue-500 font-bold hover:text-blue-500/80 transition-all ease-in-out">
                        Sign Up
                    </Link>
                </p>
            </section>
            <div className="hidden md:block w-[45vw] h-screen">
                <img src="/Images/Main.webp" alt="FinanceApp" className="size-full object-center object-cover" />
            </div>
        </main>
    );
};

export default Login;
