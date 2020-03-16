import GenUtil from "../util/GenUtil";
import APIServices from "./APIServices";
import {HOST} from "../constants";
import APIPath from "../lib/APIPath";

class UserService {
    static async login(data) {
        const axiosConfig = {
            url: `${HOST}${APIPath.loginPath}`,
            method: 'POST',
            crossDomain: true,
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: false,
            processData: false,
            data: JSON.stringify(data),
        };
        // console.log(axiosConfig.url);
        let sr = await APIServices.request(axiosConfig);
        // console.log(sr);

        if (sr.success) {
            GenUtil.setAccessToken(sr.data);
        }
        return sr;
    }

    static async logout() {
        const axiosConfig = {
            url: `${HOST}${APIPath.logoutPath}`,
            method: 'POST',
            crossDomain: true,
            dataType: 'json',
            headers: await GenUtil.getHeaders(),
            cache: false,
            processData: false,
            data: JSON.stringify({
                'device_token': await GenUtil.getFCMToken(),
            }),
        };
        // console.log(axiosConfig)
        let sr = await APIServices.request(axiosConfig);
        if (sr.success) {
            GenUtil.removeAccessToken()
            GenUtil.removeFCMToken();
        }
        return sr;
    }
}

export default UserService
