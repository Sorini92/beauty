import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Optional } from "utility-types";

import "./appointmentItem.scss";

import { IAppointment } from "../../shared/interfaces/appointment.interface";

//type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
type AppointmentProps = Optional<IAppointment, "canceled"> & {
    openModal: (state: boolean) => void;
    selectId: () => void;
};

function AppointmentItem({
    id,
    name,
    date,
    service,
    phone,
    canceled,
    openModal,
    selectId,
}: AppointmentProps) {
    const [timeLeft, changeTimeLeft] = useState<string | null>(null);

    useEffect(() => {
        let hoursLeft = dayjs(date).diff(undefined, "h");
        let minutesLeft = dayjs(date).diff(undefined, "m") % 60;

        changeTimeLeft(`${hoursLeft}:${minutesLeft}`);

        const intervalId = setInterval(() => {
            changeTimeLeft(`${hoursLeft}:${minutesLeft}`);
        }, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, [date]);

    const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm");

    return (
        <div className="appointment">
            <div className="appointment__info">
                <span className="appointment__date">Date: {formattedDate}</span>
                <span className="appointment__name">Name: {name}</span>
                <span className="appointment__service">Service: {service}</span>
                <span className="appointment__phone">Phone: {phone}</span>
            </div>
            {!canceled ? (
                <>
                    <div className="appointment__time">
                        <span>Time left:</span>
                        <span className="appointment__timer">{timeLeft}</span>
                    </div>
                    <button
                        className="appointment__cancel"
                        onClick={() => {
                            openModal(true);
                            selectId();
                        }}
                    >
                        Cancel
                    </button>
                </>
            ) : null}
            {canceled ? <div className="appointment__canceled">Canceled</div> : null}
        </div>
    );
}

export default AppointmentItem;
