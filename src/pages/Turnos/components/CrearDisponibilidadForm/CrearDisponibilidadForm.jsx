import React from "react";
import { useCrearDisponibilidad } from "./useCrearDisponibilidad";
import { obtenerFechaHoy } from "../../../../utils/dateHelpers";
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
        <div className="crear-disponibilidad-form">
            <h3>Crear Disponibilidad de Turnos</h3>
            <p className="form-description">
                Genere turnos disponibles para un médico seleccionando el rango horario
                y el intervalo deseado.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="doctorId">
                        Doctor <span className="required">*</span>
                    </label>
                    <select
                        id="doctorId"
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un doctor</option>
                        {doctores.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.nombre} - {doctor.especialidad || "Sin especialidad"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="fecha">
                            Fecha <span className="required">*</span>
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            min={obtenerFechaHoy()}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="intervalo">
                            Intervalo (minutos) <span className="required">*</span>
                        </label>
                        <select
                            id="intervalo"
                            name="intervalo"
                            value={formData.intervalo}
                            onChange={handleChange}
                            required
                        >
                            <option value="15">15 minutos</option>
                            <option value="30">30 minutos</option>
                            <option value="45">45 minutos</option>
                            <option value="60">60 minutos</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="horaInicio">
                            Hora Inicio <span className="required">*</span>
                        </label>
                        <input
                            type="time"
                            id="horaInicio"
                            name="horaInicio"
                            value={formData.horaInicio}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="horaFin">
                            Hora Fin <span className="required">*</span>
                        </label>
                        <input
                            type="time"
                            id="horaFin"
                            name="horaFin"
                            value={formData.horaFin}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Sección de Estudios */}
                <div className="form-group estudios-section">
                    <label>
                        Estudios Disponibles para estos Turnos
                    </label>
                    <p className="help-text">
                        Seleccione los estudios que estarán disponibles para reservar en estos turnos.
                        Si no selecciona ninguno, todos los estudios activos estarán disponibles.
                    </p>

                    {loadingEstudios ? (
                        <p className="loading-text">Cargando estudios...</p>
                    ) : estudios.length === 0 ? (
                        <p className="no-estudios-text">No hay estudios activos disponibles</p>
                    ) : (
                        <>
                            <div className="estudios-actions">
                                <button
                                    type="button"
                                    className="btn-select-all"
                                    onClick={seleccionarTodosEstudios}
                                >
                                    Seleccionar todos
                                </button>
                                <button
                                    type="button"
                                    className="btn-deselect-all"
                                    onClick={deseleccionarTodosEstudios}
                                >
                                    Deseleccionar todos
                                </button>
                                <span className="estudios-count">
                                    {formData.estudiosIds.length} de {estudios.length} seleccionados
                                </span>
                            </div>

                            <div className="estudios-grid">
                                {estudios.map((estudio) => (
                                    <label
                                        key={estudio._id}
                                        className={`estudio-checkbox ${formData.estudiosIds.includes(estudio._id) ? 'selected' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.estudiosIds.includes(estudio._id)}
                                            onChange={() => handleEstudioChange(estudio._id)}
                                        />
                                        <span className="estudio-info">
                                            <span className="estudio-tipo">{estudio.tipo}</span>
                                            {estudio.precio > 0 && (
                                                <span className="estudio-precio">${estudio.precio}</span>
                                            )}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn-generar-turnos"
                        disabled={loading}
                    >
                        {loading ? "Generando..." : "Generar Turnos"}
                    </button>
                </div>
            </form>
        </div>
    );
}
