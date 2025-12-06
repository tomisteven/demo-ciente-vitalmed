import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { useCalendarioTurnos } from "./useCalendarioTurnos";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarioTurnos.css";

const locales = { es };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1, locale: es }),
    getDay,
    locales,
});

const messages = {
    allDay: "Todo el día", previous: "Anterior", next: "Siguiente", today: "Hoy",
    month: "Mes", week: "Semana", day: "Día", agenda: "Agenda",
    date: "Fecha", time: "Hora", event: "Turno",
    noEventsInRange: "No hay turnos en este rango de fechas",
    showMore: (total) => `+ Ver ${total} más`,
};

const formats = {
    eventTimeRangeFormat: () => "",
    timeGutterFormat: (date) => format(date, "HH:mm", { locale: es }),
    dayHeaderFormat: (date) => format(date, "EEEE d", { locale: es }),
    dayRangeHeaderFormat: ({ start, end }) => `${format(start, "d MMM", { locale: es })} - ${format(end, "d MMM yyyy", { locale: es })}`,
    agendaDateFormat: (date) => format(date, "EEE d MMM", { locale: es }),
    agendaTimeFormat: (date) => format(date, "HH:mm", { locale: es }),
    agendaTimeRangeFormat: ({ start, end }) => `${format(start, "HH:mm", { locale: es })} - ${format(end, "HH:mm", { locale: es })}`,
};

export default function CalendarioTurnos() {
    const { eventos, loading, view, date, stats, handleSelectEvent, handleNavigate, handleViewChange, eventStyleGetter } = useCalendarioTurnos();

    const EventComponent = ({ event }) => (
        <div className="custom-event">
            <span className="event-title">{event.title}</span>
            {view !== "month" && <span className="event-detail">{event.estudio}</span>}
        </div>
    );

    if (loading) return <div className="calendario-loading"><div className="spinner"></div><p>Cargando calendario...</p></div>;

    return (
        <div className="calendario-turnos">
            <div className="calendario-header">
                <h3>📅 Calendario de Turnos</h3>
                <div className="calendario-stats">
                    <span className="stat-item"><span className="stat-number">{stats.total}</span><span className="stat-label">turnos totales</span></span>
                    <span className="stat-item"><span className="stat-number">{stats.disponibles}</span><span className="stat-label">disponibles</span></span>
                    <span className="stat-item"><span className="stat-number">{stats.reservados}</span><span className="stat-label">reservados</span></span>
                </div>
            </div>
            <div className="calendario-container">
                <Calendar localizer={localizer} events={eventos} startAccessor="start" endAccessor="end" style={{ height: 700 }} views={["month", "week", "day", "agenda"]} view={view} date={date} onNavigate={handleNavigate} onView={handleViewChange} onSelectEvent={handleSelectEvent} eventPropGetter={eventStyleGetter} messages={messages} formats={formats} components={{ event: EventComponent }} popup selectable={false} culture="es" />
            </div>
            <div className="calendario-legend">
                <div className="legend-item"><span className="legend-color disponible"></span><span>Disponible</span></div>
                <div className="legend-item"><span className="legend-color reservado"></span><span>Reservado</span></div>
                <div className="legend-item"><span className="legend-color completado"></span><span>Completado</span></div>
                <div className="legend-item"><span className="legend-color cancelado"></span><span>Cancelado</span></div>
            </div>
        </div>
    );
}
