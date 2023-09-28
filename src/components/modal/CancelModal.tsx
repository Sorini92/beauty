import Portal from "../portal/portal";
import { useRef, useEffect, useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import "./modal.scss";
import useAppointmentService from "../../services/AppointmentService";

interface IModalProps {
    handleClose: (state: boolean) => void;
    selectedId: number;
    isOpen: boolean;
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
    const { getActiveAppointments } = useContext(AppointmentContext);

    const { cancelOneAppointment } = useAppointmentService();

    const [btnDisabled, setBtnDisbled] = useState<boolean>(false);
    const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

    const nodeRef = useRef<HTMLDivElement>(null);
    const cancelStatusRef = useRef<boolean | null>(null);

    const handleCancelAppointment = (id: number) => {
        setBtnDisbled(true);

        cancelOneAppointment(id)
            .then(() => {
                setCancelStatus(true);
            })
            .catch(() => {
                setCancelStatus(false);
                setBtnDisbled(false);
            });
    };

    const closeModal = () => {
        handleClose(false);
        if (cancelStatus || cancelStatusRef.current) {
            getActiveAppointments();
        }
    };

    useEffect(() => {
        cancelStatusRef.current = cancelStatus;
    }, [cancelStatus]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleClose]);

    return (
        <Portal>
            <CSSTransition
                in={isOpen}
                timeout={{ enter: 500, exit: 500 }}
                unmountOnExit
                classNames={"modal"}
                nodeRef={nodeRef}
            >
                <div className="modal" ref={nodeRef}>
                    <div className="modal__body">
                        <span className="modal__title">
                            Are you sure you want to delete the appointment? #{selectedId}
                        </span>
                        <div className="modal__btns">
                            <button
                                className="modal__ok"
                                disabled={btnDisabled}
                                onClick={() => handleCancelAppointment(selectedId)}
                            >
                                Ok
                            </button>
                            <button className="modal__close" onClick={() => closeModal()}>
                                Close
                            </button>
                        </div>
                        <div className="modal__status">
                            {cancelStatus === null
                                ? ""
                                : cancelStatus
                                ? "Success"
                                : "Error, please try again"}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    );
}

export default CancelModal;
