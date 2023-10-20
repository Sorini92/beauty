import { uploadBytes, getDownloadURL, listAll, ref, deleteObject } from "firebase/storage";
import { useHttp } from "../hooks/http.hook";
import storage from "../firebase";

import { ISpecialist, IAppointment } from "../shared/interfaces/appointment.interface";

const useSpecialistService = () => {
    const { loadingStatus, request } = useHttp();

    const _apiBase = "http://localhost:3001/specialists";
    const _apiAppointments = "http://localhost:3001/appointments";

    const getSpecialists = async (): Promise<ISpecialist[]> => {
        const res = await request({ url: _apiBase });

        return res;
    };

    const getOneSpecialist = async (id: string): Promise<ISpecialist> => {
        const res = await request({ url: `${_apiBase}/${id}` });

        return res;
    };

    const getSpecialistDataByName = async (name: string): Promise<IAppointment[] | []> => {
        const res = await request({ url: `${_apiAppointments}?specialist=${name}` });

        return res;
    };

    const createNewSpecialist = async (body: ISpecialist): Promise<void> => {
        const regex = /[^a-zA-Zа-яА-Я0-9]+/g;
        const id = new Date().getTime();

        body["id"] = id;
        body["avatar"] = "specialists/avatar.png";
        if (typeof body["services"] === "string") {
            body["services"] = body.services.replace(regex, " ").split(" ");
        }

        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(body),
        });
    };

    const cancelOneSpecialist = async (id: number): Promise<void> => {
        const listRef = ref(storage, `specialists/${id}`);

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

    const editSpecialist = async (id: number, data: ISpecialist): Promise<void> => {
        return await request({
            url: `${_apiBase}/${id}`,
            method: "PATCH",
            body: JSON.stringify(data),
        });
    };

    const synchronizeSpecialistAndAppointments = async (
        id: number,
        data: ISpecialist
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
        const storageRef = ref(storage, `specialists/${phone}/${newFileName}`);

        return await uploadBytes(storageRef, file);
    };

    const getImage = async (url: string): Promise<any> => {
        const storageRef = ref(storage, `${url}`);

        return await getDownloadURL(storageRef);
    };

    return {
        getSpecialists,
        getOneSpecialist,
        createNewSpecialist,
        cancelOneSpecialist,
        editSpecialist,
        synchronizeSpecialistAndAppointments,
        getSpecialistDataByName,
        loadingStatus,
        getImage,
        uploadImage,
    };
};

export default useSpecialistService;
