import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import findMostFrequent from "../../utils/findMostFrequent";
import useCustomerService from "../../services/CustomerService";
import avatar from "../../assets/avatar.png";

import { ICustomer, IAppointment } from "../../shared/interfaces/appointment.interface";

import "./customerPersonalPage.scss";

const CustomerPersonalPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { getOneCustomer, getCustomerDataByPhone, editCustomer } = useCustomerService();

    const [customer, setCustomer] = useState<ICustomer>({
        name: "",
        phone: 0,
        age: "",
        email: "",
        id: 0,
    });
    const [favSpecialist, setFavSpecialist] = useState<string | undefined>("Olga");
    const [services, setServices] = useState<string[]>([]);
    const [records, setRecords] = useState<IAppointment[]>([]);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [creationStatus, setCreationStatus] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            getOneCustomer(id).then((res) => {
                setCustomer(res);
            });
        }
    }, [id]);

    useEffect(() => {
        if (customer.phone) {
            getCustomerDataByPhone(customer.phone).then((res) => {
                setRecords(res);
            });
        }

        let setOfServices = new Set(records.map((item) => item.service));
        let allServices = Array.from(setOfServices);
        setServices(allServices);

        let allSpecialists = records.map((item) => item.specialist);
        setFavSpecialist(findMostFrequent(allSpecialists));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customer.phone, records.length]);

    const elements = records.map((item) => {
        return (
            <div className="personal__records-item" key={item.id}>
                <div className="personal__records-service">Service: {item.service}</div>
                <div className="personal__records-wrapper">
                    <div className="personal__records-specialist">
                        Specialist: {item.specialist}
                    </div>
                    <div className="personal__records-date">Date: {item.date}</div>
                </div>
            </div>
        );
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCreationStatus(true);

        editCustomer(customer.phone, customer)
            .then(() => {
                setCreationStatus(false);
                setIsEditable(false);
            })
            .catch(() => {
                alert("Error while creating a new appointment");
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCustomer((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const renderFields = () => {
        if (!isEditable) {
            return (
                <>
                    <div className="personal__information-field">Name: {customer.name}</div>
                    <div className="personal__information-field">Phone: {customer.phone}</div>
                    <div className="personal__information-field">Email: {customer.email}</div>
                    <div className="personal__information-field">Age: {customer.age}</div>
                </>
            );
        } else {
            return (
                <form className="personal__information-form" onSubmit={handleSubmit}>
                    <div>
                        <label className="personal__information-field" htmlFor="name">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="customerName"
                            placeholder="Customer name"
                            required
                            value={customer.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* <div>
                        <label className="personal__information-field" htmlFor="phone">
                            Phone:
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="customerPhone"
                            placeholder="380683357256"
                            pattern="\d{12}"
                            title="Format should be 380683357256"
                            required
                            value={customer.phone}
                            onChange={handleChange}
                        />
                    </div> */}

                    <div className="personal__information-field">Phone: {customer.phone}</div>

                    <div>
                        <label className="personal__information-field" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="customerEmail"
                            placeholder="Email"
                            value={customer.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="personal__information-field" htmlFor="age">
                            Age:
                        </label>
                        <input
                            type="text"
                            name="age"
                            pattern="\d{2}"
                            title="Only numbers from 10"
                            id="customerAge"
                            placeholder="Age"
                            value={customer.age}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="personal__information-confirm" disabled={creationStatus}>
                        Confirm
                    </button>
                </form>
            );
        }
    };

    return (
        <div className="personal">
            <div className="personal__title">Customers personal page</div>
            <div className="personal__wrapper">
                <div className="personal__information">
                    <div className="personal__information-foto">
                        <img src={avatar} alt="avatar" />
                    </div>

                    {/* <div className="personal__information-field">Name: {customer.name}</div>
                    <div className="personal__information-field">Phone: {customer.phone}</div>
                    <div className="personal__information-field">Email: {customer.email}</div>
                    <div className="personal__information-field">Age: {customer.age}</div> */}

                    {renderFields()}

                    <div className="personal__information-field">
                        Services: {services.join(", ")}
                    </div>
                    <div className="personal__information-field">
                        Fav specialist: {favSpecialist}
                    </div>

                    <div className="personal__information-btns">
                        <button
                            className="personal__information-edit"
                            onClick={() => setIsEditable(!isEditable)}
                        >
                            {!isEditable ? "Edit" : "Cancel"}
                        </button>

                        <button className="personal__information-back" onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                </div>
                <div className="personal__records">
                    <div className="personal__records-title">Records</div>

                    <div className="personal__records-items">{elements}</div>
                </div>
            </div>
        </div>
    );
};

export default CustomerPersonalPage;
