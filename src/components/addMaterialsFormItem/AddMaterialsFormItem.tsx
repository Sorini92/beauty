import { ChangeEvent } from "react";

import { IAvailableMaterials, IMaterial } from "../../shared/interfaces/appointment.interface";

interface IAddMaterialFormItemProps {
    index: number;
    formData: IMaterial;
    availableMaterials: IAvailableMaterials;
    handleChange: (index: number, event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddMaterialsFormItem = ({
    index,
    formData,
    handleChange,
    availableMaterials,
}: IAddMaterialFormItemProps) => {
    const renderMaterials = availableMaterials?.map((item, i) => {
        return (
            <option key={i} value={item}>
                {item}
            </option>
        );
    });

    return (
        <>
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
        </>
    );
};

export default AddMaterialsFormItem;
