import { useHttp } from "../hooks/http.hook";
import { IMaterial, IAvailableMaterials } from "../shared/interfaces/appointment.interface";

const useMaterialsService = () => {
    const { loadingStatus, request } = useHttp();

    const _apiBase = "http://localhost:3001/materials";
    const _apiOrder = "http://localhost:3001/order";
    const _apiAvailableMaterials = "http://localhost:3001/allmaterials";

    const getMaterials = async (): Promise<IMaterial[]> => {
        const res = await request({ url: _apiBase });

        return res;
    };

    const getAvailableMaterials = async (): Promise<IAvailableMaterials> => {
        const res = await request({ url: _apiAvailableMaterials });

        return res;
    };

    const createNewMaterial = async (body: IMaterial[]): Promise<void> => {
        let response = await body.forEach((item) => {
            item["quantity"] = +item["quantity"];
            item["date"] = new Date().getTime();
            item["id"] = new Date().getTime() + Math.floor(Math.random() * 1000);
            return request({
                url: _apiBase,
                method: "POST",
                body: JSON.stringify(item),
            });
        });

        return response;
    };

    const createNewOrder = async (body: IMaterial[]): Promise<void> => {
        let response = await body.forEach((item) => {
            item["quantity"] = +item["quantity"];
            item["date"] = new Date().getTime();
            item["id"] = new Date().getTime() + Math.floor(Math.random() * 1000);
            return request({
                url: _apiOrder,
                method: "POST",
                body: JSON.stringify(item),
            });
        });

        return response;
    };

    return {
        getAvailableMaterials,
        createNewOrder,
        getMaterials,
        createNewMaterial,
        loadingStatus,
    };
};

export default useMaterialsService;
