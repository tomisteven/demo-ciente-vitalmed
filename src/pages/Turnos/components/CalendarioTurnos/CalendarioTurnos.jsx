import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { useCalendarioTurnos } from "./useCalendarioTurnos";
import { FaCalendarCheck, FaCalendarDay, FaCalendarTimes, FaCalendarAlt } from "react-icons/fa";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarioTurnos.css";

// Configurar localizador con date-fns en español
const locales = { es };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1, locale: es }),
    getDay,
    locales,
});

// Mensajes en español
const messages = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Turno",
    noEventsInRange: "No hay turnos en este rango de fechas",
    showMore: (total) => `+ Ver ${total} más`,
};

// Formato personalizado para eventos
const formats = {
    eventTimeRangeFormat: () => "",
    timeGutterFormat: (date) => format(date, "HH:mm", { locale: es }),
    dayHeaderFormat: (date) => format(date, "EEEE d", { locale: es }),
    dayRangeHeaderFormat: ({ start, end }) =>
        `${format(start, "d MMM", { locale: es })} - ${format(end, "d MMM yyyy", { locale: es })}`,
    agendaDateFormat: (date) => format(date, "EEE d MMM", { locale: es }),
    agendaTimeFormat: (date) => format(date, "HH:mm", { locale: es }),
    agendaTimeRangeFormat: ({ start, end }) =>
        `${format(start, "HH:mm", { locale: es })} - ${format(end, "HH:mm", { locale: es })}`,
};

export default function CalendarioTurnos() {
    const {
        eventos,
        loading,
        view,
        date,
        stats,
        handleSelectEvent,
        handleNavigate,
        handleViewChange,
        eventStyleGetter,
    } = useCalendarioTurnos();

    // Componente personalizado para mostrar eventos
    const EventComponent = ({ event }) => (
        <div className="cal-custom-event">
            <span className="cal-event-title">{event.title}</span>
            {view !== "month" && (
                <span className="cal-event-detail">{event.estudio}</span>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="cal-loading">
                <div className="cal-spinner"></div>
                <p>Preparando su agenda...</p>
            </div>
        );
    }

    return (
        <div className="cal-view-wrapper">
            <header className="cal-header-section">
                <div className="cal-stats-grid">
                    <div className="cal-stat-card total">
                        <div className="cal-stat-icon"><FaCalendarAlt /></div>
                        <div className="cal-stat-info">
                            <span className="cal-stat-val">{stats.total}</span>
                            <span className="cal-stat-lbl">Totales</span>
                        </div>
                    </div>
                    <div className="cal-stat-card success">
                        <div className="cal-stat-icon"><FaCalendarCheck /></div>
                        <div className="cal-stat-info">
                            <span className="cal-stat-val">{stats.disponibles}</span>
                            <span className="cal-stat-lbl">Disponibles</span>
                        </div>
                    </div>
                    <div className="cal-stat-card warning">
                        <div className="cal-stat-icon"><FaCalendarDay /></div>
                        <div className="cal-stat-info">
                            <span className="cal-stat-val">{stats.reservados}</span>
                            <span className="cal-stat-lbl">Reservados</span>
                        </div>
                    </div>
                    <div className="cal-stat-card danger">
                        <div className="cal-stat-icon"><FaCalendarTimes /></div>
                        <div className="cal-stat-info">
                            <span className="cal-stat-val">{stats.cancelados}</span>
                            <span className="cal-stat-lbl">Cancelados</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="cal-main-container">
                <Calendar
                    localizer={localizer}
                    events={eventos}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '70vh', minHeight: '600px' }}
                    views={["month", "week", "day", "agenda"]}
                    view={view}
                    date={date}
                    onNavigate={handleNavigate}
                    onView={handleViewChange}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={eventStyleGetter}
                    messages={messages}
                    formats={formats}
                    components={{
                        event: EventComponent,
                    }}
                    popup
                    selectable={false}
                    culture="es"
                />
            </div>

            <footer className="cal-legend-bar">
                <div className="cal-leg-item">
                    <span className="cal-leg-dot disponible"></span>
                    <span>Disponible</span>
                </div>
                <div className="cal-leg-item">
                    <span className="cal-leg-dot reservado"></span>
                    <span>Reservado</span>
                </div>
                <div className="cal-leg-item">
                    <span className="cal-leg-dot completado"></span>
                    <span>Completado</span>
                </div>
                <div className="cal-leg-item">
                    <span className="cal-leg-dot cancelado"></span>
                    <span>Cancelado</span>
                </div>
            </footer>
        </div>
    );
}
