import { ReactNode } from "react";
import UserContextProvider from "../../context/user/userContext";
import CustomerContextProvider from "../../context/customers/customersContext";
import SpecialistsContextProvider from "../../context/specialists/specialistsContext";
import AppointmentContextProvider from "../../context/appointments/AppointmentsContext";
import MaterialsContextProvider from "../../context/materials/materialsContext";

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <UserContextProvider>
            <CustomerContextProvider>
                <SpecialistsContextProvider>
                    <AppointmentContextProvider>
                        <MaterialsContextProvider>{children}</MaterialsContextProvider>
                    </AppointmentContextProvider>
                </SpecialistsContextProvider>
            </CustomerContextProvider>
        </UserContextProvider>
    );
};

export default AppProviders;
