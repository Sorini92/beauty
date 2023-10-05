import AppointmentList from "../../components/appointmentList/AppointmentList";
import Calendar from "../../components/calendar/Calendar";
import CAForm from "../../components/createAppointmentForm/CAForm";
import useAuth from "../../hooks/useAuth";

import "./schedulePage.scss";

function SchedulePage() {
    const { isAuth } = useAuth();

    if (!isAuth) return null;

    return (
        <section className="schedule">
            <div className="schedule__controls">
                <Calendar />
                <CAForm />
            </div>
            <div className="schedule__list">
                <AppointmentList />
            </div>
        </section>
    );
}

export default SchedulePage;
