import { useState, useEffect, useCallback, useMemo } from "react";
import { PacienteApi } from "../../../api/Paciente";
import { TurnosApi } from "../../../api/Turnos";
import { EstudiosApi } from "../../../api/Estudios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const pacienteApi = new PacienteApi();
const turnosApi = new TurnosApi();
const estudiosApi = new EstudiosApi();

export function useModalAsignarTurno(turno, onClose, onAsignado) {
    const [pacientes, setPacientes] = useState([]);
    const [estudios, setEstudios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingPacientes, setLoadingPacientes] = useState(true);
    const [loadingEstudios, setLoadingEstudios] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [formData, setFormData] = useState({ pacienteId: "", estudioId: "", motivoConsulta: "" });

    useEffect(() => {
        cargarPacientes();
        cargarEstudios();
    }, []);

    const cargarPacientes = useCallback(async () => {
        setLoadingPacientes(true);
        try {
            let response = await pacienteApi.getPacientesShort();
            if (!response || (Array.isArray(response) && response.length === 0)) response = await pacienteApi.getPacientes();
            let listaPacientes = Array.isArray(response) ? response : response?.pacientes || [];
            setPacientes(listaPacientes.sort((a, b) => (a.nombre?.toLowerCase() || "").localeCompare(b.nombre?.toLowerCase() || "")));
        } catch (error) {
            console.error("Error al cargar pacientes:", error);
            toast.error("Error al cargar la lista de pacientes");
            setPacientes([]);
        } finally { setLoadingPacientes(false); }
    }, []);

    const cargarEstudios = useCallback(async () => {
        setLoadingEstudios(true);
        try {
            const response = await estudiosApi.getEstudios(true);
            const listaEstudios = Array.isArray(response) ? response : response.estudios || [];
            setEstudios(listaEstudios.filter(e => e.activo));
        } catch (error) {
            console.error("Error al cargar estudios:", error);
            toast.error("Error al cargar los estudios disponibles");
            setEstudios([]);
        } finally { setLoadingEstudios(false); }
    }, []);

    const pacientesFiltrados = useMemo(() => {
        if (!busqueda.trim()) return pacientes;
        const b = busqueda.toLowerCase();
        return pacientes.filter((p) => (p.nombre?.toLowerCase() || "").includes(b) || (p.dni?.toString() || "").includes(b) || (p.email?.toLowerCase() || "").includes(b));
    }, [pacientes, busqueda]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const pacienteSeleccionado = useMemo(() => pacientes.find((p) => p._id === formData.pacienteId), [pacientes, formData.pacienteId]);
    const estudioSeleccionado = useMemo(() => estudios.find((e) => e._id === formData.estudioId), [estudios, formData.estudioId]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!formData.pacienteId) { toast.error("Debe seleccionar un paciente"); return; }
        if (estudioSeleccionado?.aclaraciones) {
            const result = await Swal.fire({ title: "⚠️ Aclaraciones del Estudio", html: `<p>${estudioSeleccionado.aclaraciones}</p>`, icon: "warning", showCancelButton: true, confirmButtonText: "Sí, asignar turno", cancelButtonText: "Cancelar" });
            if (!result.isConfirmed) return;
        }
        setLoading(true);
        try {
            const response = await turnosApi.reservarTurno(turno._id, formData.pacienteId, formData.motivoConsulta, formData.estudioId);
            if (response) { toast.success("✓ Turno asignado exitosamente al paciente"); onAsignado(); onClose(); }
        } catch (error) {
            console.error("Error al asignar turno:", error);
            toast.error(error.message || "Error al asignar el turno");
        } finally { setLoading(false); }
    }, [turno._id, formData, estudioSeleccionado, onAsignado, onClose]);

    return { pacientes, estudios, loading, loadingPacientes, loadingEstudios, busqueda, formData, pacientesFiltrados, pacienteSeleccionado, estudioSeleccionado, setBusqueda, handleChange, handleSubmit };
}
