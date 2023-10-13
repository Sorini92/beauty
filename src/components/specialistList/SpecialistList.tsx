import { useContext, useEffect, useState, useCallback } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";
import SpecialistItem from "../specialistItem.tsx/CustomerItem";
import useSpecialistService from "../../services/SpecialistService";
import { SpecialistContext } from "../../context/specialists/specialistsContext";

import "./specialistList.scss";

function SpecialistList() {
    const { specialists, getAllSpecialists, specialistsLoadingStatus } =
        useContext(SpecialistContext);
    const { cancelOneSpecialist } = useSpecialistService();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, selectId] = useState(0);

    useEffect(() => {
        getAllSpecialists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenModal = useCallback((id: number) => {
        setIsOpen(true);
        selectId(id);
    }, []);

    if (specialistsLoadingStatus === "loading") {
        return <Spinner />;
    } else if (specialistsLoadingStatus === "error") {
        return (
            <>
                <Error />
                <button className="schedule__reload" onClick={getAllSpecialists}>
                    Try to reload
                </button>
            </>
        );
    }

    return (
        <>
            {specialists.length > 0 ? (
                specialists.map((item) => {
                    return <SpecialistItem {...item} key={item.id} openModal={handleOpenModal} />;
                })
            ) : (
                <div className="empty">No specialists yet</div>
            )}
            <CancelModal
                title={"Are you sure you want to delete the specialist?"}
                handleClose={setIsOpen}
                selectedId={selectedId}
                isOpen={isOpen}
                getList={getAllSpecialists}
                cencelFunc={cancelOneSpecialist}
            />
        </>
    );
}

export default SpecialistList;
