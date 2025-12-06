import React from "react";
import { useBuscadorTurnos } from "./useBuscadorTurnos";
import TarjetaTurno from "../TarjetaTurno/TarjetaTurno";
import "./BuscadorTurnos.css";

export default function BuscadorTurnos() {
    const {
        turnos,
        loading,
        busquedaRealizada,
        filtros,
        especialidades,
        doctoresFiltrados,
        handleChange,
        buscarTurnos,
        handleTurnoReservado,
    } = useBuscadorTurnos();

    return (
        <div className="buscador-turnos">
            <h3>Buscar Turnos Disponibles</h3>
            <p className="buscador-description">
                Seleccione la especialidad y/o médico para ver los turnos disponibles.
            </p>

            <form onSubmit={buscarTurnos} className="buscador-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="especialidad">Especialidad</label>
                        <select
                            id="especialidad"
                            name="especialidad"
                            value={filtros.especialidad}
                            onChange={handleChange}
                        >
                            <option value="">Todas las especialidades</option>
                            {especialidades.map((esp) => (
                                <option key={esp} value={esp}>
                                    {esp}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="doctorId">Médico (opcional)</label>
                        <select
                            id="doctorId"
                            name="doctorId"
                            value={filtros.doctorId}
                            onChange={handleChange}
                        >
                            <option value="">Todos los médicos</option>
                            {doctoresFiltrados.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha">Fecha (opcional)</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={filtros.fecha}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-buscar" disabled={loading}>
                        {loading ? "Buscando..." : "Buscar Turnos"}
                    </button>
                </div>
            </form>

            {/* Resultados */}
            <div className="resultados-container">
                {loading ? (
                    <div className="loading-message">Buscando turnos disponibles...</div>
                ) : busquedaRealizada ? (
                    turnos.length === 0 ? (
                        <div className="empty-message">
                            <p>No se encontraron turnos disponibles con los filtros seleccionados.</p>
                            <p className="empty-hint">
                                Intente con otra especialidad o fecha.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="resultados-header">
                                <h4>Turnos Disponibles ({turnos.length})</h4>
                            </div>
                            <div className="turnos-grid">
                                {turnos.map((turno) => (
                                    <TarjetaTurno
                                        key={turno._id}
                                        turno={turno}
                                        onReservado={handleTurnoReservado}
                                    />
                                ))}
                            </div>
                        </>
                    )
                ) : (
                    <div className="info-message">
                        Utilice los filtros para buscar turnos disponibles.
                    </div>
                )}
            </div>
        </div>
    );
}
