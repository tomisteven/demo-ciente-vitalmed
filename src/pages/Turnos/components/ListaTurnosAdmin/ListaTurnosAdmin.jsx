import React from "react";
import { useListaTurnosAdmin } from "./useListaTurnosAdmin";
import { formatearFechaHora } from "../../../../utils/dateHelpers";
import { getEstadoColor, getEstadoLabel } from "../../../../utils/turnoHelpers";
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
        <div className="lista-turnos-admin">
            <h3>Gestión de Turnos</h3>

            {/* Filtros */}
            <div className="filtros-container">
                <div className="filtros-row">
                    <div className="filtro-group">
                        <label>Estado</label>
                        <select
                            name="estado"
                            value={filtros.estado}
                            onChange={handleFiltroChange}
                        >
                            <option value="">Todos</option>
                            <option value="disponible">Disponible</option>
                            <option value="reservado">Reservado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>

                    <div className="filtro-group">
                        <label>Doctor</label>
                        <select
                            name="doctorId"
                            value={filtros.doctorId}
                            onChange={handleFiltroChange}
                        >
                            <option value="">Todos</option>
                            {doctores.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filtro-group">
                        <label>Estudio</label>
                        <select
                            name="estudio"
                            value={filtros.estudio}
                            onChange={handleFiltroChange}
                        >
                            <option value="">Todos</option>
                            {estudios.map((estudio) => (
                                <option key={estudio._id} value={estudio._id}>
                                    {estudio.tipo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filtro-group">
                        <label>Especialidad</label>
                        <select
                            name="especialidad"
                            value={filtros.especialidad}
                            onChange={handleFiltroChange}
                        >
                            <option value="">Todas</option>
                            {especialidades.map((esp) => (
                                <option key={esp} value={esp}>
                                    {esp}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filtro-group">
                        <label>Fecha</label>
                        <input
                            type="date"
                            name="fecha"
                            value={filtros.fecha}
                            onChange={handleFiltroChange}
                        />
                    </div>
                </div>

                <div className="filtros-actions">
                    <button onClick={aplicarFiltros} className="btn-aplicar">
                        Buscar
                    </button>
                    <button onClick={limpiarFiltros} className="btn-limpiar">
                        Limpiar
                    </button>
                </div>
            </div>

            {/* Tabla de turnos */}
            <div className="tabla-container">
                {loading ? (
                    <div className="loading-message">Cargando turnos...</div>
                ) : turnos.length === 0 ? (
                    <div className="empty-message">
                        No se encontraron turnos con los filtros aplicados.
                    </div>
                ) : (
                    <table className="tabla-turnos">
                        <thead>
                            <tr>
                                <th>Fecha y Hora</th>
                                <th>Doctor</th>
                                <th>Estudio</th>
                                <th>Paciente</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnos.map((turno) => (
                                <tr key={turno._id}>
                                    <td className="fecha-cell">
                                        {formatearFechaHora(turno.fecha)}
                                    </td>
                                    <td>
                                        {turno.doctor?.nombre || "Doctor no especificado"}
                                    </td>
                                    <td>{turno.estudio?.tipo || "-"}</td>
                                    <td>
                                        {turno.paciente?.nombre || (
                                            <span className="text-muted">Disponible</span>
                                        )}
                                    </td>
                                    <td>
                                        <span
                                            className="badge-estado"
                                            style={{
                                                backgroundColor: getEstadoColor(turno.estado),
                                            }}
                                        >
                                            {getEstadoLabel(turno.estado)}
                                        </span>
                                    </td>
                                    <td>
                                        {turno.estado === "disponible" && (
                                            <button
                                                onClick={() => handleAsignarTurno(turno)}
                                                className="btn-asignar"
                                            >
                                                Asignar
                                            </button>
                                        )}
                                        {turno.estado === "reservado" && (
                                            <button
                                                onClick={() => handleCancelar(turno._id)}
                                                className="btn-cancelar"
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="resultados-info">
                Total de turnos: <strong>{turnos.length}</strong>
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
