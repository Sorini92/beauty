import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import Spinner from "../spinner/Spinner";
import useSpecialistService from "../../services/SpecialistService";

import { ISpecialist, IAppointment } from "../../shared/interfaces/appointment.interface";

import "./specialistPersonalPage.scss";

const SpecialistPersonalPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    const {
        getOneSpecialist,
        editSpecialist,
        synchronizeSpecialistAndAppointments,
        getSpecialistDataByName,
        uploadImage,
        getImage,
    } = useSpecialistService();

    const [specialist, setSpecialist] = useState<ISpecialist>({
        name: "",
        phone: "",
        services: "",
        id: 0,
        avatar: "",
    });
    const [modifiedSpecialist, setModifiedSpecialist] = useState<ISpecialist>({
        name: "",
        phone: "",
        services: "",
        id: 0,
        avatar: "",
    });
    const [records, setRecords] = useState<IAppointment[]>([]);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [creationStatus, setCreationStatus] = useState<boolean>(false);
    const [isRecordsLoaded, setIsRecordsLoaded] = useState<boolean>(false);
    const [avatarImage, setAvatarImage] = useState<string>("");
    const [isAvatarImageLoaded, setIsAvatarImageLoaded] = useState<boolean>(false);
    const [isNewAvatarImageLoaded, setIsNewAvatarImageLoaded] = useState<boolean>(false);

    const [file, setFile] = useState<any>({ file: "", imagePreviewUrl: "" });

    useEffect(() => {
        if (id) {
            getOneSpecialist(id).then((res) => {
                setSpecialist(res);
                setModifiedSpecialist(res);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (specialist.avatar) {
            getImage(specialist.avatar).then((res) => {
                setAvatarImage(res);
                setIsAvatarImageLoaded(true);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [specialist.phone]);

    useEffect(() => {
        if (isNewAvatarImageLoaded) {
            getImage(specialist.avatar).then((res) => {
                setAvatarImage(res);
                setIsAvatarImageLoaded(true);
                setIsNewAvatarImageLoaded(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNewAvatarImageLoaded]);

    useEffect(() => {
        if (specialist.name) {
            getSpecialistDataByName(specialist.name).then((res) => {
                setIsRecordsLoaded(true);
                setRecords(res);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [specialist.name, records.length]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreationStatus(true);

        if (file.file !== "" && file.imagePreviewUrl !== "") {
            const newFileName = `${specialist.id}.${file.file.name.split(".")[1]}`;

            uploadImage(file.file, newFileName, specialist.id).then((res) => {
                setIsNewAvatarImageLoaded(true);
            });
        }

        editSpecialist(modifiedSpecialist.id, modifiedSpecialist)
            .then(() => {
                if (
                    specialist.name !== modifiedSpecialist.name ||
                    specialist.phone !== modifiedSpecialist.phone ||
                    specialist.services !== modifiedSpecialist.services
                ) {
                    synchronizeSpecialistAndAppointments(modifiedSpecialist.id, modifiedSpecialist);
                }
                setSpecialist(modifiedSpecialist);

                setCreationStatus(false);
                setIsEditable(false);
            })
            .catch((e) => {
                throw new Error(e);
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setModifiedSpecialist((prevData) => ({
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

            setModifiedSpecialist((prevData) => ({
                ...prevData,
                avatar: `specialists/${specialist.id}/${specialist.id}.${file.name.split(".")[1]}`,
            }));
        }
    };

    const handleClickEditMode = () => {
        if (!isEditable) {
            setIsEditable(true);
            setModifiedSpecialist(specialist);
            setIsAvatarImageLoaded(false);
            setFile({ file: "", imagePreviewUrl: "" });
        } else {
            setIsEditable(false);
            setIsAvatarImageLoaded(true);
        }
    };

    const renderFields = () => {
        if (!isEditable) {
            return (
                <>
                    <div className="personalSpecialist__information-foto">
                        {isAvatarImageLoaded ? <img src={avatarImage} alt="avatar" /> : <Spinner />}
                    </div>

                    <div className="personalSpecialist__information-field">
                        Name: {specialist.name}
                    </div>
                    <div className="personalSpecialist__information-field">
                        Phone: {specialist.phone}
                    </div>
                    <div className="personalSpecialist__information-field">
                        Services: {specialist.services}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <form className="personalSpecialist__information-form" onSubmit={handleSubmit}>
                        <div className="personalSpecialist__information-foto activeFoto">
                            <img
                                src={!file.imagePreviewUrl ? avatarImage : file.imagePreviewUrl}
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

                        <div className="personalSpecialist__information-form-item">
                            <label className="personalSpecialist__information-field" htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="specialistName"
                                placeholder="Specislist name"
                                required
                                value={modifiedSpecialist.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="personalSpecialist__information-field">
                            <label
                                className="personalSpecialist__information-field"
                                htmlFor="phone"
                            >
                                Phone:
                            </label>
                            <input
                                type="text"
                                name="phone"
                                id="specialistPhone"
                                placeholder="Phone"
                                value={modifiedSpecialist.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="personalSpecialist__information-form-item">
                            <label
                                className="personalSpecialist__information-field"
                                htmlFor="services"
                            >
                                Services:
                            </label>
                            <input
                                type="text"
                                name="services"
                                id="specialistServices"
                                placeholder="services"
                                value={modifiedSpecialist.services}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="personalSpecialist__information-confirm"
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
                <div className="personalSpecialist__records-item" key={item.id}>
                    <div className="personalSpecialist__records-service">
                        Service: {item.service}
                    </div>
                    <div className="personalSpecialist__records-wrapper">
                        <div className="personalSpecialist__records-specialist">
                            Client: {item.specialist}
                        </div>
                        <div className="personalSpecialist__records-date">
                            Date: {formattedDate}
                        </div>
                    </div>
                </div>
            );
        });

    if (!isAuth) return null;

    return (
        <div className="personalSpecialist">
            <div className="personalSpecialist__title">Specialist's personal page</div>
            <div className="personalSpecialist__wrapper">
                <div className="personalSpecialist__information">
                    {renderFields()}

                    <div className="personalSpecialist__information-btns">
                        <button
                            className="personalSpecialist__information-edit"
                            onClick={() => handleClickEditMode()}
                        >
                            {!isEditable ? "Edit" : "Cancel"}
                        </button>

                        <button
                            className="personalSpecialist__information-back"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                    </div>
                </div>
                <div className="personalSpecialist__records">
                    <div className="personalSpecialist__records-title">Records</div>

                    <div className="personalSpecialist__records-items">
                        {!isRecordsLoaded ? (
                            <Spinner />
                        ) : elements.length === 0 ? (
                            <div className="emptyRecords">No records yet</div>
                        ) : (
                            elements
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialistPersonalPage;
