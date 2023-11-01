import { useHttp } from "../hooks/http.hook";
import { IMaterial, IAvailableMaterials } from "../shared/interfaces/appointment.interface";
import { _apiAvailableMaterials, _apiOrder, _apiMaterials } from "../config/api.config";

const useMaterialsService = () => {
    const { loadingStatus, request } = useHttp();

    const getMaterials = async (): Promise<IMaterial[]> => {
        const res = await request({ url: _apiMaterials });

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
                url: _apiMaterials,
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
