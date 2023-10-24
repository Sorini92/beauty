import { ChangeEvent, FormEvent, useState, useEffect, useRef, useContext } from "react";
import useMaterialsService from "../../services/MaterialsService";
import { MaterialsContext } from "../../context/materials/materialsContext";

import { IAvailableMaterials, IMaterial } from "../../shared/interfaces/appointment.interface";

import "./addMaterials.scss";
import AddMaterialsFormItem from "../addMaterialsFormItem/AddMaterialsFormItem";

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
    const [remainingMaterials, setRemainingMaterials] = useState<IAvailableMaterials[]>([]);
    const formIndex = useRef(1);

    useEffect(() => {
        getAvailableMaterials().then((res) => {
            setAvailableMaterials(res);
            setRemainingMaterials([res]);
        });
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreationStatus(true);

        createFunc(formDataArray)
            .then(() => {
                setCreationStatus(false);
                setFormDataArray([{ material: "", quantity: 0, id: 0, date: 0 }]);
                setRemainingMaterials([availableMaterials]);
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
        if (
            formDataArray.length < availableMaterials.length &&
            formDataArray[formIndex.current - 1]?.material !== ""
        ) {
            setFormDataArray([...formDataArray, { material: "", quantity: 0, id: 0, date: 0 }]);

            setRemainingMaterials([
                ...remainingMaterials,
                remainingMaterials[formIndex.current - 1]?.filter(
                    (item) => item !== formDataArray[formIndex.current - 1]?.material
                ),
            ]);

            formIndex.current = formIndex.current + 1;
        }
    };

    return (
        <form className="addMaterials" onSubmit={handleSubmit}>
            <div className="addMaterials__title">{text} materials</div>

            {formDataArray.map((formData, index) => {
                return (
                    <div key={index}>
                        <AddMaterialsFormItem
                            index={index}
                            formData={formData}
                            handleChange={handleChange}
                            availableMaterials={remainingMaterials[index]}
                        />
                    </div>
                );
            })}

            <div onClick={() => addOrderForm()} className="addMaterials__plus">
                +
            </div>

            <button className="addMaterials__create" disabled={creationStatus}>
                {text}
            </button>
        </form>
    );
}

export default AddMaterials;
