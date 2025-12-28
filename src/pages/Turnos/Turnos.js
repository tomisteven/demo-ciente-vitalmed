import React, { useState } from "react";
import CrearDisponibilidadForm from "./components/CrearDisponibilidadForm/CrearDisponibilidadForm";
import ListaTurnosAdmin from "./components/ListaTurnosAdmin/ListaTurnosAdmin";
import CalendarioTurnos from "./components/CalendarioTurnos/CalendarioTurnos";
import GestionEstudios from "../../Components/Estudios/GestionEstudios/GestionEstudios";
import { FaCalendarPlus, FaTable, FaFlask, FaCalendarAlt } from "react-icons/fa";
import Breadcrumbs from "../../utils/Breadcums";

import "./Turnos.css";

export default function Turnos() {
    const [tabActiva, setTabActiva] = useState("crear");

    const tabs = [
        { id: "crear", label: "Crear Disponibilidad", icon: <FaCalendarPlus /> },
        { id: "ver", label: "Lista de Turnos", icon: <FaTable /> },
        { id: "calendario", label: "Calendario", icon: <FaCalendarAlt /> },
        { id: "estudios", label: "Estudios", icon: <FaFlask /> },
    ];

    return (
        <div className="t-dashboard-container">
            <header className="t-header-tools">
                <Breadcrumbs />
                <div className="t-page-title">
                    <h2>Gestión de Turnos</h2>
                    <p>Administre la disponibilidad médica y visualice todas las reservas del centro.</p>
                </div>
            </header>

            {/* Modern Tab System */}
            <nav className="t-tabs-nav">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`t-tab-item ${tabActiva === tab.id ? "active" : ""}`}
                        onClick={() => setTabActiva(tab.id)}
                    >
                        <span className="t-tab-icon">{tab.icon}</span>
                        <span className="t-tab-label">{tab.label}</span>
                    </button>
                ))}
            </nav>

            {/* Main Content Area */}
            <div className="t-tab-content-wrapper fade-in-up">
                {tabActiva === "crear" && <CrearDisponibilidadForm />}
                {tabActiva === "ver" && <ListaTurnosAdmin />}
                {tabActiva === "estudios" && <GestionEstudios />}
                {tabActiva === "calendario" && <CalendarioTurnos />}
            </div>
        </div>
    );
}
