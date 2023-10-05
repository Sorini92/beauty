import { Calendar as LibCalendar } from "react-calendar";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { useContext } from "react";

import "react-calendar/dist/Calendar.css";
import "./calendar.scss";

function Calendar() {
    const { calendarDate, setDateAndFilter } = useContext(AppointmentContext);

    return (
        <div className="calendar">
            <LibCalendar
                onChange={(value) => setDateAndFilter(value)}
                value={
                    Array.isArray(calendarDate) && calendarDate[0] && calendarDate[1]
                        ? calendarDate
                        : ["", ""]
                }
                selectRange
            />
            <button
                disabled={
                    Array.isArray(calendarDate) && calendarDate[0] && calendarDate[1] ? false : true
                }
                onClick={() => setDateAndFilter([null, null])}
                className="clearFilter"
            >
                Reset filters
            </button>
        </div>
    );
}

export default Calendar;
