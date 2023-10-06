import { useState, FormEvent, ChangeEvent, useRef } from "react";
import Portal from "../portal/portal";
import useUserService from "../../services/UserService";
import { CSSTransition } from "react-transition-group";
import Spinner from "../../components/spinner/Spinner";
import "./addNewManager.scss";

interface IAddNewManagerProps {
    setIsOpen: (state: boolean) => void;
    isOpen: boolean;
}

const AddNewManager = ({ setIsOpen, isOpen }: IAddNewManagerProps) => {
    const { addUser, loadingStatus } = useUserService();

    const [user, setUser] = useState({ name: "", password: "" });
    const [message, setMessage] = useState("");

    const nodeRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addUser(user)
            .then(() => {
                setMessage("Success");
            })
            .catch((e) => {
                setMessage("Error");
                throw new Error(e);
            })
            .finally(() => {
                setUser({ name: "", password: "" });
            });
    };

    const handleClose = () => {
        setIsOpen(false);
        setMessage("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Portal>
            <CSSTransition
                in={isOpen}
                timeout={{ enter: 500, exit: 500 }}
                unmountOnExit
                classNames={"addModal"}
                nodeRef={nodeRef}
            >
                <div className="addModal" ref={nodeRef}>
                    <form className="addModal__body login" onSubmit={handleSubmit}>
                        <div className="addModal__title">Add new manager</div>

                        {loadingStatus === "loading" ? (
                            <Spinner />
                        ) : (
                            <>
                                <label htmlFor="name">
                                    Name<span>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="managerName"
                                    placeholder="Meneger name"
                                    required
                                    onChange={handleChange}
                                    value={user.name}
                                />

                                <label htmlFor="password">
                                    Password<span>*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="managerPassword"
                                    placeholder="Password"
                                    required
                                    onChange={handleChange}
                                    value={user.password}
                                />

                                <div className="message">{message}</div>
                            </>
                        )}

                        <div className="addModal__btns">
                            <button disabled={loadingStatus === "loading"} type="submit">
                                Add
                            </button>
                            <button
                                disabled={loadingStatus === "loading"}
                                type="button"
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </CSSTransition>
        </Portal>
    );
};

export default AddNewManager;
