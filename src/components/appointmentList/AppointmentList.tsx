import { useContext, useEffect, useState, useCallback } from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";

import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import "./appointmentList.scss";

function AppointmentList() {
    const {
        activeAppointments,
        getActiveAppointments,
        appointmentLoadingStatus,
        calendarDate,
        setDateAndFilter,
    } = useContext(AppointmentContext);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, selectId] = useState(0);

    useEffect(() => {
        setDateAndFilter([null, null]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getActiveAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarDate]);

    const handleOpenModal = useCallback((id: number) => {
        setIsOpen(true);
        selectId(id);
    }, []);

    if (appointmentLoadingStatus === "loading") {
        return <Spinner />;
    } else if (appointmentLoadingStatus === "error") {
        return (
            <>
                <Error />
                <button className="schedule__reload" onClick={getActiveAppointments}>
                    Try to reload
                </button>
            </>
        );
    }

    return (
        <>
            {activeAppointments.length > 0 ? (
                activeAppointments.map((item) => {
                    return (
                        <AppointmentItem
                            {...item}
                            key={item.id}
                            openModal={handleOpenModal}
                            getActiveAppointments={getActiveAppointments}
                        />
                    );
                })
            ) : (
                <div className="empty">No appointment in this time range</div>
            )}
            <CancelModal handleClose={setIsOpen} selectedId={selectedId} isOpen={isOpen} />
        </>
    );
}

export default AppointmentList;
