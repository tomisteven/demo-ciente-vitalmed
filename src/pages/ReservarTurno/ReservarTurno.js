import React from "react";
import BuscadorTurnos from "../../Components/Turnos/BuscadorTurnos/BuscadorTurnos";
import Breadcrumbs from "../../utils/Breadcums";
import { FaCalendarPlus } from "react-icons/fa";
import "./ReservarTurno.css";

export default function ReservarTurno() {
    return (
        <div className="rt-page-wrapper">
            <div className="rt-container">
                <header className="rt-header">
                    <Breadcrumbs />
                    <div className="rt-header-content">
                        <div className="rt-title-group">
                            <div className="rt-icon-box">
                                <FaCalendarPlus />
                            </div>
                            <div className="rt-text-box">
                                <h1>Reservar Nueva Cita</h1>
                                <p>Busca profesionales disponibles y agenda tu consulta en pocos pasos.</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="rt-main-content">
                    <BuscadorTurnos />
                </main>
            </div>
        </div>
    );
}
