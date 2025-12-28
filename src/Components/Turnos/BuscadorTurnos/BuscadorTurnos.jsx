import React from "react";
import { useBuscadorTurnos } from "./useBuscadorTurnos";
import TarjetaTurno from "../TarjetaTurno/TarjetaTurno";
import { FaSearch, FaUserMd, FaStethoscope, FaCalendarAlt, FaFilter, FaInbox } from "react-icons/fa";
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
        <div className="bus-wrapper">
            {/* Filter Section */}
            <section className="bus-controls-card">
                <header className="bus-controls-header">
                    <div className="bus-c-title">
                        <FaFilter />
                        <h4>Filtros de Búsqueda</h4>
                    </div>
                </header>

                <form onSubmit={buscarTurnos} className="bus-form">
                    <div className="bus-grid">
                        <div className="bus-input-group">
                            <label><FaStethoscope /> Especialidad</label>
                            <select
                                name="especialidad"
                                value={filtros.especialidad}
                                onChange={handleChange}
                            >
                                <option value="">Todas las especialidades</option>
                                {especialidades.map((esp) => (
                                    <option key={esp} value={esp}>{esp}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bus-input-group">
                            <label><FaUserMd /> Médico Requerido</label>
                            <select
                                name="doctorId"
                                value={filtros.doctorId}
                                onChange={handleChange}
                            >
                                <option value="">Cualquier profesional</option>
                                {doctoresFiltrados.map((doctor) => (
                                    <option key={doctor._id} value={doctor._id}>
                                        {doctor.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="bus-input-group">
                            <label><FaCalendarAlt /> Fecha Preferida</label>
                            <input
                                type="date"
                                name="fecha"
                                value={filtros.fecha}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="bus-form-footer">
                        <button type="submit" className="bus-btn-search" disabled={loading}>
                            {loading ? (
                                <>
                                    <div className="bus-spinner"></div>
                                    <span>Buscando...</span>
                                </>
                            ) : (
                                <>
                                    <FaSearch />
                                    <span>Ver Disponibilidad</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </section>

            {/* Results Section */}
            <section className="bus-results-area">
                {loading ? (
                    <div className="bus-state-container">
                        <div className="bus-big-loader"></div>
                        <p>Estamos consultando la agenda de nuestros profesionales...</p>
                    </div>
                ) : busquedaRealizada ? (
                    turnos.length === 0 ? (
                        <div className="bus-state-container bus-empty">
                            <div className="bus-empty-icon"><FaInbox /></div>
                            <h3>No se encontraron turnos</h3>
                            <p>Lo sentimos, no hay turnos disponibles que coincidan con tus criterios. Intenta con otra especialidad o amplia el rango de fecha.</p>
                        </div>
                    ) : (
                        <div className="bus-results-content">
                            <div className="bus-results-header">
                                <h3>Turnos Disponibles</h3>
                                <span className="bus-results-count">{turnos.length} opciones encontradas</span>
                            </div>
                            <div className="bus-grid-results">
                                {turnos.map((turno) => (
                                    <TarjetaTurno
                                        key={turno._id}
                                        turno={turno}
                                        onReservado={handleTurnoReservado}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                ) : (
                    <div className="bus-state-container bus-welcome">
                        <div className="bus-welcome-icon"><FaSearch /></div>
                        <h3>Empieza tu búsqueda</h3>
                        <p>Selecciona una especialidad o un médico para descubrir los horarios disponibles.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
