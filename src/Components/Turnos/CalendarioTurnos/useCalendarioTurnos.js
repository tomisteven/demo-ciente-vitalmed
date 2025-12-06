import { useState, useEffect, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TurnosApi } from "../../../api/Turnos";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const turnosApi = new TurnosApi();

export function useCalendarioTurnos() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("month");
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        cargarTurnos();
    }, []);

    const cargarTurnos = useCallback(async () => {
        setLoading(true);
        try {
            const response = await turnosApi.buscarTurnos();
            const listaTurnos = Array.isArray(response) ? response : (response?.turnos || []);

            const eventosFormateados = listaTurnos.map((turno) => ({
                id: turno._id,
                title: turno.estado === "disponible" ? "Disponible" : (turno.paciente?.nombre || "Reservado"),
                start: new Date(turno.fecha),
                end: new Date(new Date(turno.fecha).getTime() + 30 * 60000),
                resource: turno,
                doctor: turno.doctor?.nombre || "Doctor no asignado",
                estudio: turno.estudio?.tipo || turno.especialidad || "No especificado",
                estado: turno.estado,
                paciente: turno.paciente,
            }));
            setEventos(eventosFormateados);
        } catch (error) {
            console.error("Error al cargar turnos:", error);
            toast.error("Error al cargar los turnos del calendario");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSelectEvent = useCallback((evento) => {
        const turno = evento.resource;
        const fechaFormateada = format(new Date(turno.fecha), "EEEE d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es });
        Swal.fire({
            title: `<span class="swal-title-icon">📅</span> Detalles del Turno`,
            html: `<div class="turno-detail-modal">
                <div class="detail-row"><span class="detail-label">📆 Fecha:</span><span class="detail-value">${fechaFormateada}</span></div>
                <div class="detail-row"><span class="detail-label">👤 Paciente:</span><span class="detail-value">${turno.paciente?.nombre || "No asignado"}</span></div>
                <div class="detail-row"><span class="detail-label">👨‍⚕️ Doctor:</span><span class="detail-value">${turno.doctor?.nombre || "No especificado"}</span></div>
                <div class="detail-row"><span class="detail-label">🔬 Estudio:</span><span class="detail-value">${turno.estudio?.tipo || turno.especialidad || "No especificado"}</span></div>
                ${turno.motivoConsulta ? `<div class="detail-row"><span class="detail-label">📝 Motivo:</span><span class="detail-value">${turno.motivoConsulta}</span></div>` : ""}
                <div class="detail-row"><span class="detail-label">Estado:</span><span class="detail-badge estado-${turno.estado}">${turno.estado}</span></div>
            </div>`,
            showCloseButton: true,
            showConfirmButton: false,
            width: "500px",
        });
    }, []);

    const handleNavigate = useCallback((newDate) => setDate(newDate), []);
    const handleViewChange = useCallback((newView) => setView(newView), []);

    const eventStyleGetter = useCallback((event) => {
        const colors = {
            disponible: { bg: "#28a745", border: "#218838" },
            reservado: { bg: "#dc3545", border: "#c82333" },
            cancelado: { bg: "#6c757d", border: "#5a6268" },
            completado: { bg: "#17a2b8", border: "#138496" },
        };
        const { bg, border } = colors[event.estado] || { bg: "#667eea", border: "#5a67d8" };
        return { style: { backgroundColor: bg, borderColor: border, borderRadius: "6px", opacity: 0.9, color: "white", border: `2px solid ${border}` } };
    }, []);

    const stats = useMemo(() => ({
        total: eventos.length,
        disponibles: eventos.filter((e) => e.estado === "disponible").length,
        reservados: eventos.filter((e) => e.estado === "reservado").length,
        cancelados: eventos.filter((e) => e.estado === "cancelado").length,
    }), [eventos]);

    return { eventos, loading, view, date, stats, handleSelectEvent, handleNavigate, handleViewChange, eventStyleGetter };
}
