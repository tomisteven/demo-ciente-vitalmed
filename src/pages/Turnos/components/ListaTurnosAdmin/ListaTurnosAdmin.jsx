import React from "react";
import { useListaTurnosAdmin } from "./useListaTurnosAdmin";
import { formatearFechaHora } from "../../../../utils/dateHelpers";
import { getEstadoColor, getEstadoLabel } from "../../../../utils/turnoHelpers";
import { FaSearch, FaEraser, FaUserPlus, FaCalendarTimes, FaFilter } from "react-icons/fa";
import ModalAsignarTurno from "../ModalAsignarTurno/ModalAsignarTurno";
import "./ListaTurnosAdmin.css";

export default function ListaTurnosAdmin() {
    const {
        turnos,
        doctores,
        estudios,
        loading,
        modalAsignar,
        filtros,
        especialidades,
        handleFiltroChange,
        aplicarFiltros,
        limpiarFiltros,
        handleCancelar,
        handleAsignarTurno,
        handleCloseModal,
        handleTurnoAsignado,
    } = useListaTurnosAdmin();

    return (
        <div className="adm-view-wrapper">
            <header className="adm-header">
                <div className="adm-title-box">
                    <div className="adm-icon-box"><FaFilter /></div>
                    <h3>Filtros de Búsqueda</h3>
                </div>
            </header>

            {/* Polished Filters Section */}
            <div className="adm-filters-card">
                <div className="adm-filters-grid">
                    <div className="adm-input-group">
                        <label>Estado del Turno</label>
                        <select name="estado" value={filtros.estado} onChange={handleFiltroChange}>
                            <option value="">Cualquier estado</option>
                            <option value="disponible">Disponible</option>
                            <option value="reservado">Reservado</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    <div className="adm-input-group">
                        <label>Médico Especialista</label>
                        <select name="doctorId" value={filtros.doctorId} onChange={handleFiltroChange}>
                            <option value="">Todos los médicos</option>
                            {doctores.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>{doctor.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="adm-input-group">
                        <label>Tipo de Estudio</label>
                        <select name="estudio" value={filtros.estudio} onChange={handleFiltroChange}>
                            <option value="">Todos los estudios</option>
                            {estudios.map((estudio) => (
                                <option key={estudio._id} value={estudio._id}>{estudio.tipo}</option>
                            ))}
                        </select>
                    </div>

                    <div className="adm-input-group">
                        <label>Especialidad</label>
                        <select name="especialidad" value={filtros.especialidad} onChange={handleFiltroChange}>
                            <option value="">Todas las especialidades</option>
                            {especialidades.map((esp) => (
                                <option key={esp} value={esp}>{esp}</option>
                            ))}
                        </select>
                    </div>

                    <div className="adm-input-group">
                        <label>Fecha de Atención</label>
                        <input type="date" name="fecha" value={filtros.fecha} onChange={handleFiltroChange} />
                    </div>
                </div>

                <div className="adm-filters-footer">
                    <button onClick={limpiarFiltros} className="adm-btn-secondary">
                        <FaEraser /> <span>Limpiar Filtros</span>
                    </button>
                    <button onClick={aplicarFiltros} className="adm-btn-primary">
                        <FaSearch /> <span>Buscar Turnos</span>
                    </button>
                </div>
            </div>

            {/* Results Section */}
            <div className="adm-results-area">
                {loading ? (
                    <div className="adm-loading-state">
                        <div className="adm-spinner"></div>
                        <p>Filtrando resultados...</p>
                    </div>
                ) : turnos.length === 0 ? (
                    <div className="adm-empty-state">
                        <div className="adm-empty-icon"><FaSearch /></div>
                        <h4>No encontramos resultados</h4>
                        <p>Intenta ajustar tus filtros para encontrar lo que buscas.</p>
                    </div>
                ) : (
                    <div className="adm-table-wrapper">
                        <table className="adm-table">
                            <thead>
                                <tr>
                                    <th>Horario</th>
                                    <th>Profesional</th>
                                    <th>Estudio / Servicio</th>
                                    <th>Paciente</th>
                                    <th>Estado</th>
                                    <th className="text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {turnos.map((turno) => (
                                    <tr key={turno._id}>
                                        <td className="adm-td-time">
                                            {formatearFechaHora(turno.fecha)}
                                        </td>
                                        <td className="adm-td-doctor">
                                            <span>{turno.doctor?.nombre || "No asignado"}</span>
                                            <small>{turno.doctor?.especialidad}</small>
                                        </td>
                                        <td className="adm-td-study">{turno.estudio?.tipo || "Consulta"}</td>
                                        <td className="adm-td-patient">
                                            {turno.paciente ? (
                                                <div className="adm-patient-box">
                                                    <span>{turno.paciente.nombre}</span>
                                                    <small>DNI: {turno.paciente.dni}</small>
                                                </div>
                                            ) : (
                                                <span className="adm-available-text">Disponible</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`adm-badge status-${turno.estado}`}>
                                                {getEstadoLabel(turno.estado)}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <div className="adm-actions-cell">
                                                {turno.estado === "disponible" && (
                                                    <button onClick={() => handleAsignarTurno(turno)} className="adm-btn-action success" title="Asignar Turno">
                                                        <FaUserPlus /> <span>Asignar</span>
                                                    </button>
                                                )}
                                                {turno.estado === "reservado" && (
                                                    <button onClick={() => handleCancelar(turno._id)} className="adm-btn-action danger" title="Cancelar Turno">
                                                        <FaCalendarTimes /> <span>Cancelar</span>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && turnos.length > 0 && (
                    <div className="adm-results-summary">
                        Mostrando <strong>{turnos.length}</strong> turnos programados
                    </div>
                )}
            </div>

            {/* Modal Asignar Turno */}
            {modalAsignar.show && (
                <ModalAsignarTurno
                    turno={modalAsignar.turno}
                    onClose={handleCloseModal}
                    onAsignado={handleTurnoAsignado}
                />
            )}
        </div>
    );
}
