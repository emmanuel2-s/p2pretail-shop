import api from './api';

export default function Test(response) {

    if (response) {
        const catergories = JSON.parse(window.localStorage.getItem('catergories'));
        const getProduct = async () => {
            try {
                const response = await api.productFunctionalCategory.saveOld(catergories.data);
            }
            catch (error) {
                console.log(error)
            }

        };
        getProduct()

    }

}
