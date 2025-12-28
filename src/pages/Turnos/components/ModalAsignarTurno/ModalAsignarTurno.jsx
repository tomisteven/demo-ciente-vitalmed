import React from "react";
import { useModalAsignarTurno } from "./useModalAsignarTurno";
import { FaUserPlus, FaTimes, FaCalendarAlt, FaUserMd, FaNotesMedical, FaSearch, FaUserInjured, FaFlask } from "react-icons/fa";
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
        <div className="ma-overlay" onClick={onClose}>
            <div className="ma-content scale-in" onClick={(e) => e.stopPropagation()}>
                <header className="ma-header">
                    <div className="ma-title-box">
                        <div className="ma-icon-circle"><FaUserPlus /></div>
                        <h3>Asignar Turno Médico</h3>
                    </div>
                    <button className="ma-close-btn" onClick={onClose}><FaTimes /></button>
                </header>

                <div className="ma-body">
                    {/* Turno Summary Info */}
                    <section className="ma-info-strip">
                        <div className="ma-info-pill">
                            <FaCalendarAlt />
                            <div>
                                <label>Fecha y Hora</label>
                                <span>{new Date(turno.fecha).toLocaleString("es-AR", {
                                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                                })}</span>
                            </div>
                        </div>
                        <div className="ma-info-pill">
                            <FaUserMd />
                            <div>
                                <label>Profesional</label>
                                <span>{turno.doctor?.nombre || "No asignado"}</span>
                            </div>
                        </div>
                    </section>

                    <form onSubmit={handleSubmit} className="ma-form">
                        {/* Patient Search Section */}
                        <div className="ma-form-section">
                            <label className="ma-label"><FaSearch /> Buscar Paciente</label>
                            <div className="ma-search-wrapper">
                                <input
                                    type="text"
                                    placeholder="Nombre, DNI o Email..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="ma-input-search"
                                />
                                {loadingPacientes && <div className="ma-inner-spinner"></div>}
                            </div>
                        </div>

                        <div className="ma-form-section">
                            <label className="ma-label"><FaUserInjured /> Seleccionar de la lista <span className="req">*</span></label>
                            <select
                                name="pacienteId"
                                value={formData.pacienteId}
                                onChange={handleChange}
                                required
                                size="5"
                                className="ma-select-list"
                            >
                                <option value="" disabled>-- Elija un paciente --</option>
                                {pacientesFiltrados.map((paciente) => (
                                    <option key={paciente._id} value={paciente._id}>
                                        {paciente.nombre} {paciente.dni ? `(${paciente.dni})` : ""}
                                    </option>
                                ))}
                            </select>
                            {pacientesFiltrados.length === 0 && !loadingPacientes && (
                                <p className="ma-error-msg">No se encontraron coincidencias.</p>
                            )}
                        </div>

                        {/* Selected Patient Extra Info */}
                        {pacienteSeleccionado && (
                            <div className="ma-extra-info-card success">
                                <p><strong>Email:</strong> {pacienteSeleccionado.email || "---"}</p>
                                <p><strong>Teléfono:</strong> {pacienteSeleccionado.telefono || "---"}</p>
                            </div>
                        )}

                        {/* Study Selection */}
                        <div className="ma-form-section">
                            <label className="ma-label"><FaFlask /> Estudio a realizar <span className="req">*</span></label>
                            <select
                                name="estudioId"
                                value={formData.estudioId}
                                onChange={handleChange}
                                required
                                className="ma-input"
                            >
                                <option value="">{loadingEstudios ? "Cargando estudios..." : "-- Seleccione un estudio --"}</option>
                                {estudios.map((estudio) => (
                                    <option key={estudio._id} value={estudio._id}>
                                        {estudio.tipo} {estudio.precio ? `- $${estudio.precio}` : ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {estudioSeleccionado?.aclaraciones && (
                            <div className="ma-extra-info-card warning">
                                <p><strong>Aclaraciones:</strong> {estudioSeleccionado.aclaraciones}</p>
                            </div>
                        )}

                        {/* Observations */}
                        <div className="ma-form-section">
                            <label className="ma-label"><FaNotesMedical /> Motivo / Observaciones <span className="req">*</span></label>
                            <textarea
                                name="motivoConsulta"
                                value={formData.motivoConsulta}
                                onChange={handleChange}
                                placeholder="Describa el motivo de la consulta..."
                                className="ma-textarea"
                                required
                            />
                        </div>

                        <footer className="ma-footer">
                            <button type="button" onClick={onClose} className="ma-btn-cancel">Cancelar</button>
                            <button type="submit" className="ma-btn-submit" disabled={loading}>
                                {loading ? "Procesando..." : "Confirmar Asignación"}
                            </button>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    );
}
