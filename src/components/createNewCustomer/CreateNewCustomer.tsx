import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { CustomerContext } from "../../context/customers/customersContext";
import useCustomerService from "../../services/CustomerService";

import { ICustomer } from "../../shared/interfaces/appointment.interface";

import "./createNewCustomer.scss";

const CreateNewCustomer = () => {
    const { createNewCustomer } = useCustomerService();
    const { getAllCustomers } = useContext(CustomerContext);

    const [formData, setFormData] = useState<ICustomer>({
        name: "",
        phone: 0,
        age: "",
        email: "",
        id: 0,
        avatar: "/uploads/avatar.png",
    });
    const [creationStatus, setCreationStatus] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreationStatus(true);

        createNewCustomer(formData)
            .then(() => {
                setCreationStatus(false);
                setFormData({
                    name: "",
                    phone: 0,
                    age: "",
                    email: "",
                    id: 0,
                    avatar: "/uploads/avatar.png",
                });
                getAllCustomers();
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
        <form className="ccform" onSubmit={handleSubmit}>
            <div className="ccform__title">Create new customer</div>

            <label htmlFor="name">
                Name<span>*</span>
            </label>
            <input
                type="text"
                name="name"
                id="customerName"
                placeholder="Customer name"
                required
                value={formData.name}
                onChange={handleChange}
            />

            <label htmlFor="age">Age</label>
            <input
                type="text"
                name="age"
                pattern="\d{2}"
                title="Only numbers from 10"
                id="customerAge"
                placeholder="Age"
                value={formData.age}
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
                value={formData.phone === 0 ? "" : formData.phone}
                onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                id="customerEmail"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <button disabled={creationStatus}>Create</button>
        </form>
    );
};

export default CreateNewCustomer;
