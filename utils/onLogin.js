import api from "./api";
// import bycrpt from 'bcryptjs';
import dbDatas from "../localstoredb";
import { notifyError, notifySuccess } from "./toast";

export async function onLogin(payload, setLoading, data) {
    try {
        if (payload.email) {
            if (payload?.email === "administrator@p2pretail.com") {
                setLoading(true)
                api.Auth.saveAdminAuthData(payload);
                window.location.href = `${window.location.origin}/admin/businesslist`;
            } else {
                if (payload) {
                    window.sessionStorage.setItem('auth', JSON.stringify(payload));
                    window.location.href = `${window.location.origin}/offlineshop`;
                    setLoading(false)
                } else {
                    setLoading(true)
                    // const lastAccessedUrl = localStorage.getItem("lastAccessedUrl");
                    // if (lastAccessedUrl !== null) {
                    //     window.location.href = `${window.location.origin}${lastAccessedUrl}`;
                    // } else {
                    const re = api.Auth.saveAuthData(payload);
                    localStorage.setItem('ÁuthData', JSON.stringify(re))
                    // const user = JSON.parse(sessionStorage.getItem("auth"));
                    // const response = await api.User.view(user.userId);
                    // const use = response.data
                    // const payload2 = {
                    //     createdBy: new Date(),
                    //     createdOn: new Date(),
                    //     email: user.email,
                    //     password: data.password,    //bycrpt.hashSync(data.password, 10),
                    //     fullName: user.fullName,
                    //     role: user.role,
                    //     // phoneNumber: use.phoneNumber,
                    //     businessName: user.businessName,
                    //     businessCode: user.businessCode,
                    //     businessId: use.businessId,
                    //     p2pAdmin: user.p2pAdmin
                    // }
                    window.location.href = `${window.location.origin}/offlineshop`;
                    // dbDatas.userRegistration(payload2, callback)
                    // function callback(r) {
                    //     setLoading(false);
                    //     if (r === 'success') {
                    //         notifySuccess("Account created successfully")
                    //         setLoading(false);
                    //         window.location.href = `${window.location.origin}/retailshop`;
                    //         // } else if (r.error) {
                    //     } else if (r = "error:undefined") {
                    //         setLoading(false);
                    //         return notifyError(r)
                    //         //     // } else {
                    //         //     //     alert(r)//REMOVE THE ALERT AND ADD THE TOASTER
                    //     }
                    // }
                }

                // }
            }
        }
    }
    catch (error) {
        console.log(error);
        setLoading(false)
    }

}
