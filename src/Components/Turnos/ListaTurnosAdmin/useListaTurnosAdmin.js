import { useState, useEffect, useCallback, useMemo } from "react";
import { TurnosApi } from "../../../api/Turnos";
import { PacienteApi } from "../../../api/Paciente";
import { EstudiosApi } from "../../../api/Estudios";
import toast from "react-hot-toast";

const turnosApi = new TurnosApi();
const pacienteApi = new PacienteApi();
const estudiosApi = new EstudiosApi();

export function useListaTurnosAdmin() {
    const [turnos, setTurnos] = useState([]);
    const [doctores, setDoctores] = useState([]);
    const [estudios, setEstudios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalAsignar, setModalAsignar] = useState({ show: false, turno: null });
    const [filtros, setFiltros] = useState({ estado: "", doctorId: "", especialidad: "", estudio: "", fecha: "" });

    useEffect(() => {
        cargarDoctores();
        cargarTurnos();
        cargarEstudios();
    }, []);

    const cargarDoctores = useCallback(async () => {
        try {
            const response = await pacienteApi.getDoctoresList();
            if (response?.doctores) setDoctores(response.doctores);
        } catch (error) { console.error("Error al cargar doctores:", error); }
    }, []);

    const cargarEstudios = useCallback(async () => {
        try {
            const response = await estudiosApi.getEstudios();
            if (response) setEstudios(response);
        } catch (error) { console.error("Error al cargar estudios:", error); }
    }, []);

    const cargarTurnos = useCallback(async (filtrosAplicados = {}) => {
        setLoading(true);
        try {
            const response = await turnosApi.buscarTurnos(filtrosAplicados);
            if (response) setTurnos(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error("Error al cargar turnos:", error);
            toast.error("Error al cargar los turnos");
        } finally { setLoading(false); }
    }, []);

    const handleFiltroChange = useCallback((e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    }, []);

    const aplicarFiltros = useCallback(() => {
        const filtrosLimpios = {};
        Object.keys(filtros).forEach((key) => { if (filtros[key]) filtrosLimpios[key] = filtros[key]; });
        cargarTurnos(filtrosLimpios);
    }, [filtros, cargarTurnos]);

    const limpiarFiltros = useCallback(() => {
        setFiltros({ estado: "", doctorId: "", especialidad: "", estudio: "", fecha: "" });
        cargarTurnos();
    }, [cargarTurnos]);

    const handleCancelar = useCallback(async (turnoId) => {
        if (!window.confirm("¿Está seguro que desea cancelar este turno?")) return;
        try {
            const response = await turnosApi.cancelarTurno(turnoId, "Cancelado por secretaría");
            if (response) { toast.success("Turno cancelado exitosamente"); cargarTurnos(filtros); }
        } catch (error) {
            console.error("Error al cancelar turno:", error);
            toast.error(error.message || "Error al cancelar el turno");
        }
    }, [filtros, cargarTurnos]);

    const handleAsignarTurno = useCallback((turno) => setModalAsignar({ show: true, turno }), []);
    const handleCloseModal = useCallback(() => setModalAsignar({ show: false, turno: null }), []);
    const handleTurnoAsignado = useCallback(() => cargarTurnos(filtros), [filtros, cargarTurnos]);

    const especialidades = useMemo(() => [...new Set(doctores.map((d) => d.especialidad).filter(Boolean))], [doctores]);

    return { turnos, doctores, estudios, loading, modalAsignar, filtros, especialidades, handleFiltroChange, aplicarFiltros, limpiarFiltros, handleCancelar, handleAsignarTurno, handleCloseModal, handleTurnoAsignado };
}
