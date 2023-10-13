import { Link } from "react-router-dom";
import { memo } from "react";
import { ISpecialist } from "../../shared/interfaces/appointment.interface";

import "./specialistItem.scss";

type SpecialistProps = ISpecialist & {
    openModal?: (state: number) => void;
};

const SpecialistItem = memo(({ id, name, services, phone, openModal }: SpecialistProps) => {
    return (
        <div className="specialist">
            <div className="specialist__info">
                <span className="specialist__name">Name: {name}</span>
                <span className="specialist__services">Services: {services}</span>
                <span className="specialist__phone">Phone: {phone}</span>
            </div>

            <Link to={`${id}`} className="specialist__personal">
                Personal Page
            </Link>

            <button
                className="specialist__cancel"
                onClick={() => (openModal ? openModal(id) : null)}
            >
                Delete
            </button>
        </div>
    );
});

export default SpecialistItem;
