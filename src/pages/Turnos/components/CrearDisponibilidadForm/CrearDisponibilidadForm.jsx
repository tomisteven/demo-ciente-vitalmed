import React from "react";
import { useCrearDisponibilidad } from "./useCrearDisponibilidad";
import { obtenerFechaHoy } from "../../../../utils/dateHelpers";
import { FaCalendarPlus, FaUserMd, FaClock, FaCheckSquare, FaSquare, FaCalendarAlt, FaFlask } from "react-icons/fa";
import "./CrearDisponibilidadForm.css";

export default function CrearDisponibilidadForm() {
    const {
        doctores,
        estudios,
        loading,
        loadingEstudios,
        formData,
        handleChange,
        handleEstudioChange,
        handleSubmit,
        seleccionarTodosEstudios,
        deseleccionarTodosEstudios,
    } = useCrearDisponibilidad();

    return (
        <div className="gen-view-wrapper">
            <header className="gen-header">
                <div className="gen-title-box">
                    <div className="gen-icon-box"><FaCalendarPlus /></div>
                    <div className="gen-text-content">
                        <h3>Generar Disponibilidad Médica</h3>
                        <p>Configure el rango horario e intervalos para crear turnos automáticamente.</p>
                    </div>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="gen-form">
                <section className="gen-section">
                    <div className="gen-section-header">
                        <FaUserMd /> <span>Información del Profesional</span>
                    </div>
                    <div className="gen-input-group">
                        <label htmlFor="doctorId">Doctor <span className="gen-req">*</span></label>
                        <select id="doctorId" name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                            <option value="">Seleccione un profesional...</option>
                            {doctores.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.nombre} - {doctor.especialidad || "Especialidad no definida"}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                <section className="gen-section grid-2">
                    <div className="gen-section-block">
                        <div className="gen-section-header">
                            <FaCalendarAlt /> <span>Configuración de Fecha</span>
                        </div>
                        <div className="gen-input-group">
                            <label htmlFor="fecha">Fecha de los Turnos <span className="gen-req">*</span></label>
                            <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} min={obtenerFechaHoy()} required />
                        </div>
                    </div>

                    <div className="gen-section-block">
                        <div className="gen-section-header">
                            <FaClock /> <span>Configuración de Tiempo</span>
                        </div>
                        <div className="gen-input-group">
                            <label htmlFor="intervalo">Intervalo de Atención <span className="gen-req">*</span></label>
                            <select id="intervalo" name="intervalo" value={formData.intervalo} onChange={handleChange} required>
                                <option value="15">15 minutos</option>
                                <option value="30">30 minutos</option>
                                <option value="45">45 minutos</option>
                                <option value="60">60 minutos</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="gen-section grid-2">
                    <div className="gen-input-group">
                        <label htmlFor="horaInicio">Hora de Inicio <span className="gen-req">*</span></label>
                        <input type="time" id="horaInicio" name="horaInicio" value={formData.horaInicio} onChange={handleChange} required />
                    </div>
                    <div className="gen-input-group">
                        <label htmlFor="horaFin">Hora de Finalización <span className="gen-req">*</span></label>
                        <input type="time" id="horaFin" name="horaFin" value={formData.horaFin} onChange={handleChange} required />
                    </div>
                </section>

                <section className="gen-section gen-estudios-box">
                    <div className="gen-section-header justify-between">
                        <div className="gen-header-left">
                            <FaFlask /> <span>Estudios Disponibles</span>
                        </div>
                        <div className="gen-estudios-actions">
                            <button type="button" className="gen-btn-link" onClick={seleccionarTodosEstudios}>Marcar todos</button>
                            <button type="button" className="gen-btn-link secondary" onClick={deseleccionarTodosEstudios}>Desmarcar todos</button>
                        </div>
                    </div>

                    <p className="gen-help-text">Seleccione los estudios que se podrán realizar en esta franja horaria. Si no selecciona ninguno, se habilitarán todos por defecto.</p>

                    {loadingEstudios ? (
                        <div className="gen-loading-estudios">Cargando catálogo de estudios...</div>
                    ) : estudios.length === 0 ? (
                        <div className="gen-empty-estudios">No se encontraron estudios activos en el sistema.</div>
                    ) : (
                        <div className="gen-estudios-grid">
                            {estudios.map((estudio) => (
                                <label key={estudio._id} className={`gen-estudio-card ${formData.estudiosIds.includes(estudio._id) ? 'active' : ''}`}>
                                    <input type="checkbox" checked={formData.estudiosIds.includes(estudio._id)} onChange={() => handleEstudioChange(estudio._id)} hidden />
                                    <div className="gen-est-check">{formData.estudiosIds.includes(estudio._id) ? <FaCheckSquare /> : <FaSquare />}</div>
                                    <div className="gen-est-info">
                                        <span className="gen-est-title">{estudio.tipo}</span>
                                        {estudio.precio > 0 && <span className="gen-est-price">${estudio.precio}</span>}
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </section>

                <footer className="gen-form-footer">
                    <button type="submit" className="gen-btn-submit" disabled={loading}>
                        {loading ? <span className="gen-spinner-small"></span> : <FaCalendarPlus />}
                        {loading ? "Generando turnos..." : "Generar Disponibilidad"}
                    </button>
                </footer>
            </form>
        </div>
    );
}
