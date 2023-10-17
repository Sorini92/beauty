import { ChangeEvent, FormEvent, useState, useContext, useEffect } from "react";
import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

import { IAppointment, ISpecialist } from "../../shared/interfaces/appointment.interface";

import "./caform.scss";

function CAForm() {
    const { createNewAppointment, getSpecialists } = useAppointmentService();
    const { getActiveAppointments } = useContext(AppointmentContext);

    const [formData, setFormData] = useState<IAppointment>({
        name: "",
        service: "",
        phone: 0,
        date: "",
        specialist: "",
        canceled: false,
        id: 0,
    });
    const [creationStatus, setCreationStatus] = useState<boolean>(false);
    const [specialists, setSpecialists] = useState<ISpecialist[]>([]);

    useEffect(() => {
        getSpecialists().then((res) => {
            setSpecialists(res);
        });
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreationStatus(true);

        createNewAppointment(formData)
            .then(() => {
                setCreationStatus(false);
                setFormData({
                    name: "",
                    service: "",
                    phone: 0,
                    date: "",
                    specialist: "",
                    canceled: false,
                    id: 0,
                });
                getActiveAppointments();
            })
            .catch(() => {
                alert("Error while creating a new appointment");
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const renderSpecialists = () => {
        return specialists.map((item) => {
            return (
                <option key={item.id} value={item.name}>
                    {item.name}
                </option>
            );
        });
    };

    return (
        <form className="caform" onSubmit={handleSubmit}>
            <div className="caform__title">Create new appointment</div>
            <label htmlFor="name">
                Name<span>*</span>
            </label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="User name"
                required
                value={formData.name}
                onChange={handleChange}
            />

            <label htmlFor="specialist">
                Specialist<span>*</span>
            </label>
            <select
                required
                id="specialist"
                name="specialist"
                placeholder="Specialist name"
                value={formData.specialist}
                onChange={handleChange}
            >
                <option disabled value="">
                    Specialist name
                </option>
                {renderSpecialists()}
            </select>

            <label htmlFor="service">
                Service<span>*</span>
            </label>
            <input
                type="text"
                name="service"
                id="service"
                placeholder="Service name"
                required
                value={formData.service}
                onChange={handleChange}
            />

            <label htmlFor="phone">
                Phone number<span>*</span>
            </label>
            <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="380683357256"
                pattern="\d{12}"
                title="Format should be 380683357256"
                required
                value={formData.phone === 0 ? "" : formData.phone}
                onChange={handleChange}
            />

            <label htmlFor="date">
                Date<span>*</span>
            </label>
            <input
                type="text"
                name="date"
                id="date"
                placeholder="DD/MM/YYYY HH:mm"
                pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
                title="Format should be DD/MM/YYYY HH:mm"
                required
                value={formData.date}
                onChange={handleChange}
            />
            <button disabled={creationStatus}>Create</button>
        </form>
    );
}

export default CAForm;
