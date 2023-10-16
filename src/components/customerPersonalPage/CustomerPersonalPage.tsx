import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import findMostFrequent from "../../utils/findMostFrequent";
import useCustomerService from "../../services/CustomerService";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import Spinner from "../spinner/Spinner";

import { ICustomer, IAppointment } from "../../shared/interfaces/appointment.interface";

import "./customerPersonalPage.scss";

const CustomerPersonalPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    const {
        getOneCustomer,
        getCustomerDataByPhone,
        editCustomer,
        synchronizeCustomerAndAppointments,
        uploadImage,
    } = useCustomerService();

    const [customer, setCustomer] = useState<ICustomer>({
        name: "",
        phone: 0,
        age: "",
        email: "",
        id: 0,
        avatar: "",
    });
    const [modifiedCustomer, setModifiedCustomer] = useState<ICustomer>({
        name: "",
        phone: 0,
        age: "",
        email: "",
        id: 0,
        avatar: "",
    });
    const [favSpecialist, setFavSpecialist] = useState<string | undefined>("Olga");
    const [services, setServices] = useState<string[]>([]);
    const [records, setRecords] = useState<IAppointment[]>([]);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [creationStatus, setCreationStatus] = useState<boolean>(false);
    const [isRecordsLoaded, setIsRecordsLoaded] = useState<boolean>(false);

    const [file, setFile] = useState<any>({ file: "", imagePreviewUrl: "" });

    useEffect(() => {
        if (id) {
            getOneCustomer(id).then((res) => {
                setCustomer(res);
                setModifiedCustomer(res);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (customer.phone) {
            getCustomerDataByPhone(customer.phone).then((res) => {
                setIsRecordsLoaded(true);
                setRecords(res);
            });
        }

        let allServices = Array.from(new Set(records.map((item) => item.service)));
        setServices(allServices);

        let allSpecialists = records.map((item) => item.specialist);
        setFavSpecialist(findMostFrequent(allSpecialists));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customer.phone, records.length]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreationStatus(true);

        if (file.file !== "" && file.imagePreviewUrl !== "") {
            let formData = new FormData();

            formData.append("file", file.file, `${customer.phone}.${file.file.name.split(".")[1]}`);

            uploadImage(formData);
        }

        editCustomer(modifiedCustomer.phone, modifiedCustomer)
            .then(() => {
                setCreationStatus(false);
                setIsEditable(false);
                synchronizeCustomerAndAppointments(modifiedCustomer.phone, modifiedCustomer);
                setCustomer(modifiedCustomer);
            })
            .catch((e) => {
                throw new Error(e);
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setModifiedCustomer((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeFoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            let reader = new FileReader();

            reader.onloadend = () => {
                setFile({ file: file, imagePreviewUrl: reader.result });
            };
            reader.readAsDataURL(file);

            setModifiedCustomer((prevData) => ({
                ...prevData,
                avatar: `/uploads/${customer.phone}.${file.name.split(".")[1]}`,
            }));
        }
    };

    const handleClickEditMode = () => {
        if (!isEditable) {
            setIsEditable(true);
            setModifiedCustomer(customer);
            //setFile({ file: "", imagePreviewUrl: "" });
        } else {
            setIsEditable(false);
        }
    };

    const renderFields = () => {
        if (!isEditable) {
            return (
                <>
                    <div className="personal__information-foto">
                        <img src={customer.avatar} alt="avatar" />
                    </div>

                    <div className="personal__information-field">Name: {customer.name}</div>
                    <div className="personal__information-field">Phone: {customer.phone}</div>
                    <div className="personal__information-field">Email: {customer.email}</div>
                    <div className="personal__information-field">Age: {customer.age}</div>
                </>
            );
        } else {
            return (
                <>
                    <form className="personal__information-form" onSubmit={handleSubmit}>
                        <div className="personal__information-foto activeFoto">
                            <img
                                src={!file.imagePreviewUrl ? customer.avatar : file.imagePreviewUrl}
                                alt="avatar"
                            />
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                onChange={handleChangeFoto}
                                accept=".jpg, .jpeg, .png"
                            />
                        </div>

                        <div className="personal__information-form-item">
                            <label className="personal__information-field" htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="customerName"
                                placeholder="Customer name"
                                required
                                value={modifiedCustomer.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="personal__information-field">
                            Phone: {modifiedCustomer.phone}
                        </div>

                        <div className="personal__information-form-item">
                            <label className="personal__information-field" htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="customerEmail"
                                placeholder="Email"
                                value={modifiedCustomer.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="personal__information-form-item">
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
                                value={modifiedCustomer.age}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="personal__information-confirm"
                            disabled={creationStatus}
                        >
                            Confirm
                        </button>
                    </form>
                </>
            );
        }
    };

    const elements = records
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((item) => {
            const formattedDate = dayjs(item.date).format("DD/MM/YYYY HH:mm");

            return (
                <div className="personal__records-item" key={item.id}>
                    <div className="personal__records-service">Service: {item.service}</div>
                    <div className="personal__records-wrapper">
                        <div className="personal__records-specialist">
                            Specialist: {item.specialist}
                        </div>
                        <div className="personal__records-date">Date: {formattedDate}</div>
                    </div>
                </div>
            );
        });

    if (!isAuth) return null;

    return (
        <div className="personal">
            <div className="personal__title">Customers personal page</div>
            <div className="personal__wrapper">
                <div className="personal__information">
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
                            onClick={() => handleClickEditMode()}
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

                    <div className="personal__records-items">
                        {!isRecordsLoaded ? <Spinner /> : elements}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerPersonalPage;
