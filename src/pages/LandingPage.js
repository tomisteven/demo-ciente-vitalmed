import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaGraduationCap, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaComment } from "react-icons/fa";
import "./LandingPage.css";
import doctora from "../assets/vitalmed/doc.png";
import logo from "../assets/vitalmed/logotipo2.png";

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

            {/* Main Content */}
            <div className="landing-content">
                {/* Social Media Sidebar */}
                <div className="social-sidebar">
                    <p className="social-sidebar-text">Estoy solo agregá mi Link - agendá tu cita</p>
                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon instagram"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon whatsapp"
                        aria-label="WhatsApp"
                    >
                        <FaWhatsapp />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon threads"
                        aria-label="Threads"
                    >
                        <FaComment />
                    </a>
                    <a
                        href="#"
                        className="social-icon location"
                        aria-label="Ubicación"
                    >
                        <FaMapMarkerAlt />
                    </a>
                </div>
                {/* Header with Logo and Title */}
                <div className="landing-header">
                    <div className="logo-container">
                        <img src={logo} alt="Logo" className="logo-icon" />
                        <div className="header-text">
                            <h1 className="doctor-name">Dra. Demo Doctor</h1>
                            <p className="specialty">Demo Especialidad</p>
                        </div>
                    </div>

                    {/* Informes Button (Top Right) */}
                    <button className="btn-informes" onClick={handleInformes}>
                        <span>informes</span>
                        <FaUser className="btn-icon" />
                    </button>
                </div>

                {/* Welcome Section */}
                <div className="welcome-section">
                    <div className="welcome-text">
                        <h2 className="welcome-title">
                            Bienvenidos a<br />
                            <span className="brand-name">Demo Doctor</span>
                        </h2>
                        <p className="welcome-description">
                            Demo Descripción lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Quisquam, quod. Quisquam, quod. Quisquam, quod.
                        </p>
                    </div>

                    {/* Doctor Image */}
                    <div className="doctor-image-container">
                        <img src={doctora} alt="Dra. Jeremmy Gutierrez" className="doctor-image" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="btn-action btn-documentacion" onClick={handleDocumentacion}>
                        <span>DOCUMENTACION</span>
                        <FaGraduationCap className="btn-icon" />
                    </button>
                    <button className="btn-action btn-estudios">
                        <span>estudios</span>
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8v-2H6V4h8v4.29c.7-.35 1.48-.56 2.31-.56.55 0 1.09.09 1.6.26V8l-6-6zM20.5 13.5c0-2.48-2.02-4.5-4.5-4.5s-4.5 2.02-4.5 4.5 2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5zm-4.5 2.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM19.47 18.06l2.82 2.82-1.41 1.41-2.82-2.82c-1.15.75-2.54.99-3.86.63-.44-.12-.86-.3-1.25-.54l-.11-.07c-.12-.08-.24-.17-.35-.27-.1-.09-.19-.19-.28-.29l-.05-.06c-.85-1.03-1.22-2.38-.96-3.7.35-1.79 1.93-3.14 3.75-3.14 2.12 0 3.85 1.73 3.85 3.85 0 .8-.23 1.54-.63 2.18z" />
                        </svg>
                    </button>
                    <button className="btn-action btn-cursos" onClick={handleCursos}>
                        <span>Cursos VIP</span>
                        <FaGraduationCap className="btn-icon" />
                    </button>
                    <button className="btn-action btn-agenda" onClick={handleInformes}>
                        <span>agenda cita</span>
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="landing-footer">
                <p>Copyright © 2025 - Dra. Jeremmy Gutierrez</p>
            </footer>
        </div>
    );
}
