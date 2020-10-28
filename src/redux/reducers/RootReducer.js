import GeneralReducer from "./GeneralReducer";
import {combineReducers} from "redux";
import SettingsReducer from "./SettingsReducer";

const RootReducer = combineReducers({
   GeneralReducer,
   SettingsReducer
})

export default RootReducer;