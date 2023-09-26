import { useContext, useEffect, useState } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";

import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
    const { activeAppointments, getActiveAppointments, appointmentLoadingStatus } =
        useContext(AppointmentContext);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, selectId] = useState(0);

    useEffect(() => {
        getActiveAppointments();
    }, []);

    const elements = activeAppointments.map((item) => {
        return (
            <AppointmentItem
                {...item}
                key={item.id}
                openModal={setIsOpen}
                selectId={() => selectId(item.id)}
            />
        );
    });

    if (appointmentLoadingStatus === "loading") {
        return <Spinner />;
    } else if (appointmentLoadingStatus === "error") {
        return (
            <>
                <Error />
                <button onClick={getActiveAppointments} className="schedule__reload">
                    Try to reload
                </button>
            </>
        );
    }

    return (
        <>
            {elements}
            {isOpen ? <CancelModal handleClose={setIsOpen} selectedId={selectedId} /> : null}
        </>
    );
}

export default AppointmentList;
