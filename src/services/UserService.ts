import { useHttp } from "../hooks/http.hook";
import { _apiUser } from "../config/api.config";

import { IUser, ISignInUserData, ICheckUserData } from "../shared/interfaces/appointment.interface";

const useUserService = () => {
    const { loadingStatus, request } = useHttp();

    const getUser = async (user: ISignInUserData): Promise<IUser> => {
        let res = await request({ url: `${_apiUser}?name=${user.name}` });

        return res[0];
    };

    const checkUser = async (token: string): Promise<ICheckUserData | null> => {
        let res = await request({ url: `${_apiUser}?token=${token}` });

        return res[0];
    };

    const addUser = async (user: ISignInUserData): Promise<string | null> => {
        let userObj = { ...user, id: new Date().getTime(), token: new Date().getTime() };
        return await request({
            url: _apiUser,
            method: "POST",
            body: JSON.stringify(userObj),
        });
    };

    return {
        getUser,
        addUser,
        checkUser,
        loadingStatus,
    };
};

export default useUserService;
