import React from "react";
import { useMisTurnos } from "./useMisTurnos";
import { formatearFechaHora } from "../../../utils/dateHelpers";
import { getEstadoColor, getEstadoLabel } from "../../../utils/turnoHelpers";
import "./MisTurnos.css";

export default function MisTurnos({ pacienteId }) {
    const {
        turnos,
        loading,
        tabActiva,
        setTabActiva,
        handleCancelar,
    } = useMisTurnos(pacienteId);

    const renderTurno = (turno) => (
        <div key={turno._id} className="turno-card">
            <div className="turno-card-header">
                <div className="turno-fecha">{formatearFechaHora(turno.fecha)}</div>
                <span
                    className="turno-badge"
                    style={{ backgroundColor: getEstadoColor(turno.estado) }}
                >
                    {getEstadoLabel(turno.estado)}
                </span>
            </div>

            <div className="turno-card-body">
                <div className="turno-info-row">
                    <span className="turno-label">Médico:</span>
                    <span className="turno-value">{turno.doctor?.nombre || "No especificado"}</span>
                </div>

                <div className="turno-info-row">
                    <span className="turno-label">Especialidad:</span>
                    <span className="turno-value">{turno.especialidad || "No especificada"}</span>
                </div>

                {turno.motivoConsulta && (
                    <div className="turno-info-row turno-motivo">
                        <span className="turno-label">Motivo:</span>
                        <span className="turno-value">{turno.motivoConsulta}</span>
                    </div>
                )}
            </div>

            {turno.estado === "reservado" && tabActiva === "proximos" && (
                <div className="turno-card-footer">
                    <button
                        onClick={() => handleCancelar(turno._id)}
                        className="btn-cancelar-turno"
                    >
                        Cancelar Turno
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="mis-turnos">
            <h3>Mis Turnos</h3>

            <div className="tabs-container">
                <button
                    className={`tab ${tabActiva === "proximos" ? "tab-active" : ""}`}
                    onClick={() => setTabActiva("proximos")}
                >
                    Próximos Turnos
                    {turnos.proximos.length > 0 && (
                        <span className="tab-badge">{turnos.proximos.length}</span>
                    )}
                </button>
                <button
                    className={`tab ${tabActiva === "pasados" ? "tab-active" : ""}`}
                    onClick={() => setTabActiva("pasados")}
                >
                    Historial
                    {turnos.pasados.length > 0 && (
                        <span className="tab-badge">{turnos.pasados.length}</span>
                    )}
                </button>
            </div>

            <div className="tab-content">
                {loading ? (
                    <div className="loading-message">Cargando turnos...</div>
                ) : tabActiva === "proximos" ? (
                    turnos.proximos.length === 0 ? (
                        <div className="empty-message">
                            <p>No tiene turnos próximos.</p>
                            <p className="empty-hint">Puede buscar y reservar turnos disponibles.</p>
                        </div>
                    ) : (
                        <div className="turnos-list">
                            {turnos.proximos.map(renderTurno)}
                        </div>
                    )
                ) : turnos.pasados.length === 0 ? (
                    <div className="empty-message">
                        <p>No tiene turnos en el historial.</p>
                    </div>
                ) : (
                    <div className="turnos-list">
                        {turnos.pasados.map(renderTurno)}
                    </div>
                )}
            </div>
        </div>
    );
}
