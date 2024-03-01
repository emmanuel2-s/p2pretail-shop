import { useState } from "react";
import api from "./api";
import api2 from "./api2";
import { notifySuccess } from "./toast"

export async function LiveSignin(payload) {
    // await api.Auth.saveAuthData(payload.data);
    window.localStorage.setItem('oldAuth', JSON.stringify(payload.data));
    const data = payload.data
    let users = {}
    let catergories = {}
    let products = {}
    if (data) {
        const getUser = async () => {
            const loadUser = await api2.LiveData.viewUser(data?.id);
            window.localStorage.setItem('user', JSON.stringify(loadUser.data));
            const user = (loadUser.data)
            users = JSON.parse(window.localStorage.getItem('user'));
            const password = (window.localStorage.getItem('password'));
            payload = {
                email: user.email,
                fullName: user.fullName,
                businessId: user.businessId,
                id: user.id,
                locationId: user?.location?.id,
                businessName: user?.business?.businessName,
                businessAddress: user?.business?.businessAddress,
                businessCode: user?.business?.businessCode,
                premiseLicense: user?.business?.premiseLicense,
                pcnNo: user?.business?.pcnNo,
                phoneNumber: user.phoneNumber ? user.phoneNumber : user?.business?.businessPhone,
                businessLogo: user.businessLogo,
                premiseLicense: user.premiseLicense,
                password: password,
                confirmPassword: password,
                p2pAdmin: true
            }
            const r = api.Auth.registerOld((payload));
            window.localStorage.removeItem('password')
        };
        getUser()
    }

    // const user = users
    // if (user) {
    //     const getProductCatergory = async () => {
    //         const loadCatergory = await api2.LiveData.getAllCatergory(1, 2000, "");
    //         window.localStorage.setItem('catergories', JSON.stringify(loadCatergory.data));
    //         const proCat = (loadCatergory.data)
    //         catergories = JSON.parse(window.localStorage.getItem('catergories'));
    //     };
    //     getProductCatergory()
    // }

    // const cat = catergories
    // if (cat) {
    //     const getProduct = async () => {
    //         const loadProduct = await api2.LiveData.getAllProduct(1, 30, "");
    //         window.localStorage.setItem('products', JSON.stringify(loadProduct.data));
    //         const pro = (loadProduct.data)
    //         products = JSON.parse(window.localStorage.getItem('products'));
    //         await api2.LiveData.makereceipttrue()

    //     };
    //     getProduct()
    // }
}