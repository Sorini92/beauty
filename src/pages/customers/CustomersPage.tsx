import CreateNewCustomer from "../../components/createNewCustomer/CreateNewCustomer";
import CustomerList from "../../components/customerList/CustomerList";
import useAuth from "../../hooks/useAuth";

import "./customersPage.scss";

const CustomersPage = () => {
    const { isAuth } = useAuth();

    if (!isAuth) return null;

    return (
        <section className="customers">
            <div className="customers__controls">
                <CreateNewCustomer />
            </div>
            <div className="customers__list">
                <CustomerList />
            </div>
        </section>
    );
};

export default CustomersPage;
