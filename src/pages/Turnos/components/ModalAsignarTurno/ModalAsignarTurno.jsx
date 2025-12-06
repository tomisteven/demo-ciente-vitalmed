import React from "react";
import { useModalAsignarTurno } from "./useModalAsignarTurno";
import "./ModalAsignarTurno.css";

export default function ModalAsignarTurno({ turno, onClose, onAsignado }) {
    const {
        pacientes,
        estudios,
        loading,
        loadingPacientes,
        loadingEstudios,
        busqueda,
        formData,
        pacientesFiltrados,
        pacienteSeleccionado,
        estudioSeleccionado,
        setBusqueda,
        handleChange,
        handleSubmit,
    } = useModalAsignarTurno(turno, onClose, onAsignado);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-asignar" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4>Asignar Turno a Paciente</h4>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="turno-info-box">
                        <h5>Información del Turno</h5>
                        <p>
                            <strong>Fecha y Hora:</strong>{" "}
                            {new Date(turno.fecha).toLocaleString("es-AR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                        <p><strong>Doctor:</strong> {turno.doctor?.nombre || "No especificado"}</p>
                        <p><strong>Especialidad:</strong> {turno.especialidad || "No especificada"}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="busqueda">Buscar Paciente</label>
                            <input
                                type="text"
                                id="busqueda"
                                placeholder="Buscar por nombre, DNI o email..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                disabled={loading || loadingPacientes}
                                className="input-busqueda"
                            />
                            <small className="help-text">
                                {loadingPacientes
                                    ? "Cargando pacientes..."
                                    : `${pacientesFiltrados.length} de ${pacientes.length} pacientes`}
                            </small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="pacienteId">
                                Seleccionar Paciente <span className="required">*</span>
                            </label>
                            <select
                                id="pacienteId"
                                name="pacienteId"
                                value={formData.pacienteId}
                                onChange={handleChange}
                                required
                                disabled={loading || loadingPacientes}
                                size="6"
                                className="select-pacientes"
                            >
                                <option value="">-- Seleccione un paciente --</option>
                                {pacientesFiltrados.map((paciente) => (
                                    <option key={paciente._id} value={paciente._id}>
                                        {paciente.nombre} {paciente.dni ? `- DNI: ${paciente.dni}` : ""}
                                    </option>
                                ))}
                            </select>
                            {pacientesFiltrados.length === 0 && !loadingPacientes && (
                                <small className="help-text error-text">
                                    No se encontraron pacientes con ese criterio de búsqueda
                                </small>
                            )}
                        </div>

                        {pacienteSeleccionado && (
                            <div className="paciente-info-box">
                                <p><strong>Email:</strong> {pacienteSeleccionado.email || "No especificado"}</p>
                                <p><strong>Teléfono:</strong> {pacienteSeleccionado.telefono || "No especificado"}</p>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="estudioId">
                                Estudio a Realizar <span className="required">*</span>
                            </label>
                            <select
                                id="estudioId"
                                name="estudioId"
                                value={formData.estudioId}
                                onChange={handleChange}
                                required
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
                                <small className="help-text error-text">No hay estudios disponibles</small>
                            )}
                        </div>

                        {estudioSeleccionado?.aclaraciones && (
                            <div className="estudio-info-box">
                                <p><strong>Aclaraciones:</strong> {estudioSeleccionado.aclaraciones}</p>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="motivoConsulta">
                                Motivo de Consulta <span className="required">*</span>
                            </label>
                            <textarea
                                id="motivoConsulta"
                                name="motivoConsulta"
                                value={formData.motivoConsulta}
                                onChange={handleChange}
                                placeholder="Describa el motivo de la consulta..."
                                rows="4"
                                disabled={loading}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn-cancelar-modal"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn-asignar-modal"
                                disabled={loading || loadingPacientes || loadingEstudios}
                            >
                                {loading ? "Asignando..." : "Asignar Turno"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
