import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import "./header.scss";

function Header() {
    const [active, setActive] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        const isHomePage = location.pathname === "/";

        setActive(isHomePage);
        // eslint-disable-next-line
    }, [location]);

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
        </header>
    );
}

export default Header;
