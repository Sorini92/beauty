import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContextProvider from "../../context/user/userContext";
import AppointmentContextProvider from "../../context/appointments/AppointmentsContext";
import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
import HistoryPage from "../../pages/history/HistoryPage";
import PageNotFound from "../../pages/404/404";
import LoginPage from "../../pages/login/login";

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
            <AppointmentContextProvider>
                <main className="board">
                    <Header />
                    <Outlet />
                </main>
            </AppointmentContextProvider>
        </UserContextProvider>
    );
}

export default App;
