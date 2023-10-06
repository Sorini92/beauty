import { useHttp } from "../hooks/http.hook";

import { IUser, ISignInUserData, ICheckUserData } from "../shared/interfaces/appointment.interface";

const useUserService = () => {
    const { loadingStatus, request } = useHttp();

    const _apiBase = "http://localhost:3001/users";

    const getUser = async (user: ISignInUserData): Promise<IUser> => {
        let res = await request({ url: `${_apiBase}?name=${user.name}` });

        return res[0];
    };

    const checkUser = async (token: string): Promise<ICheckUserData | null> => {
        let res = await request({ url: `${_apiBase}?token=${token}` });

        return res[0];
    };

    const addUser = async (user: ISignInUserData): Promise<string | null> => {
        let userObj = { ...user, id: new Date().getTime(), token: new Date().getTime() };
        return await request({
            url: _apiBase,
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
