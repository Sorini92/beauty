import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useUserService from "../services/UserService";
import { UserContext } from "../context/user/userContext";

const useAuth = () => {
    const { checkUser } = useUserService();
    const { setAuth, name } = useContext(UserContext);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const localStorageToken = localStorage.getItem("beautyAdminAccessToken");

        if (localStorageToken === null) {
            navigate("/login");
        } else {
            checkUser(localStorageToken)
                .then((res) => {
                    if (res === undefined || res === null) {
                        localStorage.removeItem("beautyAdminAccessToken");
                        localStorage.removeItem("beautyAdminLogin");

                        setIsAuth(false);
                        navigate("/login");
                    } else {
                        setAuth({
                            name: res.name,
                            token: res.token,
                        });

                        setIsAuth(true);
                    }
                })
                .catch((e) => {
                    throw new Error(e);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    return {
        name,
        isAuth,
    };
};

export default useAuth;
