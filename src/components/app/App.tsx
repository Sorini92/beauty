import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContextProvider from "../../context/user/userContext";
import AppointmentContextProvider from "../../context/appointments/AppointmentsContext";
import CustomerContextProvider from "../../context/customers/customersContext";
import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
import HistoryPage from "../../pages/history/HistoryPage";
import PageNotFound from "../../pages/404/404";
import LoginPage from "../../pages/login/login";
import CustomersPage from "../../pages/customers/CustomersPage";
import CustomerPersonalPage from "../customerPersonalPage/CustomerPersonalPage";
import SpecialistsPage from "../../pages/specialists/SpecialistsPage";
import SpecialistPersonalPage from "../specialistPersonalPage/SpecialistPersonalPage";
import MaterialsPage from "../../pages/matherials/MaterialsPage";
import SpecialistsContextProvider from "../../context/specialists/specialistsContext";
import MaterialsContextProvider from "../../context/materials/materialsContext";

import "./app.scss";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: "/",
                element: <SchedulePage />,
            },
            {
                path: "/schedule",
                element: <SchedulePage />,
            },
            {
                path: "/history",
                element: <HistoryPage />,
            },
            {
                path: "/materials",
                element: <MaterialsPage />,
            },
            {
                path: "/customers",
                element: <CustomersPage />,
            },
            {
                path: "/customers/:id",
                element: <CustomerPersonalPage />,
            },
            {
                path: "schedule/customers/:id",
                element: <CustomerPersonalPage />,
            },
            {
                path: "/specialists",
                element: <SpecialistsPage />,
            },
            {
                path: "/specialists/:id",
                element: <SpecialistPersonalPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

function Root() {
    return (
        <UserContextProvider>
            <CustomerContextProvider>
                <SpecialistsContextProvider>
                    <AppointmentContextProvider>
                        <MaterialsContextProvider>
                            <main className="board">
                                <Header />
                                <Outlet />
                            </main>
                        </MaterialsContextProvider>
                    </AppointmentContextProvider>
                </SpecialistsContextProvider>
            </CustomerContextProvider>
        </UserContextProvider>
    );
}

export default App;
