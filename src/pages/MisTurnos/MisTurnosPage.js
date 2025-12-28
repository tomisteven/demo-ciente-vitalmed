import React from "react";
import MisTurnos from "./components/MisTurnosComponent/MisTurnos";
import Breadcrumbs from "../../utils/Breadcums";
import { FaCalendarAlt } from "react-icons/fa";
import "./MisTurnosPage.css";

export default function MisTurnosPage() {
    // Obtener el usuario logueado
    const user = JSON.parse(localStorage.getItem("userLog"));
    const pacienteId = user?.usuario._id;
    const nombrePaciente = user?.usuario.nombre || "Paciente";

    if (!pacienteId) {
        return (
            <div className="mt-page-wrapper mt-error-state">
                <div className="mt-error-card">
                    <FaCalendarAlt className="mt-error-icon" />
                    <h2>Acceso Restringido</h2>
                    <p>Debe iniciar sesión para visualizar y gestionar sus turnos médicos.</p>
                    <button onClick={() => window.location.href = "/auth"} className="mt-btn-login">
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-page-wrapper">
            <div className="mt-container">
                <header className="mt-header">
                    <Breadcrumbs />
                    <div className="mt-header-content">
                        <div className="mt-title-group">
                            <div className="mt-icon-box">
                                <FaCalendarAlt />
                            </div>
                            <div className="mt-text-box">
                                <h1>Mis Turnos Médicos</h1>
                                <p>Hola, <strong>{nombrePaciente}</strong>. Aquí puedes ver el historial y estado de tus citas.</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="mt-main-content">
                    <MisTurnos pacienteId={pacienteId} />
                </main>
            </div>
        </div>
    );
}
