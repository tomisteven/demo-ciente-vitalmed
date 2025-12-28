import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePacientes } from "../../hooks/usePacientes";
import Breadcrumbs from "../../utils/Breadcums";
import { WiCloudRefresh } from "react-icons/wi";
import { FaEye, FaEdit, FaTrash, FaUserInjured, FaSearch, FaUserPlus, FaTimes, FaCalendarAlt, FaIdCard, FaEnvelope, FaPhone, FaLock, FaUser, FaCopy, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Pacientes.css";
import { LoaderIcon } from "react-hot-toast";

export default function Pacientes({ notificacion }) {
  const {
    pacientes,
    loading,
    savePaciente,
    deletePaciente,
    searchPaciente,
    refreshPacientes,
  } = usePacientes({ notificacion });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    email: "",
    usuario: "",
    password: "",
    telefono: "",
    id: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userLog"));

  if (!user) navigate("/admin/login");
  if (user && user.rol === "paciente") navigate(`/admin/paciente/${user.usuario._id}`);

  const handleOpenModal = (paciente = null) => {
    if (paciente) {
      setSelectedPaciente(paciente);
      setFormData({
        nombre: paciente.nombre || "",
        dni: paciente.dni || "",
        email: paciente.email || "",
        usuario: paciente.usuario || "",
        password: paciente.password || "",
        telefono: paciente.telefono || "",
        id: paciente._id,
      });
    } else {
      setSelectedPaciente(null);
      setFormData({ nombre: "", dni: "", email: "", usuario: "", password: "", telefono: "", id: "" });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPaciente(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await savePaciente(formData, !!selectedPaciente);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: "¿Eliminar paciente?",
      text: `¿Está seguro de eliminar a ${nombre}? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      borderRadius: '16px'
    });

    if (result.isConfirmed) {
      await deletePaciente(id);
    }
  };

  const togglePassword = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notificacion("Contraseña copiada al portapapeles", "success");
  };

  return (
    <div className="pa-view-wrapper">
      <header className="pa-header">
        <Breadcrumbs />
        <div className="pa-header-main">
          <div className="pa-title-group">
            <div className="pa-icon-box">
              <FaUserInjured />
            </div>
            <div className="pa-text-box">
              <h1>Gestión de Pacientes</h1>
              <p>Administre la base de datos de pacientes y su información clínica.</p>
            </div>
          </div>
          <div className="pa-actions">
            <button className="pa-btn-refresh" onClick={() => {
              refreshPacientes();
              notificacion("Listado actualizado", "success");
            }} title="Refrescar lista">
              <WiCloudRefresh />
            </button>
            <button
              hidden={user.rol === "paciente" || user.rol === "doctor"}
              className="pa-btn-add"
              onClick={() => handleOpenModal()}
            >
              <FaUserPlus /> <span>Nuevo Paciente</span>
            </button>
          </div>
        </div>
      </header>

      <section className="pa-controls">
        <div className="pa-search-box">
          <FaSearch className="pa-search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, DNI o email..."
            onChange={(e) => searchPaciente(e.target.value)}
          />
        </div>
        <div className="pa-stats">
          <span className="pa-stat-tag">Total: <strong>{pacientes.length}</strong></span>
        </div>
      </section>

      <main className="pa-content">
        {loading ? (
          <div className="pa-loading-state">
            <div className="pa-spinner"></div>
            <p>Cargando pacientes...</p>
          </div>
        ) : pacientes.length === 0 ? (
          <div className="pa-empty-state">
            <div className="pa-empty-icon"><FaUserInjured /></div>
            <h3>No se encontraron pacientes</h3>
            <p>No hay registros que coincidan con su búsqueda.</p>
          </div>
        ) : (
          <div className="pa-table-card">
            <table className="pa-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Identificación</th>
                  <th>Contacto</th>
                  <th>Credenciales</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((paciente) => (
                  <tr key={paciente._id}>
                    <td className="pa-td-info">
                      <div className="pa-user-info">
                        <div className="pa-avatar">{paciente.nombre.charAt(0)}</div>
                        <div className="pa-name-stack">
                          <span className="pa-full-name">{paciente.nombre}</span>
                          <span className="pa-join-date">Registrado: {new Date(paciente.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="pa-td-dni">
                      <span className="pa-dni-badge"><FaIdCard /> {paciente.dni}</span>
                    </td>
                    <td className="pa-td-contact">
                      <div className="pa-contact-stack">
                        <span className="pa-email"><FaEnvelope /> {paciente.email}</span>
                        {paciente.telefono && <span className="pa-phone"><FaPhone /> {paciente.telefono}</span>}
                      </div>
                    </td>
                    <td className="pa-td-creds">
                      <div className="pa-creds-wrapper">
                        <div className="pa-user-tag"><FaUser /> {paciente.usuario || "Admin"}</div>
                        <div className="pa-pass-tag">
                          <FaLock />
                          <span className="pa-pass-text">
                            {visiblePasswords[paciente._id] ? paciente.password : "••••••••"}
                          </span>
                          <div className="pa-pass-actions">
                            <button onClick={() => togglePassword(paciente._id)} className="pa-btn-inline">
                              {visiblePasswords[paciente._id] ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <button onClick={() => copyToClipboard(paciente.password)} className="pa-btn-inline">
                              <FaCopy />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="pa-td-actions">
                      <div className="pa-btn-group">
                        <button
                          className="pa-btn-view"
                          onClick={() => navigate(`/admin/pacientes/${paciente._id}`)}
                          title="Ver Ficha Médica"
                        >
                          <FaEye />
                        </button>
                        <button
                          hidden={user.rol === "paciente" || user.rol === "doctor"}
                          className="pa-btn-edit"
                          onClick={() => handleOpenModal(paciente)}
                          title="Editar Datos"
                        >
                          <FaEdit />
                        </button>
                        <button
                          hidden={user.rol === "paciente" || user.rol === "doctor"}
                          className="pa-btn-delete"
                          onClick={() => handleDelete(paciente._id, paciente.nombre)}
                          title="Eliminar"
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
        <div className="pa-modal-overlay" onClick={handleCloseModal}>
          <div className="pa-modal-content scale-in" onClick={(e) => e.stopPropagation()}>
            <header className="pa-modal-header">
              <div className="pa-m-title">
                <div className="pa-m-icon">{selectedPaciente ? <FaEdit /> : <FaUserPlus />}</div>
                <h4>{selectedPaciente ? "Actualizar Paciente" : "Registro de Paciente"}</h4>
              </div>
              <button className="pa-m-close" onClick={handleCloseModal}><FaTimes /></button>
            </header>

            <form onSubmit={handleSubmit} className="pa-form">
              <div className="pa-m-body">
                <div className="pa-form-section">
                  <h5><FaUser /> Datos Personales</h5>
                  <div className="pa-input-grid">
                    <div className="pa-input-group">
                      <label>Nombre Completo <span className="req">*</span></label>
                      <input
                        type="text"
                        placeholder="Ej: Juan Pérez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div className="pa-input-group">
                      <label>DNI / Cédula <span className="req">*</span></label>
                      <input
                        type="text"
                        placeholder="Número de identificación"
                        value={formData.dni}
                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="pa-form-section">
                  <h5><FaEnvelope /> Contacto</h5>
                  <div className="pa-input-grid">
                    <div className="pa-input-group">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={submitting}
                      />
                    </div>
                    <div className="pa-input-group">
                      <label>Teléfono</label>
                      <input
                        type="text"
                        placeholder="Ej: +54 9 11..."
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="pa-form-section">
                  <h5><FaLock /> Credenciales de Acceso</h5>
                  <div className="pa-input-grid">
                    <div className="pa-input-group">
                      <label>Usuario <span className="req">*</span></label>
                      <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={formData.usuario}
                        onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div className="pa-input-group">
                      <label>Contraseña {selectedPaciente && <span className="opt">(Opcional)</span>}</label>
                      <input
                        type="password"
                        placeholder={selectedPaciente ? "Dejar en blanco para no cambiar" : "Mínimo 6 caracteres"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <footer className="pa-m-footer">
                <button type="button" className="pa-btn-cancel" onClick={handleCloseModal} disabled={submitting}>
                  Cancelar
                </button>
                <button type="submit" className="pa-btn-save" disabled={submitting}>
                  {submitting ? "Procesando..." : (selectedPaciente ? "Guardar Cambios" : "Crear Paciente")}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
