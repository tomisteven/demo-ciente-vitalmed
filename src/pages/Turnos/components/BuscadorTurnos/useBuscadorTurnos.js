import { useState, useEffect, useMemo, useCallback } from "react";
import { TurnosApi } from "../../../../api/Turnos";
import { PacienteApi } from "../../../../api/Paciente";

const turnosApi = new TurnosApi();
const pacienteApi = new PacienteApi();

export function useBuscadorTurnos() {
    const [doctores, setDoctores] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [filtros, setFiltros] = useState({
        especialidad: "",
        doctorId: "",
        fecha: "",
    });

    // Cargar doctores al montar
    useEffect(() => {
        cargarDoctores();
    }, []);

    const cargarDoctores = async () => {
        try {
            const response = await pacienteApi.getDoctoresList();
            if (response && response.doctores) {
                setDoctores(response.doctores);
            }
        } catch (error) {
            console.error("Error al cargar doctores:", error);
        }
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({
            ...prev,
            [name]: value,
            // Si cambia la especialidad, resetear el doctor
            ...(name === "especialidad" && { doctorId: "" }),
        }));
    }, []);

    const buscarTurnos = useCallback(async (e) => {
        e?.preventDefault?.();
        setLoading(true);
        setBusquedaRealizada(true);

        try {
            const filtrosAPI = {
                estado: "disponible",
                ...filtros,
            };

            const response = await turnosApi.buscarTurnos(filtrosAPI);
            setTurnos(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error("Error al buscar turnos:", error);
            setTurnos([]);
        } finally {
            setLoading(false);
        }
    }, [filtros]);

    const handleTurnoReservado = useCallback(() => {
        // Recargar turnos después de reservar
        if (busquedaRealizada) {
            buscarTurnos();
        }
    }, [busquedaRealizada, buscarTurnos]);

    // Obtener especialidades únicas
    const especialidades = useMemo(() =>
        [...new Set(doctores.map((d) => d.especialidad).filter(Boolean))],
        [doctores]
    );

    // Filtrar doctores por especialidad seleccionada
    const doctoresFiltrados = useMemo(() =>
        filtros.especialidad
            ? doctores.filter((d) => d.especialidad === filtros.especialidad)
            : doctores,
        [doctores, filtros.especialidad]
    );

    return {
        // Estados
        doctores,
        turnos,
        loading,
        busquedaRealizada,
        filtros,
        // Datos computados
        especialidades,
        doctoresFiltrados,
        // Acciones
        handleChange,
        buscarTurnos,
        handleTurnoReservado,
    };
}
