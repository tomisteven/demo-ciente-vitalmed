import React, { useState, useEffect } from "react";
import { EstudiosApi } from "../../../api/Estudios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaFlask, FaPlus, FaPencilAlt, FaTrashAlt, FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./GestionEstudios.css";

const estudiosApi = new EstudiosApi();

export default function GestionEstudios() {
    const [estudios, setEstudios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEstudio, setEditingEstudio] = useState(null);
    const [formData, setFormData] = useState({
        tipo: "",
        precio: "",
        aclaraciones: "",
        activo: true,
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        cargarEstudios();
    }, []);

    const cargarEstudios = async () => {
        setLoading(true);
        try {
            const response = await estudiosApi.getEstudios();
            const listaEstudios = Array.isArray(response) ? response : response.estudios || [];
            setEstudios(listaEstudios);
        } catch (error) {
            console.error("Error al cargar estudios:", error);
            toast.error("Error al cargar los estudios");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (estudio = null) => {
        if (estudio) {
            setEditingEstudio(estudio);
            setFormData({
                tipo: estudio.tipo || "",
                precio: estudio.precio || "",
                aclaraciones: estudio.aclaraciones || "",
                activo: estudio.activo !== undefined ? estudio.activo : true,
            });
        } else {
            setEditingEstudio(null);
            setFormData({ tipo: "", precio: "", aclaraciones: "", activo: true });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingEstudio(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.tipo.trim()) {
            toast.error("El tipo de estudio es requerido");
            return;
        }

        setSubmitting(true);
        try {
            const dataToSend = {
                ...formData,
                precio: formData.precio ? Number(formData.precio) : 0,
            };

            if (editingEstudio) {
                await estudiosApi.actualizarEstudio(editingEstudio._id, dataToSend);
                toast.success("✓ Estudio actualizado exitosamente");
            } else {
                await estudiosApi.crearEstudio(dataToSend);
                toast.success("✓ Estudio creado exitosamente");
            }

            handleCloseModal();
            cargarEstudios();
        } catch (error) {
            console.error("Error al guardar estudio:", error);
            toast.error(error.message || "Error al guardar el estudio");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (estudio) => {
        const result = await Swal.fire({
            title: "¿Eliminar estudio?",
            text: `¿Está seguro de eliminar "${estudio.tipo}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            borderRadius: '16px'
        });

        if (result.isConfirmed) {
            try {
                await estudiosApi.eliminarEstudio(estudio._id);
                toast.success("✓ Estudio eliminado");
                cargarEstudios();
            } catch (error) {
                toast.error(error.message || "Error al eliminar");
            }
        }
    };

    const formatPrecio = (precio) => {
        if (!precio && precio !== 0) return "-";
        return new Intl.NumberFormat("es-AR", {
            style: "currency", currency: "ARS",
        }).format(precio);
    };

    return (
        <div className="ges-view-wrapper">
            <header className="ges-header">
                <div className="ges-title-box">
                    <div className="ges-icon-box"><FaFlask /></div>
                    <div className="ges-text-content">
                        <h3>Catálogo de Estudios</h3>
                        <p>Administre los tipos de estudios médicos y servicios disponibles.</p>
                    </div>
                </div>
                <button className="ges-btn-add" onClick={() => handleOpenModal()}>
                    <FaPlus /> <span>Agregar Nuevo</span>
                </button>
            </header>

            {loading ? (
                <div className="ges-loading-state">
                    <div className="ges-spinner"></div>
                    <p>Consultando catálogo...</p>
                </div>
            ) : estudios.length === 0 ? (
                <div className="ges-empty-state">
                    <div className="ges-empty-icon"><FaFlask /></div>
                    <h4>No hay estudios registrados</h4>
                    <p>Comience agregando el primer estudio al sistema.</p>
                </div>
            ) : (
                <div className="ges-table-wrapper">
                    <table className="ges-table">
                        <thead>
                            <tr>
                                <th>Estudio / Servicio</th>
                                <th>Precio Sugerido</th>
                                <th>Estado</th>
                                <th className="text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudios.map((est) => (
                                <tr key={est._id}>
                                    <td className="ges-td-main">
                                        <span className="ges-est-name">{est.tipo}</span>
                                        <small className="ges-est-desc">{est.aclaraciones || "Sin aclaraciones adicionales"}</small>
                                    </td>
                                    <td className="ges-td-price">{formatPrecio(est.precio)}</td>
                                    <td>
                                        <span className={`ges-badge ${est.activo ? "active" : "inactive"}`}>
                                            {est.activo ? <FaCheckCircle /> : <FaExclamationCircle />}
                                            {est.activo ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <div className="ges-actions">
                                            <button className="ges-btn-edit" onClick={() => handleOpenModal(est)} title="Editar"><FaPencilAlt /></button>
                                            <button className="ges-btn-delete" onClick={() => handleDelete(est)} title="Eliminar"><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="ges-modal-overlay" onClick={handleCloseModal}>
                    <div className="ges-modal-content scale-in" onClick={(e) => e.stopPropagation()}>
                        <header className="ges-modal-header">
                            <div className="ges-m-title">
                                <div className="ges-m-icon"><FaFlask /></div>
                                <h4>{editingEstudio ? "Editar Estudio" : "Nuevo Estudio"}</h4>
                            </div>
                            <button className="ges-m-close" onClick={handleCloseModal}><FaTimes /></button>
                        </header>

                        <form onSubmit={handleSubmit} className="ges-form">
                            <div className="ges-m-body">
                                <div className="ges-input-group">
                                    <label>Nombre del Estudio <span className="req">*</span></label>
                                    <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} placeholder="Ej: Rayos X de Tórax" required disabled={submitting} />
                                </div>

                                <div className="ges-input-group">
                                    <label>Precio Base (ARS)</label>
                                    <input type="number" name="precio" value={formData.precio} onChange={handleChange} placeholder="0.00" min="0" step="0.01" disabled={submitting} />
                                </div>

                                <div className="ges-input-group">
                                    <label>Aclaraciones / Preparación</label>
                                    <textarea name="aclaraciones" value={formData.aclaraciones} onChange={handleChange} placeholder="Indicaciones para el paciente..." rows="3" disabled={submitting} />
                                </div>

                                <div className="ges-check-group">
                                    <label className="ges-checkbox">
                                        <input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} disabled={submitting} />
                                        <span className="ges-check-box"></span>
                                        <span className="ges-check-label">Estudio disponible para reservas</span>
                                    </label>
                                </div>
                            </div>

                            <footer className="ges-m-footer">
                                <button type="button" onClick={handleCloseModal} className="ges-btn-cancel" disabled={submitting}>Cancelar</button>
                                <button type="submit" className="ges-btn-save" disabled={submitting}>
                                    {submitting ? "Guardando..." : (editingEstudio ? "Actualizar Estudio" : "Crear Estudio")}
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
