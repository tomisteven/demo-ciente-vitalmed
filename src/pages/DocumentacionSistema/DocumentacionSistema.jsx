import React, { useState } from "react";
import "./DocumentacionSistema.css";

export default function DocumentacionSistema() {
    const [activeSection, setActiveSection] = useState("secretaria");

    return (
        <div className="doc-container">
            {/* Hero Section */}
            <header className="doc-hero">
                <div className="hero-content">
                    <span className="hero-badge">Sistema Profesional</span>
                    <h1 className="hero-title">
                        <span className="hero-icon">🏥</span>
                        Sistema de Gestión de Consultorio Médico
                    </h1>
                    <p className="hero-subtitle">
                        Sistema Integral para la Administración de Consultorios, Clínicas y Centros de Diagnóstico
                    </p>
                    <div className="hero-tech">
                        <span className="tech-badge">React.js</span>
                        <span className="tech-badge">Node.js</span>
                        <span className="tech-badge">MongoDB</span>
                        <span className="tech-badge">Express.js</span>
                    </div>
                </div>
            </header>

            {/* Descripción General */}
            <section className="doc-section">
                <div className="section-header">
                    <h2><span className="section-icon">📋</span> Descripción General</h2>
                </div>
                <div className="section-content">
                    <p className="description-text">
                        Sistema web profesional diseñado para la <strong>gestión integral</strong> de consultorios médicos,
                        clínicas y centros de diagnóstico. Permite administrar <strong>pacientes, doctores, turnos,
                            estudios médicos</strong> y <strong>documentación clínica</strong> de manera eficiente y segura.
                    </p>
                </div>
            </section>

            {/* Roles */}
            <section className="doc-section roles-section">
                <div className="section-header">
                    <h2><span className="section-icon">👥</span> Roles y Usuarios</h2>
                    <p className="section-subtitle">3 tipos de usuarios con permisos específicos</p>
                </div>
                <div className="roles-grid">
                    <div className="role-card role-secretaria">
                        <div className="role-icon">🩺</div>
                        <h3>Secretaria / Administrador</h3>
                        <p>Acceso completo al sistema. Gestiona pacientes, doctores, turnos y configuración general.</p>
                    </div>
                    <div className="role-card role-doctor">
                        <div className="role-icon">👨‍⚕️</div>
                        <h3>Doctor</h3>
                        <p>Acceso a pacientes asignados, historial clínico y agenda de turnos personales.</p>
                    </div>
                    <div className="role-card role-paciente">
                        <div className="role-icon">👤</div>
                        <h3>Paciente</h3>
                        <p>Portal personal para reservar turnos, ver historial y acceder a documentos médicos.</p>
                    </div>
                </div>
            </section>

            {/* Tabs de Funcionalidades */}
            <section className="doc-section features-section">
                <div className="section-header">
                    <h2><span className="section-icon">✨</span> Funcionalidades por Rol</h2>
                </div>
                <div className="features-tabs">
                    <button
                        className={`tab-btn ${activeSection === "secretaria" ? "active" : ""}`}
                        onClick={() => setActiveSection("secretaria")}
                    >
                        🏢 Panel Secretaria
                    </button>
                    <button
                        className={`tab-btn ${activeSection === "doctor" ? "active" : ""}`}
                        onClick={() => setActiveSection("doctor")}
                    >
                        👨‍⚕️ Panel Doctor
                    </button>
                    <button
                        className={`tab-btn ${activeSection === "paciente" ? "active" : ""}`}
                        onClick={() => setActiveSection("paciente")}
                    >
                        👤 Portal Paciente
                    </button>
                </div>

                {/* Panel Secretaria */}
                {activeSection === "secretaria" && (
                    <div className="features-content">
                        <div className="feature-category">
                            <h3><span className="cat-icon">📁</span> Gestión de Pacientes</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Alta de pacientes con datos completos (nombre, DNI, edad, contacto)</li>
                                <li><span className="check">✅</span> Edición y actualización de información personal</li>
                                <li><span className="check">✅</span> Búsqueda y filtrado por nombre, DNI o estado</li>
                                <li><span className="check">✅</span> Visualización de perfil completo del paciente</li>
                                <li><span className="check">✅</span> Registro de obra social e información adicional</li>
                                <li><span className="check">✅</span> Estado del paciente (activo/baja con motivo)</li>
                                <li><span className="check">✅</span> Observaciones personalizadas por paciente</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">📄</span> Gestión Documental</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Carga de documentos (estudios, análisis, imágenes médicas)</li>
                                <li><span className="check">✅</span> Almacenamiento seguro de archivos en la nube</li>
                                <li><span className="check">✅</span> Descarga y visualización de documentos</li>
                                <li><span className="check">✅</span> Eliminación de archivos obsoletos</li>
                                <li><span className="check">✅</span> Historial de documentos con fecha de carga</li>
                                <li><span className="check">✅</span> Soporte para múltiples formatos (PDF, imágenes, etc.)</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">📝</span> Notas Clínicas</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Agregar notas a la ficha del paciente</li>
                                <li><span className="check">✅</span> Historial de notas con fecha y autor</li>
                                <li><span className="check">✅</span> Seguimiento de evolución del paciente</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">👨‍⚕️</span> Gestión de Doctores</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Alta de doctores con datos profesionales</li>
                                <li><span className="check">✅</span> Registro de especialidad médica</li>
                                <li><span className="check">✅</span> Datos de contacto (email, teléfono)</li>
                                <li><span className="check">✅</span> Listado completo de profesionales</li>
                                <li><span className="check">✅</span> Edición de información del doctor</li>
                                <li><span className="check">✅</span> Asignación de doctores a pacientes</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">👩‍💼</span> Gestión de Secretarias</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Alta de usuarios secretaria/administrativos</li>
                                <li><span className="check">✅</span> Gestión de accesos al sistema</li>
                                <li><span className="check">✅</span> Edición de datos de secretarias</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">📅</span> Gestión de Turnos</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Crear disponibilidad horaria por doctor</li>
                                <li><span className="check">✅</span> Configurar intervalos (15, 30, 45 o 60 minutos)</li>
                                <li><span className="check">✅</span> Generación masiva de turnos disponibles</li>
                                <li><span className="check">✅</span> Asignar turnos a pacientes</li>
                                <li><span className="check">✅</span> Cancelar turnos (vuelven a disponible)</li>
                                <li><span className="check">✅</span> Filtros avanzados: por estado, doctor, especialidad, estudio, fecha</li>
                                <li><span className="check">✅</span> Vista de lista con todos los turnos</li>
                                <li><span className="check">✅</span> Estados: Disponible, Reservado, Cancelado, Finalizado</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">📆</span> Calendario de Turnos</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Vista mensual, semanal y diaria</li>
                                <li><span className="check">✅</span> Vista agenda con listado</li>
                                <li><span className="check">✅</span> Código de colores por estado del turno</li>
                                <li><span className="check">✅</span> Estadísticas de turnos totales, disponibles y reservados</li>
                                <li><span className="check">✅</span> Detalle de turno al hacer clic</li>
                                <li><span className="check">✅</span> Navegación intuitiva entre fechas</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">🔬</span> Gestión de Estudios/Prácticas</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Catálogo de estudios médicos disponibles</li>
                                <li><span className="check">✅</span> Precio de cada estudio</li>
                                <li><span className="check">✅</span> Aclaraciones especiales (preparación previa, requisitos)</li>
                                <li><span className="check">✅</span> Activar/desactivar estudios</li>
                                <li><span className="check">✅</span> Selección de estudios al crear disponibilidad</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Panel Doctor */}
                {activeSection === "doctor" && (
                    <div className="features-content">
                        <div className="feature-category">
                            <h3><span className="cat-icon">👥</span> Acceso a Pacientes</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Ver pacientes asignados a su perfil</li>
                                <li><span className="check">✅</span> Acceso al perfil completo del paciente</li>
                                <li><span className="check">✅</span> Visualizar documentación clínica</li>
                                <li><span className="check">✅</span> Ver historial de notas del paciente</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">📋</span> Ficha del Paciente</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Datos personales completos</li>
                                <li><span className="check">✅</span> Documentos médicos cargados</li>
                                <li><span className="check">✅</span> Notas clínicas de seguimiento</li>
                                <li><span className="check">✅</span> Doctores asignados al paciente</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Portal Paciente */}
                {activeSection === "paciente" && (
                    <div className="features-content">
                        <div className="feature-category">
                            <h3><span className="cat-icon">🔐</span> Autenticación</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Registro de cuenta con datos personales</li>
                                <li><span className="check">✅</span> Inicio de sesión seguro</li>
                                <li><span className="check">✅</span> Recuperación de contraseña</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">📅</span> Reserva de Turnos</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Buscar turnos disponibles por especialidad</li>
                                <li><span className="check">✅</span> Filtrar por doctor específico</li>
                                <li><span className="check">✅</span> Filtrar por fecha deseada</li>
                                <li><span className="check">✅</span> Ver horarios disponibles en formato tarjeta</li>
                                <li><span className="check">✅</span> Reservar turno con motivo de consulta</li>
                                <li><span className="check">✅</span> Seleccionar estudio a realizar</li>
                                <li><span className="check">✅</span> Confirmación por email al reservar</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">📋</span> Mis Turnos</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Ver turnos próximos programados</li>
                                <li><span className="check">✅</span> Historial de turnos pasados</li>
                                <li><span className="check">✅</span> Detalle de cada turno (fecha, doctor, especialidad)</li>
                                <li><span className="check">✅</span> Cancelar turnos próximos</li>
                                <li><span className="check">✅</span> Estado visual con colores</li>
                            </ul>
                        </div>

                        <div className="feature-category">
                            <h3><span className="cat-icon">📁</span> Mi Perfil</h3>
                            <ul className="feature-list">
                                <li><span className="check">✅</span> Ver información personal</li>
                                <li><span className="check">✅</span> Acceder a documentos médicos</li>
                                <li><span className="check">✅</span> Ver notas del historial clínico</li>
                            </ul>
                        </div>
                    </div>
                )}
            </section>

            {/* Características de la Interfaz */}
            <section className="doc-section interface-section">
                <div className="section-header">
                    <h2><span className="section-icon">🎨</span> Características de la Interfaz</h2>
                </div>
                <div className="interface-grid">
                    <div className="interface-card">
                        <h4>🖥️ Diseño Profesional</h4>
                        <ul>
                            <li>Interfaz moderna y limpia</li>
                            <li>Navegación intuitiva con menú lateral</li>
                            <li>Diseño responsive (desktop, tablet, móvil)</li>
                            <li>Breadcrumbs para ubicación</li>
                            <li>Notificaciones toast de acciones</li>
                            <li>Alertas de confirmación</li>
                        </ul>
                    </div>
                    <div className="interface-card">
                        <h4>📱 Menú Adaptable</h4>
                        <ul>
                            <li>Menú desktop fijo lateral</li>
                            <li>Menú móvil hamburguesa</li>
                            <li>Opciones según rol del usuario</li>
                            <li>Cierre de sesión accesible</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Seguridad */}
            <section className="doc-section security-section">
                <div className="section-header">
                    <h2><span className="section-icon">🔒</span> Seguridad</h2>
                </div>
                <div className="security-grid">
                    <div className="security-item">
                        <span className="security-icon">🔑</span>
                        <span>Autenticación con tokens JWT</span>
                    </div>
                    <div className="security-item">
                        <span className="security-icon">🛡️</span>
                        <span>Rutas protegidas por rol</span>
                    </div>
                    <div className="security-item">
                        <span className="security-icon">🔐</span>
                        <span>Contraseñas encriptadas</span>
                    </div>
                    <div className="security-item">
                        <span className="security-icon">⏱️</span>
                        <span>Sesiones con expiración automática</span>
                    </div>
                    <div className="security-item">
                        <span className="security-icon">✔️</span>
                        <span>Validación de permisos en cada acción</span>
                    </div>
                </div>
            </section>

            {/* Datos del Sistema */}
            <section className="doc-section data-section">
                <div className="section-header">
                    <h2><span className="section-icon">📊</span> Datos que Gestiona el Sistema</h2>
                </div>
                <div className="data-grid">
                    <div className="data-card">
                        <h4>👤 Pacientes</h4>
                        <table className="data-table">
                            <tbody>
                                <tr><td>Nombre</td><td>Nombre completo</td></tr>
                                <tr><td>DNI/CI</td><td>Documento de identidad</td></tr>
                                <tr><td>Edad</td><td>Edad del paciente</td></tr>
                                <tr><td>Email</td><td>Correo electrónico</td></tr>
                                <tr><td>Teléfono</td><td>Número de contacto</td></tr>
                                <tr><td>Dirección</td><td>Domicilio completo</td></tr>
                                <tr><td>Obra Social</td><td>Cobertura médica</td></tr>
                                <tr><td>Documentos</td><td>Archivos médicos</td></tr>
                                <tr><td>Notas</td><td>Historial clínico</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="data-card">
                        <h4>👨‍⚕️ Doctores</h4>
                        <table className="data-table">
                            <tbody>
                                <tr><td>Nombre</td><td>Nombre del profesional</td></tr>
                                <tr><td>Especialidad</td><td>Área médica</td></tr>
                                <tr><td>Email</td><td>Correo electrónico</td></tr>
                                <tr><td>Teléfono</td><td>Número de contacto</td></tr>
                                <tr><td>Pacientes</td><td>Lista de asignados</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="data-card">
                        <h4>📅 Turnos</h4>
                        <table className="data-table">
                            <tbody>
                                <tr><td>Fecha y hora</td><td>Momento del turno</td></tr>
                                <tr><td>Doctor</td><td>Profesional asignado</td></tr>
                                <tr><td>Paciente</td><td>Persona que reserva</td></tr>
                                <tr><td>Estudio</td><td>Práctica a realizar</td></tr>
                                <tr><td>Estado</td><td>Disponible/Reservado/etc</td></tr>
                                <tr><td>Motivo</td><td>Razón de consulta</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="data-card">
                        <h4>🔬 Estudios</h4>
                        <table className="data-table">
                            <tbody>
                                <tr><td>Tipo</td><td>Nombre del estudio</td></tr>
                                <tr><td>Precio</td><td>Costo del estudio</td></tr>
                                <tr><td>Aclaraciones</td><td>Preparación requerida</td></tr>
                                <tr><td>Activo</td><td>Disponibilidad</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Beneficios */}
            <section className="doc-section benefits-section">
                <div className="section-header">
                    <h2><span className="section-icon">💡</span> Beneficios del Sistema</h2>
                </div>
                <div className="benefits-grid">
                    <div className="benefit-item">
                        <span className="benefit-number">1</span>
                        <div className="benefit-content">
                            <h4>Organización centralizada</h4>
                            <p>Toda la información del consultorio en un solo lugar</p>
                        </div>
                    </div>
                    <div className="benefit-item">
                        <span className="benefit-number">2</span>
                        <div className="benefit-content">
                            <h4>Reducción de errores</h4>
                            <p>Gestión automatizada de turnos sin conflictos</p>
                        </div>
                    </div>
                    <div className="benefit-item">
                        <span className="benefit-number">3</span>
                        <div className="benefit-content">
                            <h4>Accesibilidad 24/7</h4>
                            <p>Pacientes pueden reservar turnos en cualquier momento</p>
                        </div>
                    </div>
                    <div className="benefit-item">
                        <span className="benefit-number">4</span>
                        <div className="benefit-content">
                            <h4>Historial completo</h4>
                            <p>Registro detallado de cada paciente y sus consultas</p>
                        </div>
                    </div>
                    <div className="benefit-item">
                        <span className="benefit-number">5</span>
                        <div className="benefit-content">
                            <h4>Optimización del tiempo</h4>
                            <p>Automatización de tareas administrativas</p>
                        </div>
                    </div>
                    <div className="benefit-item">
                        <span className="benefit-number">6</span>
                        <div className="benefit-content">
                            <h4>Profesionalismo</h4>
                            <p>Imagen moderna y profesional para sus pacientes</p>
                        </div>
                    </div>
                    <div className="benefit-item">
                        <span className="benefit-number">7</span>
                        <div className="benefit-content">
                            <h4>Reportes visuales</h4>
                            <p>Calendario y estadísticas de turnos en tiempo real</p>
                        </div>
                    </div>
                    <div className="benefit-item">
                        <span className="benefit-number">8</span>
                        <div className="benefit-content">
                            <h4>Escalabilidad</h4>
                            <p>Crece con su consultorio, múltiples doctores y especialidades</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Especificaciones Técnicas */}
            <section className="doc-section tech-section">
                <div className="section-header">
                    <h2><span className="section-icon">🛠️</span> Especificaciones Técnicas</h2>
                </div>
                <div className="tech-grid">
                    <div className="tech-item">
                        <span className="tech-label">Frontend</span>
                        <span className="tech-value">React.js 18</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-label">Backend</span>
                        <span className="tech-value">Node.js + Express.js</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-label">Base de Datos</span>
                        <span className="tech-value">MongoDB</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-label">Autenticación</span>
                        <span className="tech-value">JWT (JSON Web Tokens)</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-label">Calendario</span>
                        <span className="tech-value">react-big-calendar</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-label">Notificaciones</span>
                        <span className="tech-value">react-hot-toast + SweetAlert2</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-label">Almacenamiento</span>
                        <span className="tech-value">Cloudinary</span>
                    </div>
                    <div className="tech-item">
                        <span className="tech-label">Hosting</span>
                        <span className="tech-value">Vercel, Railway, etc.</span>
                    </div>
                </div>
            </section>

            {/* Personalización */}
            <section className="doc-section custom-section">
                <div className="section-header">
                    <h2><span className="section-icon">📞</span> Personalización Incluida</h2>
                </div>
                <div className="custom-list">
                    <div className="custom-item"><span className="custom-check">✅</span> Logo y colores de su marca</div>
                    <div className="custom-item"><span className="custom-check">✅</span> Nombre del consultorio/clínica</div>
                    <div className="custom-item"><span className="custom-check">✅</span> Información de contacto</div>
                    <div className="custom-item"><span className="custom-check">✅</span> Especialidades médicas específicas</div>
                    <div className="custom-item"><span className="custom-check">✅</span> Catálogo de estudios personalizado</div>
                </div>
            </section>

            {/* Implementación */}
            <section className="doc-section implementation-section">
                <div className="section-header">
                    <h2><span className="section-icon">🚀</span> Proceso de Implementación</h2>
                </div>
                <div className="implementation-timeline">
                    <div className="timeline-item">
                        <span className="timeline-step">1</span>
                        <div className="timeline-content">
                            <h4>Configuración inicial</h4>
                            <p>Setup de base de datos y servidor</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-step">2</span>
                        <div className="timeline-content">
                            <h4>Personalización</h4>
                            <p>Adaptación de marca y colores</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-step">3</span>
                        <div className="timeline-content">
                            <h4>Carga de catálogo</h4>
                            <p>Configuración de estudios médicos</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-step">4</span>
                        <div className="timeline-content">
                            <h4>Alta de usuarios</h4>
                            <p>Creación de usuarios iniciales</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-step">5</span>
                        <div className="timeline-content">
                            <h4>Capacitación</h4>
                            <p>Entrenamiento del personal</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-step">6</span>
                        <div className="timeline-content">
                            <h4>Puesta en producción</h4>
                            <p>Lanzamiento del sistema</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <footer className="doc-footer">
                <div className="footer-content">
                    <h2>🏥 Sistema listo para usar</h2>
                    <p>Solución completa para la gestión de su consultorio médico</p>
                    <div className="footer-badges">
                        <span className="footer-badge">✅ Profesional</span>
                        <span className="footer-badge">✅ Seguro</span>
                        <span className="footer-badge">✅ Personalizable</span>
                        <span className="footer-badge">✅ Soporte incluido</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
