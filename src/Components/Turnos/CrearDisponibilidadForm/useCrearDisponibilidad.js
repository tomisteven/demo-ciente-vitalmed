import { useState, useEffect, useCallback } from "react";
import { TurnosApi } from "../../../api/Turnos";
import { PacienteApi } from "../../../api/Paciente";
import { EstudiosApi } from "../../../api/Estudios";
import { generarHorarios, obtenerFechaHoy } from "../../../utils/dateHelpers";
import toast from "react-hot-toast";

const turnosApi = new TurnosApi();
const pacienteApi = new PacienteApi();
const estudiosApi = new EstudiosApi();

export function useCrearDisponibilidad() {
    const [doctores, setDoctores] = useState([]);
    const [estudios, setEstudios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingEstudios, setLoadingEstudios] = useState(true);
    const [formData, setFormData] = useState({
        doctorId: "",
        fecha: obtenerFechaHoy(),
        horaInicio: "09:00",
        horaFin: "17:00",
        intervalo: 30,
        estudiosIds: [],
    });

    useEffect(() => {
        cargarDoctores();
        cargarEstudios();
    }, []);

    const cargarDoctores = useCallback(async () => {
        try {
            const response = await pacienteApi.getDoctoresList();
            if (response?.doctores) setDoctores(response.doctores);
        } catch (error) {
            console.error("Error al cargar doctores:", error);
            toast.error("Error al cargar la lista de doctores");
        }
    }, []);

    const cargarEstudios = useCallback(async () => {
        setLoadingEstudios(true);
        try {
            const response = await estudiosApi.getEstudios(true);
            const listaEstudios = Array.isArray(response) ? response : response.estudios || [];
            setEstudios(listaEstudios.filter(e => e.activo));
        } catch (error) {
            console.error("Error al cargar estudios:", error);
            toast.error("Error al cargar los estudios");
        } finally {
            setLoadingEstudios(false);
        }
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleEstudioChange = useCallback((estudioId) => {
        setFormData(prev => ({
            ...prev,
            estudiosIds: prev.estudiosIds.includes(estudioId)
                ? prev.estudiosIds.filter(id => id !== estudioId)
                : [...prev.estudiosIds, estudioId]
        }));
    }, []);

    const validarFormulario = useCallback(() => {
        if (!formData.doctorId) { toast.error("Debe seleccionar un doctor"); return false; }
        const fechaSel = new Date(formData.fecha);
        const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
        if (fechaSel < hoy) { toast.error("La fecha debe ser futura"); return false; }
        const [hi, mi] = formData.horaInicio.split(":").map(Number);
        const [hf, mf] = formData.horaFin.split(":").map(Number);
        if ((hf * 60 + mf) <= (hi * 60 + mi)) { toast.error("La hora de fin debe ser mayor a la hora de inicio"); return false; }
        return true;
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        setLoading(true);
        try {
            const horarios = generarHorarios(formData.fecha, formData.horaInicio, formData.horaFin, parseInt(formData.intervalo));
            if (horarios.length === 0) { toast.error("No se generaron horarios."); setLoading(false); return; }
            const response = await turnosApi.crearDisponibilidad(formData.doctorId, horarios, formData.estudiosIds);
            if (response?.turnos) {
                toast.success(`✓ Se crearon ${response.turnos.length} turnos exitosamente`);
                setFormData(prev => ({ ...prev, fecha: obtenerFechaHoy(), horaInicio: "09:00", horaFin: "17:00", estudiosIds: [] }));
            }
        } catch (error) {
            console.error("Error al crear disponibilidad:", error);
            toast.error(error.message || "Error al crear disponibilidad");
        } finally {
            setLoading(false);
        }
    }, [formData, validarFormulario]);

    const seleccionarTodosEstudios = useCallback(() => setFormData(prev => ({ ...prev, estudiosIds: estudios.map(e => e._id) })), [estudios]);
    const deseleccionarTodosEstudios = useCallback(() => setFormData(prev => ({ ...prev, estudiosIds: [] })), []);

    return { doctores, estudios, loading, loadingEstudios, formData, handleChange, handleEstudioChange, handleSubmit, seleccionarTodosEstudios, deseleccionarTodosEstudios };
}
