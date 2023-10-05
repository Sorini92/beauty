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

    return {
        getUser,
        checkUser,
        loadingStatus,
    };
};

export default useUserService;
