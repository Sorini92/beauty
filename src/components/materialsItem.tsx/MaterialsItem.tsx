import { memo } from "react";
import { IMaterial } from "../../shared/interfaces/appointment.interface";

import "./materialsItem.scss";

type MaterialsProps = IMaterial;

const MaterialsItem = memo(({ material, quantity, date }: MaterialsProps) => {
    const onFormattedDate = (date: number) => {
        let normalDate = new Date(date);

        return `${normalDate.toLocaleTimeString()} ${normalDate.toLocaleDateString()}`;
    };

    return (
        <div className="material">
            <div className="material__info">
                <div className="material__material">
                    Material: <span>{material}</span>
                </div>

                <div className="material__date">
                    Date: <span>{onFormattedDate(date)}</span>
                </div>

                <div className="material__quantity">
                    Quantity: <span> {quantity}</span>
                </div>
            </div>
        </div>
    );
});

export default MaterialsItem;
