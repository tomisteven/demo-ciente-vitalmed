import { useState, useEffect, useMemo, useCallback } from "react";
import { TurnosApi } from "../../../api/Turnos";
import { PacienteApi } from "../../../api/Paciente";

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

    useEffect(() => {
        cargarDoctores();
    }, []);

    const cargarDoctores = async () => {
        try {
            const response = await pacienteApi.getDoctoresList();
            if (response?.doctores) {
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
        if (busquedaRealizada) {
            buscarTurnos();
        }
    }, [busquedaRealizada, buscarTurnos]);

    const especialidades = useMemo(() =>
        [...new Set(doctores.map((d) => d.especialidad).filter(Boolean))],
        [doctores]
    );

    const doctoresFiltrados = useMemo(() =>
        filtros.especialidad
            ? doctores.filter((d) => d.especialidad === filtros.especialidad)
            : doctores,
        [doctores, filtros.especialidad]
    );

    return {
        turnos,
        loading,
        busquedaRealizada,
        filtros,
        especialidades,
        doctoresFiltrados,
        handleChange,
        buscarTurnos,
        handleTurnoReservado,
    };
}
