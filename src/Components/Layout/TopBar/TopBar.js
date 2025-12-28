import React from "react";
import { FaUserCircle, FaSignOutAlt, FaBell, FaSearch } from "react-icons/fa";
import "./TopBar.css";

export default function TopBar() {
    const userLog = JSON.parse(localStorage.getItem("userLog"));

    if (!userLog || !userLog.usuario) return null;

    const { usuario: user, rol } = userLog;

    const handleLogout = () => {
        if (window.confirm("¿Está seguro que desea cerrar sesión?")) {
            localStorage.removeItem("userLog");
            window.location.href = "/";
        }
    };

    const initials = user.nombre ? user.nombre.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "??";

    return (
        <header className="top-bar">
            <div className="top-bar__left">
                <div className="search-wrapper">

                </div>
            </div>

            <div className="top-bar__right">


                <div className="user-nav-info">
                    <div className="user-details">
                        <span className="user-name">{user.nombre}</span>
                        <span className="user-role">{rol.toUpperCase()}</span>
                    </div>
                    <div className="user-avatar-circle">
                        {initials}
                    </div>
                </div>

                <button className="top-logout-btn" onClick={handleLogout} title="Cerrar Sesión">
                    <FaSignOutAlt />
                </button>
            </div>
        </header>
    );
}
