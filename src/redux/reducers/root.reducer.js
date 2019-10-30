import InitialState from "../states/initial.state";
import IReduxAction from "../../models/interface/IReduxAction";
import ReduxActionEnum from "../../models/enums/ReduxActionEnum";

const RootReducer = (state = InitialState, action) => {
    switch (action.type) {
        case ReduxActionEnum.LOGIN_ACTION:
            break;

        default:
            return state;
    }


}
