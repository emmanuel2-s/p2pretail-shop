// import superagentPromise from 'superagent-promise';
// import _superagent, { search } from 'superagent';
// import { notifyError } from './toast';

// const superagent = superagentPromise(_superagent, global.Promise);

// export const INITIAL_API_ROOT = "https://p2pbackend.herokuapp.com/api/v1/";

// let token = null;
// const responseBody = res => res.body;

// const getAuthToken = () => {
//   const auth = JSON.parse(window.localStorage.getItem('oldAuth'));
//   const token = auth ? auth.token : null;
//   return token;
// }

// export const tokenPlugin = req => {
//   req.set('Accept', 'application/json');
//   token = getAuthToken();

//   if (token) {
//     req.set('Authorization', `Bearer ${token}`);
//   }

//   req.on('error', (error) => {
//     if (error.status === undefined) {
//       //
//     }

//   });

//   req.on('response', function (res) {
//     if (res.status === 401) {
//       // redirect to login page here
//       window.location.href = `${window.location.origin}/`;
//     }
//     if (res.body.error) {
//       notifyError(res.body.errorMessage);
//     }

//     if (res.body?.message && Array.isArray(res.body.message) && res.body.message.length > 0) {
//       notifyError(res.body.message.join(", "));
//     }
//   });

// }

// const initialRequests = {
//   del: url =>
//     superagent.del(`${INITIAL_API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
//   get: url =>
//     superagent.get(`${INITIAL_API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
//   put: (url, body) =>
//     superagent.put(`${INITIAL_API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
//   post: (url, body) =>
//     superagent.post(`${INITIAL_API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
//   patch: (url, body) =>
//     superagent.patch(`${INITIAL_API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
// };

// const Auth = {
//   saveAuthData: (_user) => {
//     window.localStorage.setItem('oldAuth', JSON.stringify(_user));
//     token = _user.token;
//   },
// }


// const LiveData = {
//   initialLogin: (email, password) =>
//     initialRequests.post('auth/login', { email, password }),
//   viewUser: (id) =>
//     initialRequests.get(`user/${id}`),
//   getAllProduct: (page, limit, search) =>
//     initialRequests.get(`businessProduct?page=${page}&limit=${limit}&search=${search}`),
//   getAllCatergory: (page, limit, search) =>
//     initialRequests.get(`productFunctionalCategory?search=${search}&page=${page}&limit=${limit}`),
//   getAllProductMeasure: (page, limit, search) =>
//     initialRequests.get(`productPack?page=${page}&limit=${limit}&search=${search}`),
//   makereceipttrue: () =>
//     initialRequests.patch(`recieptNote/updatePooled/onLocalInitialSetup`)
// }

// const api2 = {
//   Auth,
//   LiveData
// }

// export default api2;
