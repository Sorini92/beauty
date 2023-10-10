import { Link } from "react-router-dom";
import { memo } from "react";
import { ICustomer } from "../../shared/interfaces/appointment.interface";

import "./customerItem.scss";

type CustomerProps = ICustomer & {
    openModal?: (state: number) => void;
};

const CustomerItem = memo(({ id, name, age, phone, email, openModal }: CustomerProps) => {
    return (
        <div className="customer">
            <div className="customer__info">
                <span className="customer__name">Name: {name}</span>
                <span className="customer__phone">Phone: {phone}</span>
                <span className="customer__email">Email: {email}</span>
                <span className="customer__age">Age: {age}</span>
            </div>

            <Link to={`${phone}`} className="customer__personal">
                Personal Page
            </Link>

            <button className="customer__cancel" onClick={() => (openModal ? openModal(id) : null)}>
                Delete
            </button>
        </div>
    );
});

export default CustomerItem;
