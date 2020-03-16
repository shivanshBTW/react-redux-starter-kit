class RoutePath {
   static addUserPath = '/user/add';
   static editUserPath = (id = ':id') => `/user/edit/${id}`;
   static viewUserPath = (id = ':id') => `/user/view/${id}`;
   static userListPath = `/user`;

   static signupPath = '/signup';
   static loginPath = '/login';
   static logoutPath = '/logout';
   static homePath = "";

   static navigateTo(props, path) {
      props.history.push(path);
   }
}

export default RoutePath;
