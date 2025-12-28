import React, { useState } from "react";
import { useDoctor } from "../../hooks/useDoctor";
import { LoaderIcon } from "react-hot-toast";
import Breadcrumbs from "../../utils/Breadcums";
import { FaUserMd, FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaStethoscope, FaUserTag, FaLock, FaCalendarAlt, FaBriefcaseMedical, FaCopy, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Doctores.css";

const Doctores = ({ notificacion }) => {
  const {
    doctores,
    loading,
    modalOpen,
    editingDoctor,
    doctorData,
    handleInputChange,
    handleSaveDoctor,
    handleEdit,
    openModal,
    deleteDoctor,
    closeModal,
    visiblePasswords,
    togglePassword,
  } = useDoctor({ notificacion });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctores = doctores.filter(d =>
    d.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: "¿Eliminar profesional?",
      text: `¿Está seguro de eliminar al Dr. ${nombre}? Esto removerá su agenda y accesos.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      borderRadius: '16px'
    });

    if (result.isConfirmed) {
      await deleteDoctor(id);
    }
  };



  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notificacion("Contraseña copiada al portapapeles", "success");
  };

  return (
    <div className="dr-view-wrapper">
      <header className="dr-header">
        <Breadcrumbs />
        <div className="dr-header-main">
          <div className="dr-title-group">
            <div className="dr-icon-box">
              <FaBriefcaseMedical />
            </div>
            <div className="dr-text-box">
              <h1>Cuerpo Médico</h1>
              <p>Gestione el staff de profesionales, sus especialidades y credenciales.</p>
            </div>
          </div>
          <button className="dr-btn-add" onClick={openModal}>
            <FaPlus /> <span>Agregar Profesional</span>
          </button>
        </div>
      </header>

      <section className="dr-controls">
        <div className="dr-search-box">
          <FaSearch className="dr-search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o especialidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="dr-stats">
          <span className="dr-stat-tag">Especialistas: <strong>{doctores.length}</strong></span>
        </div>
      </section>

      <main className="dr-content">
        {loading ? (
          <div className="dr-loading-state">
            <div className="dr-spinner"></div>
            <p>Sincronizando base de datos...</p>
          </div>
        ) : filteredDoctores.length === 0 ? (
          <div className="dr-empty-state">
            <div className="dr-empty-icon"><FaUserMd /></div>
            <h3>No hay profesionales</h3>
            <p>{doctores.length === 0 ? "Aún no hay doctores registrados en el sistema." : "No se encontraron coincidencias para su búsqueda."}</p>
          </div>
        ) : (
          <div className="dr-table-card">
            <table className="dr-table">
              <thead>
                <tr>
                  <th>Profesional</th>
                  <th>Especialidad</th>
                  <th>Credenciales</th>
                  <th>Ingreso</th>
                  <th className="text-right">Operaciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctores.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className="dr-td-main">
                      <div className="dr-user-info">
                        <div className="dr-avatar">{doctor.nombre.charAt(0)}</div>
                        <div className="dr-name-stack">
                          <span className="dr-name">Dr. {doctor.nombre}</span>
                          <span className="dr-id-tag">ID: {doctor._id.slice(-6).toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="dr-spec-badge">
                        <FaStethoscope /> {doctor.especialidad}
                      </span>
                    </td>
                    <td>
                      <div className="dr-creds-container">
                        <span className="dr-user-link"><FaUserTag /> {doctor.usuario}</span>
                        <div className="dr-pass-row">
                          <span className="dr-pass-tag">
                            <FaLock />
                            <span className="dr-pass-text">
                              {visiblePasswords[doctor._id] ? doctor.password : "••••••••"}
                            </span>
                          </span>
                          <div className="dr-pass-actions">
                            <button onClick={() => togglePassword(doctor._id)} className="dr-btn-inline">
                              {visiblePasswords[doctor._id] ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <button onClick={() => copyToClipboard(doctor.password)} className="dr-btn-inline">
                              <FaCopy />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="dr-date-info">
                        <FaCalendarAlt /> {new Date(doctor.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="dr-btn-group">
                        <button
                          className="dr-btn-edit"
                          onClick={() => handleEdit(doctor)}
                          title="Ficha rápida"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="dr-btn-delete"
                          onClick={() => handleDelete(doctor._id, doctor.nombre)}
                          title="Baja médica"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* MODAL */}
      {modalOpen && (
        <div className="dr-modal-overlay" onClick={closeModal}>
          <div className="dr-modal-content scale-in" onClick={(e) => e.stopPropagation()}>
            <header className="dr-modal-header">
              <div className="dr-m-title">
                <div className="dr-m-icon">{editingDoctor ? <FaEdit /> : <FaPlus />}</div>
                <h4>{editingDoctor ? "Modificar Profesional" : "Nuevo Ingreso Médico"}</h4>
              </div>
              <button className="dr-m-close" onClick={closeModal}><FaTimes /></button>
            </header>

            <div className="dr-m-body">
              <div className="dr-form-grid">
                <div className="dr-input-group">
                  <label>Nombre y Apellido <span className="req">*</span></label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Ej: Dr. Alejandro Rossi"
                    value={doctorData.nombre}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="dr-input-group">
                  <label>Especialidad Médica <span className="req">*</span></label>
                  <input
                    type="text"
                    name="especialidad"
                    placeholder="Ej: Cardiología, Pediatría..."
                    value={doctorData.especialidad}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="dr-input-group">
                  <label>Usuario de Sistema <span className="req">*</span></label>
                  <input
                    type="text"
                    name="usuario"
                    placeholder="Ej: arossi.med"
                    value={doctorData.usuario}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="dr-input-group">
                  <label>Contraseña Acceso <span className="req">*</span></label>
                  <input
                    type="password"
                    name="password"
                    placeholder={editingDoctor ? "Nueva contraseña (opcional)" : "Mínimo 6 caracteres"}
                    value={doctorData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <footer className="dr-m-footer">
              <button className="dr-btn-cancel" onClick={closeModal}>
                Cancelar
              </button>
              <button className="dr-btn-save" onClick={handleSaveDoctor} disabled={loading}>
                {loading ? (
                  <LoaderIcon className="dr-mini-loader" />
                ) : editingDoctor ? (
                  "Guardar Cambios"
                ) : (
                  "Registrar Médico"
                )}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctores;
