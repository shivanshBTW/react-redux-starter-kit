import GenUtil from '../util/GenUtil';
import APIServices from './serviceHelpers/APIServices';
import {getHost} from '../constants';
import APIPath from '../lib/APIPath';

class userService {
    static async login(data) {
        const axiosConfig = {
            url: `${getHost()}${APIPath.loginPath}`,
            method: 'POST',
            crossDomain: true,
            dataType: 'json',
            headers: GenUtil.getLoginHeaders(),
            cache: false,
            processData: false,
            data: data,
        };
        let sr = await APIServices.request(axiosConfig);
        if (sr.success) {
            GenUtil.setAccessToken(sr.data);
        }
        return sr;
    }

    static async logout() {
        const axiosConfig = {
            url: `${getHost()}${APIPath.logoutPath}`,
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

export default userService
