import React from "react";
import {
    FaUserCog, FaUserMd, FaUserInjured, FaCheckCircle,
    FaQuestionCircle, FaArrowRight, FaIdCard, FaLock,
    FaMobileAlt, FaShieldAlt, FaCogs, FaClock, FaExclamationTriangle,
    FaPaperPlane, FaWhatsapp, FaInstagram
} from "react-icons/fa";
import "./DemoPage.css";
import logo from "../../assets/vitalmed/logotipo2.png";

export default function DemoPage() {
    const roles = [
        {
            role: "Secretaria",
            icon: <FaUserCog />,
            user: "Demo1Secretaria",
            pass: "1234",
            description: "Gestión diaria: pacientes, turnos, agenda médica y organización general.",
            color: "#0ea5e9"
        },
        {
            role: "Doctor",
            icon: <FaUserMd />,
            user: "doctordemo",
            pass: "1234",
            description: "Atención médica: historial clínico, turnos asignados y seguimiento de tratamientos.",
            color: "#2dd4bf"
        },
        {
            role: "Paciente",
            icon: <FaUserInjured />,
            user: "paciente1",
            pass: "1234",
            description: "Autonomía: visualización de turnos propios e historial médico personal.",
            color: "#6366f1"
        }
    ];

    const faqs = [
        {
            q: "¿El sistema es difícil de usar?",
            a: "No. Está diseñado para ser intuitivo y fácil, incluso sin conocimientos técnicos."
        },
        {
            q: "¿Se puede usar desde cualquier dispositivo?",
            a: "Sí. Funciona perfectamente en computadora, tablet o celular, sin instalar nada."
        },
        {
            q: "¿La información está segura?",
            a: "Sí. Contamos con control de accesos por rol y protocolos de protección de datos."
        },
        {
            q: "¿Se puede adaptar a mi consultorio?",
            a: "Sí. Es personalizable según especialidad, flujo de trabajo y necesidades específicas."
        }
    ];

    return (
        <div className="demo-page">
            <header className="demo-header">
                <div className="demo-container">
                    <img src={logo} alt="VitalMed Logo" className="demo-logo" />
                    <nav className="demo-nav">
                        <a href="#accesos" className="demo-nav-link">Accesos</a>
                        <a href="#faq" className="demo-nav-link">Preguntas</a>
                        <a href="#/admin/auth" className="demo-btn-primary">Ir a la Login</a>
                    </nav>
                </div>
            </header>

            <section className="demo-hero">
                <div className="demo-container">
                    <div className="demo-hero-badge">Demo Interactiva Disponible</div>
                    <h1>VitalMed: El futuro de la <span className="text-gradient">Gestión Médica</span></h1>
                    <p className="demo-hero-text">
                        Sistema integral diseñado para consultorios y profesionales que buscan eficiencia,
                        orden y una experiencia superior para sus pacientes.
                    </p>
                    <div className="demo-hero-btns">
                        <a href="#/admin/auth" className="demo-btn-hero">Probar Demo Ahora <FaArrowRight /></a>
                    </div>
                </div>
            </section>

            <section className="demo-section" id="accesos">
                <div className="demo-container">
                    <div className="section-header">
                        <h2>Acceso por Roles</h2>
                        <p>Ingresa con las siguientes credenciales para explorar cada perspectiva del sistema.</p>
                    </div>

                    <div className="demo-roles-grid">
                        {roles.map((r, i) => (
                            <div key={i} className="demo-role-card" style={{ "--role-color": r.color }}>
                                <div className="role-icon">{r.icon}</div>
                                <h3>{r.role}</h3>
                                <p>{r.description}</p>
                                <div className="role-creds">
                                    <div className="cred-item">
                                        <span className="cred-label"><FaIdCard /> Usuario:</span>
                                        <span className="cred-value">{r.user}</span>
                                    </div>
                                    <div className="cred-item">
                                        <span className="cred-label"><FaLock /> Contraseña:</span>
                                        <span className="cred-value">{r.pass}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="demo-section bg-light">
                <div className="demo-container">
                    <div className="section-header">
                        <h2>¿Qué problemas solucionamos?</h2>
                    </div>
                    <div className="problems-grid">
                        {[
                            { t: "Desorganización en Agendas", i: <FaClock /> },
                            { t: "Pérdida de Información", i: <FaExclamationTriangle /> },
                            { t: "Falta de Comunicación", i: <FaPaperPlane /> },
                            { t: "Dificultad en Historiales", i: <FaShieldAlt /> }
                        ].map((p, i) => (
                            <div key={i} className="problem-card">
                                <div className="prob-icon">{p.i}</div>
                                <span>{p.t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="demo-section" id="faq">
                <div className="demo-container">
                    <div className="section-header">
                        <h2>Preguntas Frecuentes</h2>
                    </div>
                    <div className="faq-grid">
                        {faqs.map((f, i) => (
                            <div key={i} className="faq-card">
                                <div className="faq-icon"><FaQuestionCircle /></div>
                                <div className="faq-content">
                                    <h4>{f.q}</h4>
                                    <p>{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="demo-footer">
                <div className="demo-container">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <img src={logo} alt="VitalMed" />
                            <p>Sistema de Gestión Médica de Confianza</p>
                        </div>
                        <div className="footer-social">
                            <a href="https://wa.me/qr/NGJUQHKJKLDWC1" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
                            <a href="https://www.instagram.com/doctoraecos?igsh=MXVnbGZzaXg3YzJxdQ==" target="_blank" rel="noreferrer"><FaInstagram /></a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} Factos Dev - Demo VitalMed. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
