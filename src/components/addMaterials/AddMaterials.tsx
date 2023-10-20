import { ChangeEvent, FormEvent, useState, useEffect, useRef, useContext } from "react";
import useMaterialsService from "../../services/MaterialsService";
import { MaterialsContext } from "../../context/materials/materialsContext";

import { IAvailableMaterials, IMaterial } from "../../shared/interfaces/appointment.interface";

import "./addMaterials.scss";

interface IAddMaterialProps {
    createFunc: (body: IMaterial[]) => Promise<void>;
    text: string;
}

function AddMaterials({ createFunc, text }: IAddMaterialProps) {
    const { getAvailableMaterials } = useMaterialsService();
    const { getAllMaterials } = useContext(MaterialsContext);

    const [formDataArray, setFormDataArray] = useState<IMaterial[]>([
        { material: "", quantity: 0, id: 0, date: 0 },
    ]);
    const [creationStatus, setCreationStatus] = useState<boolean>(false);
    const [availableMaterials, setAvailableMaterials] = useState<IAvailableMaterials>([]);
    const [remainingMaterials, setRemainingMaterials] = useState<IAvailableMaterials>([]);
    const formIndex = useRef(1);

    useEffect(() => {
        getAvailableMaterials().then((res) => {
            setAvailableMaterials(res);
            setRemainingMaterials(res);
        });
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreationStatus(true);

        createFunc(formDataArray)
            .then(() => {
                setCreationStatus(false);
                setFormDataArray([{ material: "", quantity: 0, id: 0, date: 0 }]);
                getAllMaterials();
            })
            .catch(() => {
                alert("Error while creating a new appointment");
            });
    };

    const handleChange = (
        index: number,
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        const values = [...formDataArray];

        values[index] = {
            ...values[index],
            [name]: value,
        };

        setFormDataArray(values);
    };

    const addOrderForm = () => {
        if (formDataArray.length < availableMaterials.length) {
            setFormDataArray([...formDataArray, { material: "", quantity: 0, id: 0, date: 0 }]);
        }
    };

    const removeOrderForm = (index: number) => {
        const values = [...formDataArray];
        if (index >= 1) {
            values.splice(index, 1);
            setFormDataArray(values);
        }
    };

    const renderMaterials = remainingMaterials.map((item, i) => {
        return (
            <option key={i} value={item}>
                {item}
            </option>
        );
    });

    return (
        <form className="addMaterials" onSubmit={handleSubmit}>
            <div className="addMaterials__title">{text} materials</div>

            {formDataArray.map((formData, index) => {
                return (
                    <div key={index}>
                        <label htmlFor={`material-${index}`}>
                            Name<span>*</span>
                        </label>
                        <select
                            required
                            id={`material-${index}`}
                            name="material"
                            value={formData.material}
                            onChange={(e) => handleChange(index, e)}
                        >
                            <option disabled value="">
                                Material name
                            </option>
                            {renderMaterials}
                        </select>

                        <label htmlFor={`quantity-${index}`}>
                            Quantity<span>*</span>
                        </label>
                        <input
                            type="text"
                            name="quantity"
                            id={`quantity-${index}`}
                            placeholder="0"
                            required
                            value={formData.quantity === 0 ? "" : formData.quantity}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>
                );
            })}

            <div className="addMaterials__addRemoveBtns">
                <div
                    onClick={() => removeOrderForm(formIndex.current)}
                    className="addMaterials__plus"
                >
                    -
                </div>

                <div onClick={() => addOrderForm()} className="addMaterials__plus">
                    +
                </div>
            </div>

            <button className="addMaterials__create" disabled={creationStatus}>
                {text}
            </button>
        </form>
    );
}

export default AddMaterials;
