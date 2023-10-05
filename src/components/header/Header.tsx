import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user/userContext";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

import "./header.scss";

function Header() {
    const { setAuth, name } = useContext(UserContext);

    const [active, setActive] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isHomePage = location.pathname === "/";

        setActive(isHomePage);
        // eslint-disable-next-line
    }, [location]);

    const logOut = () => {
        setAuth({ name: "", token: "" });

        localStorage.removeItem("beautyAdminAccessToken");
        localStorage.removeItem("beautyAdminLogin");

        navigate("/login");
    };

    if (!name) return null;

    return (
        <header className="header">
            <Link to="/" className="logo">
                Beauty
                <br />
                Admin
            </Link>
            <nav>
                <ul className="header__list">
                    <li className={active ? "header__link header__link_active" : "header__link"}>
                        <NavLink
                            to="/schedule"
                            className={({ isActive }) => (isActive ? "header__link_active" : "")}
                        >
                            Schedule
                        </NavLink>
                    </li>
                    <li className="header__link">
                        <NavLink
                            to="/history"
                            className={({ isActive }) => (isActive ? "header__link_active" : "")}
                        >
                            History
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="header__logout">
                <div className="header__logout-name">{name}</div>
                <button className="header__logout-btn" onClick={() => logOut()}>
                    logout
                </button>
            </div>
        </header>
    );
}

export default Header;
