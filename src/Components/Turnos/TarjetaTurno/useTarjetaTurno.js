import { useState, useCallback, useMemo } from "react";
import { TurnosApi } from "../../../api/Turnos";
import { EstudiosApi } from "../../../api/Estudios";
import toast from "react-hot-toast";

const turnosApi = new TurnosApi();
const estudiosApi = new EstudiosApi();

export function useTarjetaTurno(turno, onReservado) {
    const [showModal, setShowModal] = useState(false);
    const [motivoConsulta, setMotivoConsulta] = useState("");
    const [estudioId, setEstudioId] = useState("");
    const [estudios, setEstudios] = useState([]);
    const [loadingEstudios, setLoadingEstudios] = useState(false);
    const [loading, setLoading] = useState(false);

    const cargarEstudios = useCallback(async () => {
        setLoadingEstudios(true);
        try {
            const response = await estudiosApi.getEstudios(true);
            const listaEstudios = Array.isArray(response)
                ? response
                : response.estudios || [];
            setEstudios(listaEstudios.filter(e => e.activo));
        } catch (error) {
            console.error("Error al cargar estudios:", error);
            toast.error("Error al cargar los estudios disponibles");
        } finally {
            setLoadingEstudios(false);
        }
    }, []);

    const handleReservar = useCallback(() => {
        setShowModal(true);
        cargarEstudios();
    }, [cargarEstudios]);

    const handleCancelar = useCallback(() => {
        setShowModal(false);
        setMotivoConsulta("");
        setEstudioId("");
    }, []);

    const handleConfirmar = useCallback(async () => {
        if (!motivoConsulta.trim()) {
            toast.error("Debe ingresar el motivo de consulta");
            return;
        }
        if (!estudioId) {
            toast.error("Debe seleccionar un estudio");
            return;
        }

        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("userLog"));
            if (!user?.usuario?._id) {
                toast.error("Debe iniciar sesión para reservar un turno");
                setLoading(false);
                return;
            }

            const response = await turnosApi.reservarTurno(
                turno._id,
                user.usuario._id,
                motivoConsulta,
                estudioId
            );

            if (response) {
                toast.success("✓ Turno reservado exitosamente. Se envió un email de confirmación.");
                setShowModal(false);
                setMotivoConsulta("");
                setEstudioId("");
                onReservado?.();
            }
        } catch (error) {
            console.error("Error al reservar turno:", error);
            toast.error(error.message || "Error al reservar el turno");
        } finally {
            setLoading(false);
        }
    }, [turno._id, motivoConsulta, estudioId, onReservado]);

    const estudioAsignado = useMemo(() => {
        if (turno.estudio) return turno.estudio.tipo || turno.estudio;
        if (turno.estudioId?.tipo) return turno.estudioId.tipo;
        return null;
    }, [turno.estudio, turno.estudioId]);

    return {
        showModal,
        motivoConsulta,
        estudioId,
        estudios,
        loadingEstudios,
        loading,
        estudioAsignado,
        setMotivoConsulta,
        setEstudioId,
        handleReservar,
        handleCancelar,
        handleConfirmar,
    };
}
