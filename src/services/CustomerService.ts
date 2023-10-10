import { useHttp } from "../hooks/http.hook";

import { ICustomer, IAppointment } from "../shared/interfaces/appointment.interface";

const useCustomerService = () => {
    const { loadingStatus, request } = useHttp();

    const _apiBase = "http://localhost:3001/customers";

    const getCustomers = async (): Promise<ICustomer[]> => {
        const res = await request({ url: _apiBase });

        return res;
    };

    const getOneCustomer = async (id: string): Promise<ICustomer> => {
        const res = await request({ url: `${_apiBase}/${id}` });

        return res;
    };

    const getCustomerDataByPhone = async (phone: number): Promise<IAppointment[] | []> => {
        const res = await request({ url: `http://localhost:3001/appointments?phone=${phone}` });

        return res;
    };

    const createNewCustomer = async (body: ICustomer) => {
        body["phone"] = +body["phone"];
        body["id"] = +body["phone"];
        body["age"] = body["age"] === "" ? "no data" : body["age"];
        body["email"] = body["email"] === "" ? "no data" : body["email"];

        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(body),
        });
    };

    const cancelOneCustomer = async (id: number) => {
        return await request({
            url: `${_apiBase}/${id}`,
            method: "DELETE",
        });
    };

    const editCustomer = async (id: number, data: ICustomer) => {
        return await request({
            url: `${_apiBase}/${id}`,
            method: "PATCH",
            body: JSON.stringify(data),
        });
    };

    return {
        getCustomers,
        loadingStatus,
        createNewCustomer,
        cancelOneCustomer,
        getOneCustomer,
        getCustomerDataByPhone,
        editCustomer,
    };
};

export default useCustomerService;
