import ServiceResponse from "./service.response";
import GenderEnum from "../models/enums/GenderEnum";

const dummyUser = [];

class UserService {
    static async login(email, password) {
        // todo make an api call or use dummy data;
        const user = {name: 'A', email, gender: GenderEnum.MALE};
        if (email === password)
            return ServiceResponse.success({...user, jwt: "token"});
        else return ServiceResponse.error("Invalid credentials")


    }


    static async register({email, password, name, gender}) {
        // todo, either make api call or use dummy data to save/retrieve/update date
        dummyUser.push({email, name, gender});
        return ServiceResponse.success({email, name, gender})
    }
}
