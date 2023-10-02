import { useContext, useEffect } from "react";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function HistoryList() {
    const { allAppointments, getAppointments, appointmentLoadingStatus } =
        useContext(AppointmentContext);

    useEffect(() => {
        getAppointments();
    }, []);

    if (appointmentLoadingStatus === "loading") {
        return <Spinner />;
    } else if (appointmentLoadingStatus === "error") {
        return (
            <>
                <Error />
                <button className="schedule__reload" onClick={getAppointments}>
                    Try to reload
                </button>
            </>
        );
    }

    return (
        <>
            {allAppointments
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((item) => (
                    <AppointmentItem {...item} key={item.id} />
                ))}
        </>
    );
}

export default HistoryList;
