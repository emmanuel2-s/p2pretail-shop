// import superagentPromise from 'superagent-promise';
// import _superagent, { patch, search } from 'superagent';
// import { notifyError } from './toast';

// const superagent = superagentPromise(_superagent, global.Promise);

// export const API_ROOT = "http://localhost:4000/api/";
// export const INITIAL_API_ROOT = "http://localhost:4000/";
// export const API_ROOT = process.env.REACT_APP_API_URL;
// export const INITIAL_API_ROOT = process.env.REACT_APP_INITIAL_API_URL;

// export const API_ROOT = "https://b4ab-102-89-23-211.ngrok-free.app/api/";
// export const INITIAL_API_ROOT = "https://b4ab-102-89-23-211.ngrok-free.app/";

//TEST SERVER
// export const API_ROOT = "https://p2pinventory.onrender.com/api/"
// export const INITIAL_API_ROOT = "https://p2pinventory.onrender.com/"

// LIVE SERVER 
export const API_ROOT = "https://p2p-inventory.onrender.com/api/";
export const INITIAL_API_ROOT = "https://p2p-inventory.onrender.com/api/";
let token = null;
const responseBody = (res) => res.body;

// const getAuthToken = () => {
//   const auth = JSON.parse(window.sessionStorage.getItem('auth'));
//   const auth2 = auth ? auth : JSON.parse(window.localStorage.getItem('oldAuth'));
//   const token = auth2 ? auth2.token : null;
//   return token;
// }

const getAuthToken = () => {
  const auth = JSON.parse(window.sessionStorage.getItem('auth'));
  const token = auth ? auth.token : null;
  return token;
}

export const tokenPlugin = req => {
  req.set('Accept', 'application/json');
  token = getAuthToken();

  req.set("ngrok-skip-browser-warning", true)

  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }

  req.on('error', (error) => {
    // if (error.status === undefined) {
    //
    alert(error)
    // }

  });

  req.on('response', function (res) {
    if (res.status === 401) {
      // redirect to login page here
      window.sessionStorage.removeItem('auth')
      token = null;
      // localStorage.setItem("lastAccessedUrl", window.location.pathname);
      window.location.href = `${window.location.origin}/signin`;
    }
    if (res.body.error) {
      notifyError(res.body.errorMessage);
    }

    if (res.body?.message && Array.isArray(res.body.message) && res.body.message.length > 0) {
      notifyError(res.body.message.join(", "));
    }
  });

}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    fetch.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  patch: (url, body) =>
    superagent.patch(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

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

const Auth = {
  initialLogin: (email, password) =>
    requests.post('auth/initial/login/pharm/top', { email, password }),
  logError: (data) =>
    requests.post('log/error', { data }),
  isAuth: () => {
    const token = getAuthToken();
    return !!token;
  },
  saveAdminAuthData: (_user) => {
    window.sessionStorage.setItem('auth', JSON.stringify(_user));
    token = _user.token;
  },
  saveAuthData: (_user) => {
    window.sessionStorage.setItem('auth', JSON.stringify(_user));
    const Selectedlocation = { locationId: _user?.location[0]?.id, locationName: _user?.location[0]?.locationName }
    window.localStorage.setItem("selectedLocation", JSON.stringify(Selectedlocation));
    token = _user.token;
  },

  logout: () => {
    window.sessionStorage.removeItem('auth')
    token = null
  },

  currentUser: () => JSON.parse(window.sessionStorage.getItem('auth')),

  isP2pAdmin: () => {
    const user = Auth.currentUser();
    return user.p2pAdmin === true
  },
  notP2pAdmin: () => {
    const user = Auth.currentUser();
    return user.p2pAdmin === false
  },
  verification: () =>
    requests.get('auth/getanyuser'),
  login: (email, password) =>
    requests.post('auth/login', { email, password }),
  register: (data) =>
    requests.post('auth/signup', data),
  registerOld: (data) =>
    requests.post('auth/signupOld', data),
  verifyEmailToken: token =>
    requests.get(`auth/verify-email/${token}`),
  verifyPasswordToken: token =>
    requests.get(`auth/valid-password-token/${token}`),
  forgotPassword: (email) =>
    requests.get(`auth/forgot-password/${email}`),
  changePassword: (data) =>
    requests.post(`auth/changepassword/new`, data),
  changePasswordNew: (data) =>
    requests.post(`auth/change/password/first/login/new`, data),
  resetPassword: (data) =>
    requests.post(`auth/resetpassword`, data),
  sendResetToken: (email) =>
    requests.post(`auth/password/email`, { email })
}

const StockBalances = {
  load: (page, limit, search, locationid) =>
    fetch.get(`stockbalance?locationId=${locationid}&page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`),
  loadstore: (page, limit, search, locationid, summed) =>
    requests.get(`stockbalance/new/stock/balance/wen/liater/pohs/wit/payload/balance/${summed}?locationId=${locationid}&page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`),
  sync: (password) =>
    requests.post(`stockBalance/${password}`),
  changeBusinessDay: (businessday, locId) =>
    requests.post(`stockBalance/changeBusinessDay/${businessday}/${locId}`),
  getBusinessDay: (locId) =>
    requests.get(`stockbalance/get/business/daylocation/${locId}`),
}

const User = {
  save: (data) =>
    requests.post('auth/create/new/user', data),
  load: (page, limit, search) =>
    requests.get(`auth/get/alluser/?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`),
  view: (id) =>
    requests.get(`auth/get/singleuser/${id}`),
  edit: (id, data) =>
    requests.patch(`auth/edit/user/${id}`, data),
  disable: (id) =>
    requests.patch(`auth/disableuser/${id}`),
  enable: (id) =>
    requests.patch(`auth/enableUser/${id}`),
}

const StockSales = {
  syncSales: (data) =>
    requests.post(`stocksales/syncsales`, data)
}

const api = {
  Auth,
  StockBalances,
  User,
  StockSales,
}

export default api;
