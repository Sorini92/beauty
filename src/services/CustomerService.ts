import { useHttp } from "../hooks/http.hook";
import storage from "../firebase";
import { uploadBytes, getDownloadURL, listAll, ref, deleteObject } from "firebase/storage";

import { ICustomer, IAppointment } from "../shared/interfaces/appointment.interface";

const useCustomerService = () => {
    const { loadingStatus, request } = useHttp();

    const _apiBase = "http://localhost:3001/customers";
    const _apiAppointments = "http://localhost:3001/appointments";

    const getCustomers = async (): Promise<ICustomer[]> => {
        const res = await request({ url: _apiBase });

        return res;
    };

    const getOneCustomer = async (id: string): Promise<ICustomer> => {
        const res = await request({ url: `${_apiBase}/${id}` });

        return res;
    };

    const getCustomerDataByPhone = async (phone: number): Promise<IAppointment[] | []> => {
        const res = await request({ url: `${_apiAppointments}?phone=${phone}` });

        return res;
    };

    const createNewCustomer = async (body: ICustomer): Promise<void> => {
        body["phone"] = +body["phone"];
        body["id"] = +body["phone"];
        body["age"] = body["age"] === "" ? "no data" : body["age"];
        body["email"] = body["email"] === "" ? "no data" : body["email"];
        body["avatar"] = "customers/avatar.png";

        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(body),
        });
    };

    const cancelOneCustomer = async (id: number): Promise<void> => {
        const listRef = ref(storage, `customers/${id}`);

        listAll(listRef).then((res) => {
            res.items.forEach((itemRef) => {
                deleteObject(itemRef);
            });
        });

        return await request({
            url: `${_apiBase}/${id}`,
            method: "DELETE",
        });
    };

    const editCustomer = async (id: number, data: ICustomer): Promise<void> => {
        return await request({
            url: `${_apiBase}/${id}`,
            method: "PATCH",
            body: JSON.stringify(data),
        });
    };

    const synchronizeCustomerAndAppointments = async (
        id: number,
        data: ICustomer
    ): Promise<void> => {
        try {
            let response = await request({
                url: `${_apiAppointments}?phone=${id}`,
                method: "GET",
            });

            response.forEach((item: IAppointment) => {
                request({
                    url: `${_apiAppointments}/${item.id}`,
                    method: "PATCH",
                    body: JSON.stringify({ name: data.name }),
                });
            });
        } catch {
            throw new Error();
        }
    };

    const uploadImage = async (file: File, newFileName: string, phone: number): Promise<any> => {
        const storageRef = ref(storage, `customers/${phone}/${newFileName}`);

        return await uploadBytes(storageRef, file);
    };

    const getImage = async (url: string): Promise<any> => {
        const storageRef = ref(storage, `${url}`);

        return await getDownloadURL(storageRef);
    };

    return {
        getCustomers,
        loadingStatus,
        createNewCustomer,
        cancelOneCustomer,
        getOneCustomer,
        getCustomerDataByPhone,
        editCustomer,
        synchronizeCustomerAndAppointments,
        uploadImage,
        getImage,
    };
};

export default useCustomerService;
