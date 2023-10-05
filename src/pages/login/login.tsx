import { useState, FormEvent, ChangeEvent, useContext, useEffect } from "react";
import { UserContext } from "../../context/user/userContext";
import { useNavigate } from "react-router-dom";
import useUserService from "../../services/UserService";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/spinner/Spinner";

import "./login.scss";

const LoginPage = () => {
    const { setAuth } = useContext(UserContext);
    const { getUser, loadingStatus } = useUserService();

    const navigate = useNavigate();
    const { isAuth } = useAuth();

    const [user, setUser] = useState({ name: "", password: "" });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        getUser(user)
            .then((res) => {
                if (res) {
                    if (user.password === res.password) {
                        setAuth({
                            name: res.name,
                            token: res.token,
                        });

                        localStorage.setItem("beautyAdminAccessToken", res.token);
                        localStorage.setItem("beautyAdminLogin", res.name);

                        setMessage("");
                        navigate("/");
                    } else {
                        setMessage("Wrong password");
                    }
                } else {
                    setMessage("This user is not existing");
                }
            })
            .catch(() => {
                throw new Error();
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form className="caform login" onSubmit={handleSubmit}>
            <div className="caform__title">Manager sign in</div>

            {loadingStatus === "loading" ? (
                <Spinner />
            ) : (
                <>
                    <label htmlFor="name">
                        Name<span>*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Meneger name"
                        required
                        onChange={handleChange}
                        value={user.name}
                    />

                    <label htmlFor="password">
                        Password<span>*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        value={user.password}
                    />

                    <div className="message">{message}</div>
                </>
            )}

            <button disabled={loadingStatus === "loading"}>Sign in</button>
        </form>
    );
};

export default LoginPage;
