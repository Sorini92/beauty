import CreateNewSpecialist from "../../components/createNewSpecialist/CreateNewSpecialist";
import SpecialistList from "../../components/specialistList/SpecialistList";
import useAuth from "../../hooks/useAuth";

import "./specialistsPage.scss";

const SpecialistsPage = () => {
    const { isAuth } = useAuth();

    if (!isAuth) return null;

    return (
        <section className="specialists">
            <div className="specialists__controls">
                <CreateNewSpecialist />
            </div>
            <div className="specialists__list">
                <SpecialistList />
            </div>
        </section>
    );
};

export default SpecialistsPage;
