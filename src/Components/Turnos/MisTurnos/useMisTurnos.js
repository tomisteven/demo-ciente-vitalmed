import { useState, useEffect, useCallback } from "react";
import { TurnosApi } from "../../../api/Turnos";
import {
    separarTurnosPorFecha,
    ordenarTurnosPorFecha,
} from "../../../utils/turnoHelpers";
import toast from "react-hot-toast";

const turnosApi = new TurnosApi();

export function useMisTurnos(pacienteId) {
    const [turnos, setTurnos] = useState({ proximos: [], pasados: [] });
    const [loading, setLoading] = useState(true);
    const [tabActiva, setTabActiva] = useState("proximos");

    useEffect(() => {
        if (pacienteId) {
            cargarTurnos();
        }
    }, [pacienteId]);

    const cargarTurnos = useCallback(async () => {
        setLoading(true);
        try {
            const response = await turnosApi.obtenerMisTurnos(pacienteId);

            if (response) {
                const turnosArray = Array.isArray(response) ? response : [];
                const { proximos, pasados } = separarTurnosPorFecha(turnosArray);

                setTurnos({
                    proximos: ordenarTurnosPorFecha(proximos),
                    pasados: ordenarTurnosPorFecha(pasados),
                });
            }
        } catch (error) {
            console.error("Error al cargar turnos:", error);
            toast.error("Error al cargar sus turnos");
        } finally {
            setLoading(false);
        }
    }, [pacienteId]);

    const handleCancelar = useCallback(async (turnoId) => {
        const confirmar = window.confirm(
            "¿Está seguro que desea cancelar este turno?"
        );

        if (!confirmar) return;

        try {
            const response = await turnosApi.cancelarTurno(
                turnoId,
                "Cancelado por el paciente"
            );

            if (response) {
                toast.success("Turno cancelado exitosamente");
                cargarTurnos();
            }
        } catch (error) {
            console.error("Error al cancelar turno:", error);
            toast.error(error.message || "Error al cancelar el turno");
        }
    }, [cargarTurnos]);

    return {
        turnos,
        loading,
        tabActiva,
        setTabActiva,
        handleCancelar,
    };
}
