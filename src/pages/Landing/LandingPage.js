import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaGraduationCap, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaComment, FaBook } from "react-icons/fa";
import "./LandingPage.css";
import doctores from "../../assets/vitalmed/doctores.png";
import logo from "../../assets/vitalmed/logotipo2.png";

export default function LandingPage() {
    const navigate = useNavigate();

    const handleInformes = () => {
        navigate("/admin/auth");
    };

    const handleCursos = () => {
        navigate("/cursos");
    };

    const handleDocumentacion = () => {
        navigate("/documentacion");
    };

    return (
        <div className="landing-container">
            {/* Social Media Sidebar */}
            <div className="social-sidebar">
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="WhatsApp"
                >
                    <FaWhatsapp />
                </a>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Threads"
                >
                    <FaComment />
                </a>
                <a
                    href="#"
                    className="social-icon"
                    aria-label="Ubicación"
                >
                    <FaMapMarkerAlt />
                </a>
            </div>

            {/* Main Content */}
            <div className="landing-content">
                {/* Header with Logo and Title */}
                <header className="landing-header">
                    <div className="logo-container">
                        <img src={logo} alt="Logo" className="logo-icon" />
                        <div className="header-text">
                            <h1 className="doctor-name">Dra. Demo Doctor</h1>
                            <p className="specialty">Demo Especialidad</p>
                        </div>
                    </div>

                    <button className="btn-informes" onClick={handleInformes}>
                        <span>Iniciar Sesión</span>
                        <FaUser className="btn-icon" />
                    </button>
                </header>

                {/* Welcome Section */}
                <main className="welcome-section">
                    <div className="welcome-text">
                        <h2 className="welcome-title">
                            Bienvenidos a<br />
                            <span className="brand-name">Demo Doctor</span>
                        </h2>
                        <p className="welcome-description">
                            Ofrecemos soluciones innovadoras para la gestión de su salud.
                            Nuestro compromiso es brindarle una atención premium, personalizada y eficiente.
                            Explore nuestros servicios y agende su cita de manera rápida y segura.
                        </p>
                    </div>

                    {/* Doctor Image */}
                    <div className="doctor-image-container">
                        <img src={doctores} alt="Dra. Demo Doctor" className="doctor-image" />
                    </div>
                </main>

                {/* Action Buttons - Moved for better accessibility */}
                <div className="action-buttons primary-actions">
                    <button className="btn-action btn-agenda" onClick={handleInformes}>
                        <span className="btn-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                            </svg>
                        </span>
                        <span>Agendar Turno</span>
                    </button>
                    <button className="btn-action" onClick={handleDocumentacion}>
                        <span className="btn-icon"><FaBook /></span>
                        <span>Documentación</span>
                    </button>
                    {/* <button className="btn-action" onClick={handleCursos}>
                        <span className="btn-icon"><FaGraduationCap /></span>
                        <span>Academi</span>
                    </button> */}
                    <button className="btn-action">
                        <span className="btn-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8v-2H6V4h8v4.29c.7-.35 1.48-.56 2.31-.56.55 0 1.09.09 1.6.26V8l-6-6zM20.5 13.5c0-2.48-2.02-4.5-4.5-4.5s-4.5 2.02-4.5 4.5 2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5zm-4.5 2.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM19.47 18.06l2.82 2.82-1.41 1.41-2.82-2.82c-1.15.75-2.54.99-3.86.63-.44-.12-.86-.3-1.25-.54l-.11-.07c-.12-.08-.24-.17-.35-.27-.1-.09-.19-.19-.28-.29l-.05-.06c-.85-1.03-1.22-2.38-.96-3.7.35-1.79 1.93-3.14 3.75-3.14 2.12 0 3.85 1.73 3.85 3.85 0 .8-.23 1.54-.63 2.18z" />
                            </svg>
                        </span>
                        <span>Descargar Estudios</span>
                    </button>
                </div>

                {/* Patient Portal Preview Section */}
                <section className="patient-portal-preview">
                    <div className="section-header-small">
                        <span className="badge">Portal del Paciente</span>
                        <h3>Servicios Digitales para su Salud</h3>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                            <h4>Reserva Online 24/7</h4>
                            <p>Autogestión de turnos por especialidad o médico. Confirmación inmediata vía email.</p>
                        </div>

                        <div className="service-card">
                            <div className="service-icon-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                            <h4>Tu Historial Digital</h4>
                            <p>Acceso seguro a resultados de estudios, recetas y evolución clínica personalizada.</p>
                        </div>

                        <div className="service-card">
                            <div className="service-icon-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h4>Seguridad y Privacidad</h4>
                            <p>Protección total de sus datos mediante encriptación SSL y acceso por tokens seguros (JWT).</p>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="benefits-preview">
                    <div className="benefits-grid">
                        <div className="benefit-item-small">
                            <span className="benefit-icon">✔️</span>
                            <div>
                                <h5>Organización Centralizada</h5>
                                <p>Toda su información médica en un solo lugar.</p>
                            </div>
                        </div>
                        <div className="benefit-item-small">
                            <span className="benefit-icon">✔️</span>
                            <div>
                                <h5>Optimización del Tiempo</h5>
                                <p>Evite esperas telefónicas y gestione su agenda.</p>
                            </div>
                        </div>
                        <div className="benefit-item-small">
                            <span className="benefit-icon">✔️</span>
                            <div>
                                <h5>Profesionalismo Garantizado</h5>
                                <p>Atención de vanguardia con tecnología de punta.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="landing-footer">
                    <p>Copyright © {new Date().getFullYear()} - Dra. Jeremmy Gutierrez - <span className="brand-name">Vitalmed</span></p>
                </footer>
            </div>
        </div>
    );
}
