class GenUtil {
    static accessToken = '';

    static getAccessToken() {
        return localStorage.getItem('token') || this.accessToken || '';
    }

    static setAccessToken(token) {
        localStorage.setItem('token', token);
        this.accessToken = token;
    }

    static removeAccessToken(token) {
        localStorage.setItem('token', token);
        this.accessToken = token;
    }

    static getHeaders() {
        return {
            token: GenUtil.getAccessToken()
        };
    }

    // static isAdmin(loggedUser) {
    //     return loggedUser.role && loggedUser.role === RolesEnum.ADMIN
    // }
}

export default GenUtil;
