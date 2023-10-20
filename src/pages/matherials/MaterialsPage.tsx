import AddMaterials from "../../components/addMaterials/AddMaterials";
import MaterialsList from "../../components/materialsList/MaterialsList";
import useMaterialsService from "../../services/MaterialsService";
import useAuth from "../../hooks/useAuth";

import "./materialsPage.scss";

const MaterialsPage = () => {
    const { isAuth } = useAuth();
    const { createNewMaterial, createNewOrder } = useMaterialsService();

    if (!isAuth) return null;

    return (
        <section className="materials">
            <div className="materials__controls">
                <AddMaterials text={"Order"} createFunc={createNewOrder} />
                <AddMaterials text={"Add"} createFunc={createNewMaterial} />
            </div>
            <div className="materials__list">
                <MaterialsList />
            </div>
        </section>
    );
};

export default MaterialsPage;
