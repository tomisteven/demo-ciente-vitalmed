import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiUser,
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiClipboard,
  FiClock,
  FiGrid
} from "react-icons/fi";
import { FaUserDoctor } from "react-icons/fa6";
import "./AdminMenu.css";

export default function AdminMenu({ onLoad }) {
  const user = JSON.parse(localStorage.getItem("userLog"));
  const userRole = user ? user.rol : "";
  const location = useLocation().pathname;
  const [activeItem, setActiveItem] = useState(location);

  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  useEffect(() => {
    setActiveItem(location);
  }, [location]);

  const sections = [
    {
      title: "PRINCIPAL",
      roles: ["doctor", "secretaria", "paciente"],
      items: [
        {
          key: "/",
          path: "/",
          label: "Dashboard",
          icon: <FiGrid />,
          roles: ["doctor", "secretaria"],
        },
        {
          key: "/admin/pacientes/" + user?.usuario?._id,
          path: "/admin/pacientes/" + user?.usuario?._id,
          label: "Mi Perfil",
          icon: <FiUser />,
          roles: ["paciente"],
        },
      ]
    },
    {
      title: "GESTIÓN CLÍNICA",
      roles: ["doctor", "secretaria"],
      items: [
        {
          key: "/admin/turnos",
          path: "/admin/turnos",
          label: "Gestion Turnos",
          icon: <FiCalendar />,
          roles: ["doctor", "secretaria"],
        },
        {
          key: "/admin/pacientes",
          path: "/admin/pacientes",
          label: "Base de Pacientes",
          icon: <FiUsers />,
          roles: ["doctor", "secretaria"],
        },
      ]
    },
    {
      title: "ADMINISTRACIÓN",
      roles: ["secretaria"],
      items: [
        {
          key: "/admin/doctores",
          path: "/admin/doctores",
          label: "Staff Médico",
          icon: <FaUserDoctor />,
          roles: ["secretaria"],
        },
        {
          key: "/admin/secretarias",
          path: "/admin/secretarias",
          label: "Personal Adm.",
          icon: <FiUserCheck />,
          roles: ["secretaria"],
        },
      ]
    },
    {
      title: "MIS CITAS",
      roles: ["paciente"],
      items: [
        {
          key: "/admin/mis-turnos",
          path: "/admin/mis-turnos",
          label: "Mis Turnos",
          icon: <FiClipboard />,
          roles: ["paciente"],
        },
        {
          key: "/admin/reservar-turno",
          path: "/admin/reservar-turno",
          label: "Nueva Cita",
          icon: <FiClock />,
          roles: ["paciente"],
        },
      ]
    }
  ];

  return (
    <nav className="admin-sidebar">
      <div className="sidebar-container">
        {sections.map((section, sIdx) => {
          const filteredItems = section.items.filter(item => item.roles.includes(userRole));
          if (filteredItems.length === 0) return null;

          return (
            <div key={sIdx} className="sidebar-section">
              <span className="section-header">{section.title}</span>
              <div className="section-items">
                {filteredItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={`sidebar-item ${activeItem === item.key ? "active" : ""}`}
                    title={item.label}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-label">{item.label}</span>
                    {activeItem === item.key && <span className="active-indicator" />}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
