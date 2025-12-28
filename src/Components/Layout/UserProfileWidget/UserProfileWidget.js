import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./UserProfileWidget.css";

export default function UserProfileWidget() {
    const userLog = JSON.parse(localStorage.getItem("userLog"));

    if (!userLog || !userLog.usuario) return null;

    const { usuario: user, rol } = userLog;

    const handleLogout = () => {
        if (window.confirm("¿Está seguro que desea cerrar sesión?")) {
            localStorage.removeItem("userLog");
            window.location.href = "/";
        }
    };

    // Get initials for avatar if no photo (placeholder logic)
    const initials = user.nombre ? user.nombre.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "??";

    return (
        <div className="user-profile-widget">
            <div className="upw-profile-info">
                <div className="upw-avatar">
                    {initials}
                </div>
                <div className="upw-text-content">
                    <span className="upw-name">{user.nombre}</span>
                    <span className="upw-role">{rol.toUpperCase()}</span>
                </div>
            </div>
            <button className="upw-logout-btn" onClick={handleLogout} title="Cerrar Sesión">
                <FaSignOutAlt />
            </button>
        </div>
    );
}
