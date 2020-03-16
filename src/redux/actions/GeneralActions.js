import ReduxActionEnum from '../../models/enums/ReduxActionEnum';

let GeneralActions = {
   loginUser: userDetails => {
      return {
         type: ReduxActionEnum.LOGIN_ACTION,
         payload: userDetails,
      };
   },

   logoutUser: () => {
      return {
         type: ReduxActionEnum.LOGOUT_ACTION,
         payload: {},
      };
   },
};

export default GeneralActions;
