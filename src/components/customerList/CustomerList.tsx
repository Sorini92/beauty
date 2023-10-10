import { useContext, useEffect, useState, useCallback } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";
import CustomerItem from "../customerItem.tsx/CustomerItem";
import useCustomerService from "../../services/CustomerService";

import { CustomerContext } from "../../context/customers/customersContext";

import "./customerList.scss";

function CustomerList() {
    const { customers, getAllCustomers, customersLoadingStatus } = useContext(CustomerContext);
    const { cancelOneCustomer } = useCustomerService();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, selectId] = useState(0);

    useEffect(() => {
        getAllCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenModal = useCallback((id: number) => {
        setIsOpen(true);
        selectId(id);
    }, []);

    if (customersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (customersLoadingStatus === "error") {
        return (
            <>
                <Error />
                <button className="schedule__reload" onClick={getAllCustomers}>
                    Try to reload
                </button>
            </>
        );
    }

    return (
        <>
            {customers.length > 0 ? (
                customers.map((item) => {
                    return <CustomerItem {...item} key={item.phone} openModal={handleOpenModal} />;
                })
            ) : (
                <div className="empty">No customers yet</div>
            )}
            <CancelModal
                title={"Are you sure you want to delete the customer?"}
                handleClose={setIsOpen}
                selectedId={selectedId}
                isOpen={isOpen}
                getList={getAllCustomers}
                cencelFunc={cancelOneCustomer}
            />
        </>
    );
}

export default CustomerList;
