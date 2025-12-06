import { useState, useEffect, useCallback, useMemo } from "react";
import { PacienteApi } from "../../../../api/Paciente";
import { TurnosApi } from "../../../../api/Turnos";
import { EstudiosApi } from "../../../../api/Estudios";
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
    const [formData, setFormData] = useState({
        pacienteId: "",
        estudioId: "",
        motivoConsulta: "",
    });

    useEffect(() => {
        cargarPacientes();
        cargarEstudios();
    }, []);

    const cargarPacientes = useCallback(async () => {
        setLoadingPacientes(true);
        try {
            let response = await pacienteApi.getPacientesShort();

            if (!response || (Array.isArray(response) && response.length === 0) ||
                (response.pacientes && response.pacientes.length === 0)) {
                response = await pacienteApi.getPacientes();
            }

            let listaPacientes = [];
            if (Array.isArray(response)) {
                listaPacientes = response;
            } else if (response?.pacientes && Array.isArray(response.pacientes)) {
                listaPacientes = response.pacientes;
            }

            if (listaPacientes.length > 0) {
                const pacientesOrdenados = listaPacientes.sort((a, b) => {
                    const nombreA = a.nombre?.toLowerCase() || "";
                    const nombreB = b.nombre?.toLowerCase() || "";
                    return nombreA.localeCompare(nombreB);
                });
                setPacientes(pacientesOrdenados);
            } else {
                toast.error("No hay pacientes registrados en el sistema");
                setPacientes([]);
            }
        } catch (error) {
            console.error("Error al cargar pacientes:", error);
            toast.error("Error al cargar la lista de pacientes");
            setPacientes([]);
        } finally {
            setLoadingPacientes(false);
        }
    }, []);

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
            setEstudios([]);
        } finally {
            setLoadingEstudios(false);
        }
    }, []);

    const pacientesFiltrados = useMemo(() => {
        if (!busqueda.trim()) {
            return pacientes;
        }
        const busquedaLower = busqueda.toLowerCase();
        return pacientes.filter((paciente) => {
            const nombre = paciente.nombre?.toLowerCase() || "";
            const dni = paciente.dni?.toString() || "";
            const email = paciente.email?.toLowerCase() || "";
            return (
                nombre.includes(busquedaLower) ||
                dni.includes(busquedaLower) ||
                email.includes(busquedaLower)
            );
        });
    }, [pacientes, busqueda]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const pacienteSeleccionado = useMemo(() =>
        pacientes.find((p) => p._id === formData.pacienteId),
        [pacientes, formData.pacienteId]
    );

    const estudioSeleccionado = useMemo(() =>
        estudios.find((e) => e._id === formData.estudioId),
        [estudios, formData.estudioId]
    );

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!formData.pacienteId) {
            toast.error("Debe seleccionar un paciente");
            return;
        }

        // Verificar si el estudio tiene aclaraciones
        if (estudioSeleccionado?.aclaraciones) {
            const result = await Swal.fire({
                title: "⚠️ Aclaraciones del Estudio",
                html: `
                    <div style="text-align: left; padding: 10px;">
                        <p style="margin-bottom: 10px;"><strong>Estudio:</strong> ${estudioSeleccionado.tipo}</p>
                        <div style="background: #fff8e1; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                            <p style="margin: 0; color: #5d4037;"><strong>Aclaraciones importantes:</strong></p>
                            <p style="margin: 10px 0 0 0; color: #666;">${estudioSeleccionado.aclaraciones}</p>
                        </div>
                        <p style="margin-top: 15px; color: #888; font-size: 0.9rem;">¿Desea continuar con la asignación del turno?</p>
                    </div>
                `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#28a745",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Sí, asignar turno",
                cancelButtonText: "Cancelar",
            });

            if (!result.isConfirmed) {
                return;
            }
        }

        setLoading(true);

        try {
            const response = await turnosApi.reservarTurno(
                turno._id,
                formData.pacienteId,
                formData.motivoConsulta,
                formData.estudioId
            );

            if (response) {
                toast.success("✓ Turno asignado exitosamente al paciente");
                onAsignado();
                onClose();
            }
        } catch (error) {
            console.error("Error al asignar turno:", error);
            toast.error(error.message || "Error al asignar el turno");
        } finally {
            setLoading(false);
        }
    }, [turno._id, formData, estudioSeleccionado, onAsignado, onClose]);

    return {
        // Estados
        pacientes,
        estudios,
        loading,
        loadingPacientes,
        loadingEstudios,
        busqueda,
        formData,
        // Datos computados
        pacientesFiltrados,
        pacienteSeleccionado,
        estudioSeleccionado,
        // Setters
        setBusqueda,
        // Acciones
        handleChange,
        handleSubmit,
    };
}
