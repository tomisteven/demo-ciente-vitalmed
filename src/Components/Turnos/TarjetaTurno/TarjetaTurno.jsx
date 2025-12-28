import React from "react";
import { useTarjetaTurno } from "./useTarjetaTurno";
import { formatearFechaHora } from "../../../utils/dateHelpers";
import { FaUserMd, FaRegClock, FaRegCalendarAlt, FaStethoscope, FaFlask, FaMoneyBillWave, FaTimes, FaCheckCircle, FaExclamationTriangle, FaNotesMedical } from "react-icons/fa";
import "./TarjetaTurno.css";

export default function TarjetaTurno({ turno, onReservado }) {
    const {
        showModal,
        motivoConsulta,
        estudioId,
        estudios,
        loadingEstudios,
        loading,
        estudioAsignado,
        setMotivoConsulta,
        setEstudioId,
        handleReservar,
        handleCancelar,
        handleConfirmar,
    } = useTarjetaTurno(turno, onReservado);

    const fullDate = formatearFechaHora(turno.fecha);
    const [fechaStr, horaStr] = fullDate.split(' - ');

    return (
        <>
            <div className="card-appointment">
                <header className="card-app-header">
                    <div className="card-app-date">
                        <FaRegCalendarAlt /> <span>{fechaStr}</span>
                    </div>
                    <div className="card-app-time">
                        <FaRegClock /> <span>{horaStr}</span>
                    </div>
                </header>

                <div className="card-app-body">
                    <div className="card-app-info">
                        <div className="card-app-icon"><FaUserMd /></div>
                        <div className="card-app-details">
                            <span className="card-app-label">Profesional</span>
                            <span className="card-app-value">{turno.doctor?.nombre || "Profesional Médico"}</span>
                        </div>
                    </div>

                    <div className="card-app-info">
                        <div className="card-app-icon secondary"><FaStethoscope /></div>
                        <div className="card-app-details">
                            <span className="card-app-label">Especialidad</span>
                            <span className="card-app-value spec-text">{turno.especialidad || "Medicina General"}</span>
                        </div>
                    </div>

                    {(estudioAsignado || (turno.estudio?.precio > 0)) && (
                        <div className="card-app-extra">
                            {estudioAsignado && (
                                <div className="extra-pill study-pill">
                                    <FaFlask /> <span>{estudioAsignado}</span>
                                </div>
                            )}
                            {turno.estudio?.precio > 0 && (
                                <div className="extra-pill price-pill">
                                    <FaMoneyBillWave /> <span>${turno.estudio.precio}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="card-app-footer">
                    <button onClick={handleReservar} className="btn-app-action">
                        Reservar Turno
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal-app-overlay" onClick={handleCancelar}>
                    <div className="modal-app-content scale-in" onClick={(e) => e.stopPropagation()}>
                        <header className="modal-app-header">
                            <div className="modal-app-title">
                                <div className="modal-title-icon"><FaRegCalendarAlt /></div>
                                <h4>Confirmar Reserva</h4>
                            </div>
                            <button className="modal-app-close" onClick={handleCancelar}><FaTimes /></button>
                        </header>

                        <div className="modal-app-body">
                            {/* Summary Strip */}
                            <div className="modal-app-summary">
                                <div className="summary-item">
                                    <FaRegCalendarAlt />
                                    <div className="sum-text">
                                        <label>Fecha y Hora</label>
                                        <span>{fullDate}</span>
                                    </div>
                                </div>
                                <div className="summary-item">
                                    <FaUserMd />
                                    <div className="sum-text">
                                        <label>Médico</label>
                                        <span>{turno.doctor?.nombre}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-app-form">
                                <div className="app-input-group">
                                    <label htmlFor="estudioId">
                                        <FaFlask /> Estudio Médico <span className="req">*</span>
                                    </label>
                                    <div className="select-wrapper">
                                        <select
                                            id="estudioId"
                                            value={estudioId}
                                            onChange={(e) => setEstudioId(e.target.value)}
                                            disabled={loading || loadingEstudios}
                                        >
                                            <option value="">
                                                {loadingEstudios ? "Cargando catálogo..." : "-- Seleccione el estudio --"}
                                            </option>
                                            {estudios.map((estudio) => (
                                                <option key={estudio._id} value={estudio._id}>
                                                    {estudio.tipo} {estudio.precio ? `- $${estudio.precio}` : ""}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {estudios.length === 0 && !loadingEstudios && (
                                        <div className="app-warning-msg">
                                            <FaExclamationTriangle />
                                            <span>No hay estudios disponibles para esta especialidad</span>
                                        </div>
                                    )}
                                </div>

                                <div className="app-input-group">
                                    <label htmlFor="motivoConsulta">
                                        <FaNotesMedical className="icon-notes" /> Motivo de consulta <span className="req">*</span>
                                    </label>
                                    <textarea
                                        id="motivoConsulta"
                                        value={motivoConsulta}
                                        onChange={(e) => setMotivoConsulta(e.target.value)}
                                        placeholder="Por favor, describe brevemente por qué solicitas la cita..."
                                        rows="4"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="modal-app-notice">
                                <div className="notice-icon"><FaCheckCircle /></div>
                                <p>Al confirmar, recibirás un correo electrónico con los detalles de tu cita y las instrucciones de preparación si fueran necesarias.</p>
                            </div>
                        </div>

                        <footer className="modal-app-footer">
                            <button onClick={handleCancelar} className="btn-app-cancel" disabled={loading}>
                                Cancelar
                            </button>
                            <button onClick={handleConfirmar} className="btn-app-confirm" disabled={loading || !estudioId || !motivoConsulta}>
                                {loading ? (
                                    <>
                                        <div className="app-mini-spinner"></div>
                                        <span>Reservando...</span>
                                    </>
                                ) : (
                                    "Confirmar Mi Reserva"
                                )}
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
}

