import Portal from "../portal/portal";
import { useRef, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./modal.scss";

interface IModalProps {
    handleClose: (state: boolean) => void;
    getList: () => void;
    cencelFunc: (id: number) => Promise<void>;
    selectedId: number;
    isOpen: boolean;
    title: string;
}

function CancelModal({ handleClose, selectedId, isOpen, title, getList, cencelFunc }: IModalProps) {
    const [btnDisabled, setBtnDisbled] = useState<boolean>(false);
    const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

    const nodeRef = useRef<HTMLDivElement>(null);
    const cancelStatusRef = useRef<boolean | null>(null);

    const handleCancel = (id: number) => {
        setBtnDisbled(true);

        cencelFunc(id)
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
            getList();
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
                            {title} #{selectedId}
                        </span>
                        <div className="modal__btns">
                            <button
                                className="modal__ok"
                                disabled={btnDisabled}
                                onClick={() => handleCancel(selectedId)}
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
