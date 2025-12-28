import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaPlus,
  FaCalendarAlt,
  FaUserMd,
  FaTimes,
  FaIdCard,
  FaFolder,
  FaFolderOpen,
  FaFileAlt,
  FaFilePdf,
  FaFileImage,
  FaEye,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import avatar from "../../assets/vitalmed/avatar.png";
import ToastMessage from "../../utils/ToastMessage";
import Loader from "../../utils/Loader";
import Breadcrumbs from "../../utils/Breadcums";
import { usePaciente } from "../../hooks/usePacienteIndividual";
import ModalAsignarDoctor from "./components/ModalAsignarDoctor/ModalAsignarDoctor";
import { LoaderIcon } from "react-hot-toast";
import ModalNota from "./components/ModalNota/ModalNota";
import "./VerPaciente.css";

export default function VerPaciente() {
  const [toast, setToast] = useState(null);
  const [modalAsignarDoctorOpen, setModalAsignarDoctorOpen] = useState(false);
  const [notaModalOpen, setNotaModalOpen] = useState(false);
  const [nuevaNota, setNuevaNota] = useState({ nota: "", author: "" });
  const [doctoresList, setDoctoresList] = useState([]);

  const userLogueado = JSON.parse(localStorage.getItem("userLog"));
  const userID = userLogueado.usuario._id;

  const showToast = (message, type) => setToast({ message, type });

  const {
    state,
    dispatch,
    user,
    handleUpload,
    setNombreArchivo,
    setArchivos,
    setNota,
    loading,
    eliminarDoctorDelPaciente,
    fetchDoctores,
    eliminarArchivo,
  } = usePaciente({ showToast });

  const handleOpenModalDoctor = async () => {
    setModalAsignarDoctorOpen(true);
    if (doctoresList.length === 0) {
      const doctores = await fetchDoctores();
      setDoctoresList(doctores || []);
    }
  };

  const handleGuardarNota = () => {
    if (!nuevaNota.nota || !nuevaNota.author) {
      showToast("Completa todos los campos", "error");
      return;
    }
    setNota(nuevaNota);
    setNuevaNota({ nota: "", author: "" });
    setNotaModalOpen(false);
    showToast("Nota guardada correctamente", "success");
  };

  if (!state.paciente) return <Loader />;

  return (
    <div className="vp-dashboard-container">
      <header className="vp-header-tools">
        <Breadcrumbs />
      </header>

      {/* Hero Profile Section */}
      <section className="vp-hero-card">
        <div className="vp-hero-main">
          <div className="vp-avatar-container">
            <img
              src={state.paciente.avatar || avatar}
              alt="Paciente"
              className="vp-avatar-img"
            />
            <div className="vp-status-badge">Activo</div>
          </div>
          <div className="vp-patient-meta">
            <h1 className="vp-patient-name">{state.paciente.nombre || "No especifica"}</h1>
            <p className="vp-patient-id">
              <FaIdCard /> <span>{state.paciente.dni ? `CI: ${state.paciente.dni}` : "Identificación no registrada"}</span>
            </p>
          </div>
        </div>

        <div className="vp-contact-strip">
          <div className="vp-contact-info">
            <div className="vp-contact-pill">
              <div className="vp-pill-icon">
                <FaPhone />
              </div>
              <div>
                <label>Teléfono</label>
                <span>{state.paciente.telefono || "Asignar"}</span>
              </div>
            </div>
            <div className="vp-contact-pill">
              <div className="vp-pill-icon">
                <FaEnvelope />
              </div>
              <div>
                <label>Email</label>
                <span>{state.paciente.email || "Asignar"}</span>
              </div>
            </div>
            <div className="vp-contact-pill">
              <div className="vp-pill-icon">
                <FaCalendarAlt />
              </div>
              <div>
                <label>Fecha Registro</label>
                <span>
                  {state.paciente.created_at
                    ? new Date(state.paciente.created_at).toLocaleDateString()
                    : "---"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="vp-grid-layout">

        {/* Turnos / Appointments Card */}
        <section className="vp-card vp-turnos-card">
          <div className="vp-card-header">
            <div className="vp-card-title">
              <div className="vp-icon-circle blue">
                <FaCalendarAlt />
              </div>
              <h3>Próximos Turnos</h3>
            </div>
            {user.rol === "paciente" && (
              <button className="vp-btn-action-small" onClick={() => (window.location.hash = "#reservar")}>
                <FaPlus /> <span>Agendar</span>
              </button>
            )}
          </div>

          <div className="vp-card-list">
            {state.turnos && state.turnos.length > 0 ? (
              state.turnos.map((turno) => (
                <div className="vp-list-item turno-item" key={turno._id}>
                  <div className="vp-item-core">
                    <div className="vp-item-details">
                      <span className="vp-item-name">{turno.estudio?.tipo || "Consulta General"}</span>
                      <span className="vp-item-sub">
                        {turno.doctor ? `Dr. ${turno.doctor.nombre}` : "Doctor no asignado"}
                      </span>
                      <span className="vp-turno-date">
                        {new Date(turno.fecha).toLocaleDateString()} - {new Date(turno.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="vp-item-status">
                    <span className={`vp-badge-status ${turno.estado}`}>
                      {turno.estado.charAt(0).toUpperCase() + turno.estado.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="vp-empty-state">
                <p>No tienes turnos programados</p>
              </div>
            )}
          </div>
        </section>

        {/* Assigned Doctors */}
        <aside className="vp-card vp-doctors-card">
          <div className="vp-card-header">
            <div className="vp-card-title">
              <div className="vp-icon-circle blue">
                <FaUserMd />
              </div>
              <h3>Equipo Médico</h3>
            </div>
            {user.rol !== "paciente" && user.rol !== "doctor" && (
              <button className="vp-btn-action-small" onClick={handleOpenModalDoctor}>
                <FaPlus /> <span>Asignar</span>
              </button>
            )}
          </div>

          <div className="vp-card-list">
            {state.doctores && state.doctores.length > 0 ? (
              state.doctores.map((doctor) => (
                <div className="vp-list-item" key={doctor._id}>
                  <div className="vp-item-core">
                    <div className="vp-doctor-avatar-mini">
                      {doctor.nombre?.charAt(0) || "D"}
                    </div>
                    <div className="vp-item-details">
                      <span className="vp-item-name">{doctor.nombre}</span>
                      <span className="vp-item-sub">{doctor.especialidad || "Especialista"}</span>
                    </div>
                  </div>
                  {user.rol !== "paciente" && (
                    <button
                      className="vp-btn-icon-delete"
                      onClick={() => eliminarDoctorDelPaciente(doctor._id)}
                      disabled={loading}
                      title="Quitar doctor"
                    >
                      {loading ? <LoaderIcon /> : <FaTimes />}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="vp-empty-state">
                <p>No hay doctores asignados</p>
              </div>
            )}
          </div>
        </aside>

        {/* Medical Notes */}
        {user.rol !== "paciente" && (
          <main className="vp-card vp-notes-card">
            <div className="vp-card-header">
              <div className="vp-card-title">
                <div className="vp-icon-circle yellow">
                  <FaFileAlt />
                </div>
                <h3>Evolución y Notas</h3>
              </div>
              {user.rol !== "doctor" && (
                <button className="vp-btn-action-small" onClick={() => setNotaModalOpen(true)}>
                  <FaPlus /> <span>Nueva Nota</span>
                </button>
              )}
            </div>

            <div className="vp-notes-timeline">
              {state.paciente.notas && state.paciente.notas.length > 0 ? (
                state.paciente.notas.map((nota, index) => (
                  <div className="vp-timeline-item" key={index}>
                    <div className="vp-timeline-marker"></div>
                    <div className="vp-note-bubble">
                      <div className="vp-note-meta">
                        <span className="vp-note-author">{nota.author}</span>
                        <span className="vp-note-date">
                          {new Date(nota.fecha).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="vp-note-body">{nota.nota || "Sin contenido"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="vp-empty-state">
                  <p>Inicie el registro de notas médicas</p>
                </div>
              )}
            </div>
          </main>
        )}
      </div>

      {/* Documents Section */}
      {(userLogueado.rol === "secretaria" ||
        userLogueado.rol === "paciente" ||
        (userLogueado.rol === "doctor" &&
          state.doctores.some(
            (doctor) =>
              doctor._id === userID &&
              doctor.pacientes.includes(state.paciente._id)
          ))) && (
          <section className="vp-section-documents">
            <div className="vp-section-header">
              <div className="vp-card-title">
                <div className="vp-icon-circle teal">
                  <FaFolderOpen />
                </div>
                <h2>Expediente Digital</h2>
              </div>
              {userLogueado.rol !== "paciente" && (
                <button
                  className="vp-btn-primary"
                  onClick={() => {
                    setNombreArchivo("");
                    setArchivos([]);
                    dispatch({ type: "TOGGLE_MODAL" });
                  }}
                >
                  <FaPlus /> Subir Documentación
                </button>
              )}
            </div>

            {state.documentos.length > 0 ? (
              <div className="vp-folders-masonry">
                {state.documentos.map((doc, index) => (
                  <FolderCard
                    key={index}
                    doc={doc}
                    dispatch={dispatch}
                    setNombreArchivo={setNombreArchivo}
                    eliminarArchivo={eliminarArchivo}
                    loading={loading}
                    userLogueado={userLogueado}
                  />
                ))}
              </div>
            ) : (
              <div className="vp-empty-container-xl">
                <div className="vp-empty-illustration">
                  <FaFolder size={48} />
                </div>
                <p>El expediente no contiene archivos digitales aún</p>
              </div>
            )}
          </section>
        )}

      {/* Modals & Utils */}
      {state.modalOpen && (
        <div className="vp-modal-overlay" onClick={() => dispatch({ type: "TOGGLE_MODAL" })}>
          <div className="vp-modal-content scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="vp-modal-header">
              <h3>Gestión de Documentos</h3>
              <button className="vp-btn-close" onClick={() => dispatch({ type: "TOGGLE_MODAL" })}>
                <FaTimes />
              </button>
            </div>

            <div className="vp-modal-body">
              <div className="vp-form-group">
                <label>Categoría / Carpeta</label>
                <input
                  type="text"
                  placeholder="Ej: Análisis de Sangre"
                  value={state.nombreArchivo}
                  onChange={(e) => setNombreArchivo(e.target.value)}
                  className="vp-input"
                />
              </div>

              <div className="vp-upload-zone">
                <input
                  type="file"
                  id="vp-file-input"
                  multiple
                  onChange={(e) =>
                    setArchivos([
                      ...state.archivos,
                      ...Array.from(e.target.files),
                    ])
                  }
                  hidden
                />
                <label htmlFor="vp-file-input" className="vp-upload-label">
                  <FaPlus />
                  <span>Seleccionar Archivos</span>
                </label>
              </div>

              {state.archivos.length > 0 && (
                <div className="vp-selected-files">
                  <p>Archivos listos para subir ({state.archivos.length})</p>
                  <div className="vp-files-pills">
                    {state.archivos.map((file, index) => (
                      <div key={index} className="vp-file-pill">
                        <span className="vp-truncate">{file.name}</span>
                        <button
                          onClick={() => {
                            const nuevos = [...state.archivos];
                            nuevos.splice(index, 1);
                            setArchivos(nuevos);
                          }}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="vp-btn-submit-full"
                onClick={handleUpload}
                disabled={state.loadingFile || !state.nombreArchivo || state.archivos.length === 0}
              >
                {state.loadingFile ? (
                  <><span className="vp-spinner"></span> Subiendo...</>
                ) : (
                  "Iniciar Carga"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {notaModalOpen && (
        <ModalNota
          onClose={() => setNotaModalOpen(false)}
          showToast={showToast}
          setNotaModalOpen={setNotaModalOpen}
          nuevaNota={nuevaNota}
          setNuevaNota={setNuevaNota}
          handleGuardarNota={handleGuardarNota}
        />
      )}

      {modalAsignarDoctorOpen && (
        <ModalAsignarDoctor
          showToast={showToast}
          doctoresPaciente={state.doctores}
          id={state.paciente._id}
          doctores={doctoresList}
          modalAsignarDoctorOpen={modalAsignarDoctorOpen}
          setModalAsignarDoctorOpen={setModalAsignarDoctorOpen}
          onClose={() => setModalAsignarDoctorOpen(false)}
        />
      )}

      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

// FolderCard Redesigned
const FolderCard = ({
  doc,
  dispatch,
  setNombreArchivo,
  eliminarArchivo,
  loading,
  userLogueado,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`vp-folder-wrap ${isOpen ? "active" : ""}`}>
      <div className="vp-folder-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="vp-folder-info">
          <div className="vp-folder-icon-box">
            {isOpen ? <FaFolderOpen /> : <FaFolder />}
          </div>
          <div className="vp-folder-text">
            <h4 className="vp-folder-title">{doc.nombreArchivo || "Sin nombre"}</h4>
            <span className="vp-file-count">{doc.archivos.length} elementos</span>
          </div>
        </div>
        <div className="vp-folder-actions">
          {userLogueado.rol !== "paciente" && (
            <button
              className="vp-btn-add-file"
              onClick={(e) => {
                e.stopPropagation();
                setNombreArchivo(doc.nombreArchivo);
                dispatch({ type: "TOGGLE_MODAL" });
              }}
            >
              <FaPlus />
            </button>
          )}
          <div className={`vp-arrow ${isOpen ? "rotated" : ""}`}></div>
        </div>
      </div>

      {isOpen && (
        <div className="vp-folder-body">
          <div className="vp-files-grid">
            {doc.archivos.map((archivo) => (
              <div className="vp-file-card" key={archivo._id}>
                <div className="vp-file-preview-box">
                  {archivo.urlArchivo.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) ? (
                    <img src={archivo.urlArchivo} alt="Vista previa" className="vp-file-thumb" />
                  ) : (
                    <div className="vp-file-generic-icon">
                      {archivo.urlArchivo.toLowerCase().includes(".pdf") ? <FaFilePdf color="#ef4444" /> : <FaFileAlt color="#64748b" />}
                    </div>
                  )}
                  <div className="vp-file-overlay">
                    <button onClick={() => window.open(archivo.urlArchivo, "_blank")} title="Ver">
                      <FaEye />
                    </button>
                    <a href={archivo.urlArchivo} download title="Descargar">
                      <FaDownload />
                    </a>
                  </div>
                </div>
                <div className="vp-file-footer">
                  <span className="vp-file-label" title={archivo.originalFilename}>
                    {archivo.originalFilename}
                  </span>
                  {userLogueado.rol !== "paciente" && (
                    <button
                      className="vp-btn-delete-item"
                      onClick={() => eliminarArchivo(archivo._id, doc.nombreArchivo)}
                      disabled={loading}
                    >
                      <MdDeleteForever />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
