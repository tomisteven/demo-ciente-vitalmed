import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaWhatsapp, FaInstagram } from "react-icons/fa";
import "./Auth.css";
import textlogo from "../../assets/vitalmed/logotipo2.png";
import { AuthAPI } from "../../api/auth";
import ToastMessage from "../../utils/ToastMessage";

const AuthController = new AuthAPI();

export function Auth() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const formik = useFormik({
    initialValues: {
      usuario: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      usuario: Yup.string()
        .min(3, "El usuario debe tener al menos 3 caracteres")
        .required("El campo usuario es requerido"),
      password: Yup.string()
        .min(4, "La contraseña debe tener al menos 4 caracteres")
        .required("El campo contraseña es requerido"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      setFormError("");
      const errors = await formik.validateForm(values);
      if (Object.keys(errors).length > 0) {
        setFormError("Por favor, completa todos los campos correctamente");
        setSubmitting(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await AuthController.loginForm({
          usuario: values.usuario,
          password: values.password,
        });

        if (!res.ok) {
          setFormError(res.message || "Usuario o contraseña incorrectos");
          setIsLoading(false);
          return;
        }

        const { usuario, rol } = res;
        const user = { usuario, rol };

        localStorage.setItem("userLog", JSON.stringify(user));

        if (values.remember) {
          localStorage.setItem("rememberedUser", values.usuario);
        } else {
          localStorage.removeItem("rememberedUser");
        }

        setIsLoading(false);
        setIsSuccess(true);
        showToast("¡Inicio de sesión exitoso!", "success");

        setTimeout(() => {
          let dest = "/";
          if (rol === "paciente" && usuario?._id) {
            dest = `#/admin/pacientes/${usuario._id}`;
          } else {
            dest = "#/admin/pacientes";
          }
          window.location.href = dest;
          window.location.reload();
        }, 1200);
      } catch (err) {
        console.error("Error en login:", err);
        setFormError("Ocurrió un error inesperado. Por favor, intente nuevamente.");
        setIsLoading(false);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      formik.setFieldValue("usuario", rememberedUser);
      formik.setFieldValue("remember", true);
    }
  }, []);

  if (isSuccess) {
    return (
      <div className="auth-transition-overlay">
        <div className="auth-transition-content">
          <div className="auth-brand-loader">
            <img src={textlogo} alt="Logo" className="pulse-logo" />
          </div>
          <div className="modern-spinner"></div>
          <h2>Conectando...</h2>
          <p>Preparando su portal médico profesional</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card centered-layout">
        <div className="auth-form-container">
          <div className="auth-brand">
            <img src={textlogo} alt="VitalMed Logo" className="auth-logo-centered" />
          </div>

          <div className="auth-header">
            <h1>Bienvenido</h1>
            <p>Acceda a su portal médico profesional</p>
          </div>

          <form className="auth-form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="usuario">Usuario</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  id="usuario"
                  type="text"
                  placeholder="Nombre de usuario"
                  {...formik.getFieldProps("usuario")}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña segura"
                  {...formik.getFieldProps("password")}
                  className="form-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...formik.getFieldProps("remember")}
                  checked={formik.values.remember}
                />
                <span>Recordar mi sesión</span>
              </label>
            </div>

            {formError && (
              <div className="form-error-message">
                <span>{formError}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-login"
              disabled={formik.isSubmitting || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Autenticando...</span>
                </>
              ) : (
                "Entrar al Sistema"
              )}
            </button>
          </form>

          <footer className="auth-footer">
            <p>© Factos Dev - Gestión de Confianza</p>
            <div className="social-links-minimal">
              <a href="https://wa.me/qr/NGJUQHKJKLDWC1" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
              <a href="https://www.instagram.com/doctoraecos?igsh=MXVnbGZzaXg3YzJxdQ==" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </footer>
        </div>
      </div>

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
