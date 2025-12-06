import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Pages
import { Auth } from "../pages/Auth";
import Pacientes from "../pages/Pacientes";
import VerPaciente from "../pages/VerPaciente";
import Doctores from "../pages/Doctores";
import Secretarias from "../pages/Secretarias";
import Turnos from "../pages/Turnos";
import ReservarTurno from "../pages/ReservarTurno";
import MisTurnosPage from "../pages/MisTurnos";
import UsuarioLogueado from "../pages/Dashboard";
import LandingPage from "../pages/Landing";
import Cursos from "../pages/Cursos";
import NotFound from "../pages/NotFound";
import DocumentacionSistema from "../pages/DocumentacionSistema/DocumentacionSistema";

// Components
import { AdminLayout } from "../layouts";
import ProtectedRoute from "../Components/ProtectedRoutes";

export function AdminRoutes({ notificacion }) {
  const user = JSON.parse(localStorage.getItem("userLog"));

  const [loading, setLoading] = React.useState(true);

  const loadLayout = (Layout, Page, props) => (
    <Layout>
      <Page {...props} />
      <Toaster />
    </Layout>
  );

  if (
    !user ||
    typeof user === "undefined" ||
    user.message === "Token expirado"
  ) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/admin/auth" element={<Auth />} />
        <Route path="/documentacion" element={<DocumentacionSistema />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/admin/pacientes"
        element={
          <ProtectedRoute
            user={user}
            allowedRoles={["secretaria", "doctor"]}
          >
            {loadLayout(AdminLayout, Pacientes, {
              loading,
              setLoading,
              notificacion,
            })}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/pacientes/:id"
        element={
          <ProtectedRoute
            user={user}
            allowedRoles={["secretaria", "doctor", "paciente"]}
          >
            {loadLayout(AdminLayout, VerPaciente, {
              loading,
              setLoading,
              notificacion,
            })}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/secretarias"
        element={
          <ProtectedRoute user={user} allowedRoles={["secretaria"]}>
            {loadLayout(AdminLayout, Secretarias, {
              loading,
              setLoading,
              notificacion,
            })}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctores"
        element={
          <ProtectedRoute user={user} allowedRoles={["secretaria"]}>
            {loadLayout(AdminLayout, Doctores, {
              loading,
              setLoading,
              notificacion,
            })}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/turnos"
        element={
          <ProtectedRoute user={user} allowedRoles={["secretaria"]}>
            {loadLayout(AdminLayout, Turnos, {
              loading,
              setLoading,
              notificacion,
            })}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reservar-turno"
        element={
          <ProtectedRoute user={user} allowedRoles={["paciente"]}>
            {loadLayout(AdminLayout, ReservarTurno, {
              loading,
              setLoading,
              notificacion,
            })}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/mis-turnos"
        element={
          <ProtectedRoute user={user} allowedRoles={["paciente"]}>
            {loadLayout(AdminLayout, MisTurnosPage, {
              loading,
              setLoading,
              notificacion,
            })}
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute
            user={user}
            allowedRoles={["paciente", "doctor", "secretaria"]}
          >
            {loadLayout(AdminLayout, UsuarioLogueado, {
              loading,
              setLoading,
              notificacion,
            })}
          </ProtectedRoute>
        }
      />

      {/* Si la ruta no existe, redirigí a una ruta por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
