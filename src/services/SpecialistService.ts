import { useHttp } from "../hooks/http.hook";

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

    const createNewSpecialist = async (body: ISpecialist): Promise<void> => {
        const id = new Date().getTime();
        body["id"] = id;

        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(body),
        });
    };

    const cancelOneSpecialist = async (id: number): Promise<void> => {
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

    const uploadImage = async (formData: any): Promise<any> => {
        return await request({
            url: "http://localhost:3002/upload",
            method: "POST",
            headers: {},
            body: formData,
        });
    };

    return {
        getSpecialists,
        getOneSpecialist,
        createNewSpecialist,
        cancelOneSpecialist,
        editSpecialist,
        synchronizeSpecialistAndAppointments,
        loadingStatus,
        uploadImage,
    };
};

export default useSpecialistService;
