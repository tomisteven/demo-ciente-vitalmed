import React, { useState } from "react";
import "./Secretarias.css";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../utils/Breadcums";
import { useSecretaria } from "../../hooks/useSecretaria";
import { LoaderIcon } from "react-hot-toast";
import { FaUserShield, FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaEnvelope, FaLock, FaUser, FaHistory, FaCopy, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Secretarias = ({ notificacion }) => {
  const { secretarias, saveSecretaria, deleteSecretaria, loading } =
    useSecretaria({ notificacion });
  const [selectSecretaria, setSelectSecretaria] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [secretariaData, setSecretariaData] = useState({
    nombre: "",
    usuario: "",
    password: "",
    id: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userLog"));

  if (!user) navigate("/admin/login");
  if (user && user.rol === "paciente") navigate("/admin/paciente/" + user.usuario._id);

  const filteredSecretarias = secretarias.filter(s =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.usuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (secretaria = null) => {
    if (secretaria) {
      setSecretariaData({
        nombre: secretaria.nombre,
        usuario: secretaria.usuario,
        password: secretaria.password,
        id: secretaria._id,
      });
      setSelectSecretaria(secretaria);
    } else {
      setSecretariaData({ nombre: "", usuario: "", password: "", id: "" });
      setSelectSecretaria(null);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectSecretaria(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const sec = await saveSecretaria(secretariaData, !!selectSecretaria);
      notificacion(sec.message, "success");
      handleCloseModal();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: "¿Eliminar secretaria?",
      text: `¿Está seguro de eliminar a ${nombre}? Perderá el acceso al sistema inmediatamente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      borderRadius: '16px'
    });

    if (result.isConfirmed) {
      await deleteSecretaria(id);
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
    <div className="se-view-wrapper">
      <header className="se-header">
        <Breadcrumbs />
        <div className="se-header-main">
          <div className="se-title-group">
            <div className="se-icon-box">
              <FaUserShield />
            </div>
            <div className="se-text-box">
              <h1>Administración de Secretarías</h1>
              <p>Controle los niveles de acceso y perfiles del personal administrativo.</p>
            </div>
          </div>
          <button className="se-btn-add" onClick={() => handleOpenModal()}>
            <FaPlus /> <span>Nueva Secretaria</span>
          </button>
        </div>
      </header>

      <section className="se-controls">
        <div className="se-search-box">
          <FaSearch className="se-search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="se-stats">
          <span className="se-stat-tag">Personal: <strong>{secretarias.length}</strong></span>
        </div>
      </section>

      <main className="se-content">
        {loading ? (
          <div className="se-loading-state">
            <div className="se-spinner"></div>
            <p>Conectando con el servidor...</p>
          </div>
        ) : filteredSecretarias.length === 0 ? (
          <div className="se-empty-state">
            <div className="se-empty-icon"><FaUserShield /></div>
            <h3>Sin resultados</h3>
            <p>{secretarias.length === 0 ? "No hay secretarias registradas en el sistema." : "No se encontraron secretarias con ese criterio."}</p>
          </div>
        ) : (
          <div className="se-table-card">
            <table className="se-table">
              <thead>
                <tr>
                  <th>Nombre del Personal</th>
                  <th>Credenciales</th>
                  <th>Fecha Registro</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSecretarias.map((secretaria) => (
                  <tr key={secretaria._id}>
                    <td className="se-td-main">
                      <div className="se-user-info">
                        <div className="se-avatar">{secretaria.nombre.charAt(0)}</div>
                        <span className="se-name">{secretaria.nombre}</span>
                      </div>
                    </td>
                    <td>
                      <div className="se-credentials-stack">
                        <span className="se-user-tag"><FaUser /> {secretaria.usuario}</span>
                        <div className="se-pass-container">
                          <span className="se-pass-tag">
                            <FaLock />
                            <span className="se-pass-text">
                              {visiblePasswords[secretaria._id] ? secretaria.password : "••••••••"}
                            </span>
                          </span>
                          <div className="se-pass-actions">
                            <button onClick={() => togglePassword(secretaria._id)} className="se-btn-inline">
                              {visiblePasswords[secretaria._id] ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <button onClick={() => copyToClipboard(secretaria.password)} className="se-btn-inline">
                              <FaCopy />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="se-date-badge">
                        <FaHistory /> {new Date(secretaria.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="se-btn-group">
                        <button
                          className="se-btn-edit"
                          onClick={() => handleOpenModal(secretaria)}
                          title="Editar perfil"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="se-btn-delete"
                          onClick={() => handleDelete(secretaria._id, secretaria.nombre)}
                          title="Remover acceso"
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
        <div className="se-modal-overlay" onClick={handleCloseModal}>
          <div className="se-modal-content scale-in" onClick={(e) => e.stopPropagation()}>
            <header className="se-modal-header">
              <div className="se-m-title">
                <div className="se-m-icon">{selectSecretaria ? <FaEdit /> : <FaPlus />}</div>
                <h4>{selectSecretaria ? "Editar Secretaría" : "Alta de Personal"}</h4>
              </div>
              <button className="se-m-close" onClick={handleCloseModal}><FaTimes /></button>
            </header>

            <form onSubmit={handleSubmit} className="se-form">
              <div className="se-m-body">
                <div className="se-input-group">
                  <label><FaUser /> Nombre Completo <span className="req">*</span></label>
                  <input
                    type="text"
                    placeholder="Ej: Ana María Martínez"
                    value={secretariaData.nombre}
                    onChange={(e) => setSecretariaData({ ...secretariaData, nombre: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="se-input-group">
                  <label><FaEnvelope /> Usuario de Acceso <span className="req">*</span></label>
                  <input
                    type="text"
                    placeholder="Ej: amartinez.adm"
                    value={secretariaData.usuario}
                    onChange={(e) => setSecretariaData({ ...secretariaData, usuario: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="se-input-group">
                  <label><FaLock /> Contraseña <span className="req">*</span></label>
                  <input
                    type="password"
                    placeholder={selectSecretaria ? "Confirmar o cambiar contraseña" : "Mínimo 8 caracteres"}
                    value={secretariaData.password}
                    onChange={(e) => setSecretariaData({ ...secretariaData, password: e.target.value })}
                    required
                    disabled={submitting}
                  />
                  <small className="se-hint">Utilice una combinación de letras y números para mayor seguridad.</small>
                </div>
              </div>

              <footer className="se-m-footer">
                <button type="button" className="se-btn-cancel" onClick={handleCloseModal} disabled={submitting}>
                  Cancelar
                </button>
                <button type="submit" className="se-btn-save" disabled={submitting}>
                  {submitting ? <LoaderIcon className="se-mini-loader" /> : (selectSecretaria ? "Actualizar Perfil" : "Crear Acceso")}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Secretarias;
