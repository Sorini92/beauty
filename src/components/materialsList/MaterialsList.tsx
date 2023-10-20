import { useContext, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { MaterialsContext } from "../../context/materials/materialsContext";
import MaterialsItem from "../materialsItem.tsx/MaterialsItem";

import "./materialsList.scss";

function MaterialsList() {
    const { materials, getAllMaterials, materialsLoadingStatus } = useContext(MaterialsContext);

    useEffect(() => {
        getAllMaterials();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (materialsLoadingStatus === "loading") {
        return <Spinner />;
    } else if (materialsLoadingStatus === "error") {
        return (
            <>
                <Error />
                <button className="schedule__reload" onClick={getAllMaterials}>
                    Try to reload
                </button>
            </>
        );
    }

    return (
        <>
            {materials.length > 0 ? (
                materials
                    .sort((a, b) => b.date - a.date)
                    .map((item) => {
                        return <MaterialsItem {...item} key={item.id} />;
                    })
            ) : (
                <div className="empty">No materials yet</div>
            )}
        </>
    );
}

export default MaterialsList;
