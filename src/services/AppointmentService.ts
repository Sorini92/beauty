import { useHttp } from "../hooks/http.hook";
import hasRequiredFields from "../utils/hasRequiredFields";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import {
    IAppointment,
    ActiveAppointment,
    ICustomer,
} from "../shared/interfaces/appointment.interface";

dayjs.extend(customParseFormat);

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

const useAppointmentService = () => {
    const { loadingStatus, request } = useHttp();

    const _apiBase = "http://localhost:3001/appointments";
    const _apiSpecialists = "http://localhost:3001/specialists";
    const _apiCustomers = "http://localhost:3001/customers";

    const getAllAppointments = async (): Promise<IAppointment[]> => {
        const res = await request({ url: _apiBase });
        if (res.every((item: IAppointment) => hasRequiredFields(item, requiredFields))) {
            return res;
        } else {
            throw new Error("Data doesnt have all the fields");
        }
    };

    const getAllActiveAppointments = async () => {
        const base = await getAllAppointments();
        const transformed: ActiveAppointment[] = base
            .filter((item) => {
                return !item.canceled && dayjs(item.date).diff(undefined, "minute") > 0;
            })
            .map((item) => {
                return {
                    id: item.id,
                    date: item.date,
                    name: item.name,
                    service: item.service,
                    phone: item.phone,
                    specialist: item.specialist,
                };
            });
        return transformed;
    };

    const getSpecialists = async () => {
        const res = await request({ url: _apiSpecialists });

        return res;
    };

    const cancelOneAppointment = async (id: number) => {
        return await request({
            url: `${_apiBase}/${id}`,
            method: "PATCH",
            body: JSON.stringify({ canceled: true }),
        });
    };

    const checkCustomer = async (phone: number): Promise<ICustomer | undefined> => {
        let res = await request({ url: `${_apiCustomers}?phone=${phone}` });

        return res[0];
    };

    const createNewAppointment = async (body: IAppointment) => {
        const id = new Date().getTime();
        body["id"] = id;
        body["phone"] = +body["phone"];
        body["date"] = dayjs(body.date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DDTHH:mm");

        checkCustomer(+body["phone"]).then((res) => {
            if (!res) {
                let customer: ICustomer = {
                    name: body["name"],
                    phone: +body["phone"],
                    age: "no data",
                    email: "no data",
                    id: +body["phone"],
                    avatar: "customers/avatar.png",
                };

                request({
                    url: _apiCustomers,
                    method: "POST",
                    body: JSON.stringify(customer),
                });
            }
        });

        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(body),
        });
    };

    return {
        loadingStatus,
        getAllAppointments,
        getAllActiveAppointments,
        cancelOneAppointment,
        createNewAppointment,
        getSpecialists,
    };
};

export default useAppointmentService;
