import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { SpecialistContext } from "../../context/specialists/specialistsContext";
import useSpecialistService from "../../services/SpecialistService";

import { ISpecialist } from "../../shared/interfaces/appointment.interface";

import "./createNewSpecialist.scss";

const CreateNewSpecialist = () => {
    const { createNewSpecialist } = useSpecialistService();
    const { getAllSpecialists } = useContext(SpecialistContext);

    const [formData, setFormData] = useState<ISpecialist>({
        name: "",
        services: "",
        phone: "",
        id: 0,
    });
    const [creationStatus, setCreationStatus] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreationStatus(true);

        createNewSpecialist(formData)
            .then(() => {
                setCreationStatus(false);
                setFormData({
                    name: "",
                    services: "",
                    phone: "",
                    id: 0,
                });
                getAllSpecialists();
            })
            .catch(() => {
                alert("Error while creating a new appointment");
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form className="scform" onSubmit={handleSubmit}>
            <div className="scform__title">Create new specialist</div>

            <label htmlFor="name">
                Name<span>*</span>
            </label>
            <input
                type="text"
                name="name"
                id="specialistName"
                placeholder="Specialist name"
                required
                value={formData.name}
                onChange={handleChange}
            />

            <label htmlFor="services">
                Services<span>*</span>
            </label>
            <input
                type="text"
                name="services"
                id="services"
                placeholder="Service name"
                required
                value={formData.services}
                onChange={handleChange}
            />

            <label htmlFor="phone">
                Phone number<span>*</span>
            </label>
            <input
                type="tel"
                name="phone"
                id="customerPhone"
                placeholder="380683357256"
                pattern="\d{12}"
                title="Format should be 380683357256"
                required
                value={formData.phone}
                onChange={handleChange}
            />

            <button disabled={creationStatus}>Create</button>
        </form>
    );
};

export default CreateNewSpecialist;
