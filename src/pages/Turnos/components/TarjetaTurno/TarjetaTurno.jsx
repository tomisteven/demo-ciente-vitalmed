import React from "react";
import { useTarjetaTurno } from "./useTarjetaTurno";
import { formatearFechaHora } from "../../../../utils/dateHelpers";
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

    return (
        <>
            <div className="tarjeta-turno">
                <div className="tarjeta-header">
                    <div className="fecha-hora">
                        {formatearFechaHora(turno.fecha)}
                    </div>
                </div>

                <div className="tarjeta-body">
                    <div className="info-item">
                        <span className="info-label">Médico:</span>
                        <span className="info-value">
                            {turno.doctor?.nombre || "No especificado"}
                        </span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">Especialidad:</span>
                        <span className="info-value especialidad">
                            {turno.especialidad || "No especificada"}
                        </span>
                    </div>

                    {estudioAsignado && (
                        <div className="info-item">
                            <span className="info-label">Estudio:</span>
                            <span className="info-value estudio">
                                {estudioAsignado}
                            </span>
                        </div>
                    )}

                    {turno.estudio?.precio > 0 && (
                        <div className="info-item">
                            <span className="info-label">Precio:</span>
                            <span className="info-value precio">
                                ${turno.estudio.precio}
                            </span>
                        </div>
                    )}
                </div>

                <div className="tarjeta-footer">
                    <button onClick={handleReservar} className="btn-reservar">
                        Reservar Turno
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCancelar}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4>Reservar Turno</h4>
                            <button className="modal-close" onClick={handleCancelar}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <p className="modal-info">
                                <strong>Fecha:</strong> {formatearFechaHora(turno.fecha)}
                            </p>
                            <p className="modal-info">
                                <strong>Médico:</strong> {turno.doctor?.nombre}
                            </p>

                            <div className="form-group">
                                <label htmlFor="estudioId">
                                    Estudio a realizar <span className="required">*</span>
                                </label>
                                <select
                                    id="estudioId"
                                    value={estudioId}
                                    onChange={(e) => setEstudioId(e.target.value)}
                                    disabled={loading || loadingEstudios}
                                    className="select-estudio"
                                >
                                    <option value="">
                                        {loadingEstudios ? "Cargando estudios..." : "-- Seleccione un estudio --"}
                                    </option>
                                    {estudios.map((estudio) => (
                                        <option key={estudio._id} value={estudio._id}>
                                            {estudio.tipo} {estudio.precio ? `- $${estudio.precio}` : ""}
                                        </option>
                                    ))}
                                </select>
                                {estudios.length === 0 && !loadingEstudios && (
                                    <small className="help-text error-text">
                                        No hay estudios disponibles
                                    </small>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="motivoConsulta">
                                    Motivo de consulta <span className="required">*</span>
                                </label>
                                <textarea
                                    id="motivoConsulta"
                                    value={motivoConsulta}
                                    onChange={(e) => setMotivoConsulta(e.target.value)}
                                    placeholder="Describa brevemente el motivo de su consulta..."
                                    rows="4"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                onClick={handleCancelar}
                                className="btn-cancelar-modal"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmar}
                                className="btn-confirmar-modal"
                                disabled={loading}
                            >
                                {loading ? "Reservando..." : "Confirmar Reserva"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
