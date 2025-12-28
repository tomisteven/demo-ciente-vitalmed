import React, { useState, useEffect } from "react";
import { TurnosApi } from "../../../../api/Turnos";
import { formatearFechaHora } from "../../../../utils/dateHelpers";
import {
    separarTurnosPorFecha,
    getEstadoColor,
    getEstadoLabel,
    ordenarTurnosPorFecha,
} from "../../../../utils/turnoHelpers";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaCalendarCheck, FaClock, FaUserMd, FaNotesMedical, FaTimes, FaInbox, FaHistory, FaCalendarAlt } from "react-icons/fa";
import "./MisTurnos.css";

const turnosApi = new TurnosApi();

export default function MisTurnos({ pacienteId }) {
    const [turnos, setTurnos] = useState({ proximos: [], pasados: [] });
    const [loading, setLoading] = useState(true);
    const [tabActiva, setTabActiva] = useState("proximos");

    useEffect(() => {
        if (pacienteId) {
            cargarTurnos();
        }
    }, [pacienteId]);

    const cargarTurnos = async () => {
        setLoading(true);
        try {
            const response = await turnosApi.obtenerMisTurnos(pacienteId);

            if (response) {
                const turnosArray = Array.isArray(response) ? response : [];
                const { proximos, pasados } = separarTurnosPorFecha(turnosArray);

                setTurnos({
                    proximos: ordenarTurnosPorFecha(proximos),
                    pasados: ordenarTurnosPorFecha(pasados),
                });
            }
        } catch (error) {
            console.error("Error al cargar turnos:", error);
            toast.error("Error al cargar sus turnos");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelar = async (turnoId) => {
        const result = await Swal.fire({
            title: "¿Cancelar turno?",
            text: "¿Está seguro que desea cancelar esta cita médica?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "No, mantener",
            borderRadius: '16px'
        });

        if (!result.isConfirmed) return;

        try {
            const response = await turnosApi.cancelarTurno(
                turnoId,
                "Cancelado por el paciente"
            );

            if (response) {
                toast.success("✓ Turno cancelado correctamente");
                cargarTurnos();
            }
        } catch (error) {
            console.error("Error al cancelar turno:", error);
            toast.error(error.message || "Error al cancelar el turno");
        }
    };

    const renderTurno = (turno) => {
        const fullDate = formatearFechaHora(turno.fecha);
        // Extracting day and hour for cleaner display if needed
        const [fechaStr, horaStr] = fullDate.split(' - ');

        return (
            <div key={turno._id} className="mt-card">
                <div className="mt-card-header">
                    <div className="mt-badge-group">
                        <span className="mt-status-badge" style={{ borderColor: getEstadoColor(turno.estado), color: getEstadoColor(turno.estado) }}>
                            {getEstadoLabel(turno.estado)}
                        </span>
                    </div>
                    <div className="mt-date-info">
                        <FaCalendarAlt /> <span>{fechaStr}</span>
                        <FaClock /> <span>{horaStr}</span>
                    </div>
                </div>

                <div className="mt-card-body">
                    <div className="mt-info-item">
                        <div className="mt-icon-circle"><FaUserMd /></div>
                        <div className="mt-info-text">
                            <span className="mt-label">Profesional Médico</span>
                            <span className="mt-value">{turno.doctor?.nombre || "Profesional a cargo"}</span>
                            <span className="mt-sub-value">{turno.especialidad || "Medicina General"}</span>
                        </div>
                    </div>

                    {turno.motivoConsulta && (
                        <div className="mt-info-item mt-motivo-box">
                            <div className="mt-icon-circle secondary"><FaNotesMedical /></div>
                            <div className="mt-info-text">
                                <span className="mt-label">Motivo de Consulta</span>
                                <span className="mt-value italic">"{turno.motivoConsulta}"</span>
                            </div>
                        </div>
                    )}
                </div>

                {turno.estado === "reservado" && tabActiva === "proximos" && (
                    <div className="mt-card-footer">
                        <button onClick={() => handleCancelar(turno._id)} className="mt-btn-abort">
                            <FaTimes /> Cancelar Cita
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="mt-component">
            {/* Nav Tabs */}
            <div className="mt-tabs">
                <button className={`mt-tab ${tabActiva === "proximos" ? "active" : ""}`} onClick={() => setTabActiva("proximos")}>
                    <FaCalendarCheck />
                    <span>Próximas Citas</span>
                    {turnos.proximos.length > 0 && <span className="mt-count">{turnos.proximos.length}</span>}
                </button>
                <button className={`mt-tab ${tabActiva === "pasados" ? "active" : ""}`} onClick={() => setTabActiva("pasados")}>
                    <FaHistory />
                    <span>Historial</span>
                    {turnos.pasados.length > 0 && <span className="mt-count gray">{turnos.pasados.length}</span>}
                </button>
            </div>

            {/* Content Area */}
            <div className="mt-content-grid">
                {loading ? (
                    <div className="mt-loader-container">
                        <div className="mt-spinner"></div>
                        <p>Sincronizando sus turnos...</p>
                    </div>
                ) : (
                    <>
                        {tabActiva === "proximos" ? (
                            turnos.proximos.length === 0 ? (
                                <div className="mt-empty">
                                    <div className="mt-empty-icon"><FaInbox /></div>
                                    <h3>No tienes citas pendientes</h3>
                                    <p>Cuando reserves un nuevo turno, aparecerá aquí.</p>
                                </div>
                            ) : (
                                <div className="mt-grid">
                                    {turnos.proximos.map(renderTurno)}
                                </div>
                            )
                        ) : (
                            turnos.pasados.length === 0 ? (
                                <div className="mt-empty">
                                    <div className="mt-empty-icon gray"><FaHistory /></div>
                                    <h3>Tu historial está vacío</h3>
                                    <p>Aquí se guardarán tus consultas finalizadas.</p>
                                </div>
                            ) : (
                                <div className="mt-grid">
                                    {turnos.pasados.map(renderTurno)}
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
