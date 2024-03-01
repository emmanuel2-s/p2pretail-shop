let setLoading = false;
let setLoadingSync = false;
let setShow = false;
let SelLocation = [];
let items = [];
const pendingCustomers = [];
let nameStorage;
let setInfo = [];
let cartItems = [];
let setChildDetails = [];
let setPhoneError = false;
// console.log(cartItems)
const getBusiness = JSON.parse(sessionStorage.getItem("auth"));
const locationDetails = JSON.parse(localStorage.getItem('locationDetails'));
let os = '';
let receipt = {};
let customers = [];
let productes = [];
let shopInfo = {
    // stocksaleGuid: uuidv4(),
    totalAmount: 0,
    itemTotal: 0,
    comment: "",
    customerPhone: "",
    customerName: "",
};

const formatter1 = new Intl.NumberFormat('en-NI', {
    minimumFractionDigits: 2
});

const regex = {
    phoneNumber: /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/,
    email: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
    website: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-]*)?\??(?:[-\+=&;%@.\w]*)#?(?:[\w]*))?)/,
};

document.addEventListener('DOMContentLoaded', loadAll = async () => {
    try {
        const check = getOperatingSystem(window);
        os = check;


        const getProducts = JSON.parse(localStorage.getItem("products"));
        if (getProducts) {
            const pr = getProducts?.sort((a, b) => a.productName?.localeCompare(b.productName));
            productes = pr;
        }
        productes = getProducts


        const getCustomers = JSON.parse(localStorage.getItem("pendingCustomers"));
        if (getCustomers) {
            customers = getCustomers
        }
        if (getCustomers?.length === 0) {
            localStorage.removeItem('pendingCustomers')
        }

        const cart = JSON.parse(localStorage.getItem("shopItems"));
        cartItems = cart;

    }
    catch (error) {
        console.log(error)
    }

});

window.addEventListener('load', () => {

    const interval = setInterval(() => {
        let pushresult = [];
        const userLoc = JSON.parse(localStorage.getItem('locationId')) || [];
        const response = JSON.parse(localStorage.getItem('Sales'))
        if (response) {
            if (response && response?.length > 0) {
                const finalArray = [];

                for (const t of response) {
                    let PooledStocksaleDto = {
                        stockSaleDetails: [],
                        businessName: '',
                        fullName: '',
                        totalAmount: '',
                        transactionDate: '',
                        comment: '',
                        customerPhone: '',
                        customerName: '',
                        paymentMode: '',
                        itemTotal: '',
                        businessCode: '',
                        locationId: '',
                        documentNo: ''
                    }
                    PooledStocksaleDto.businessName = t.businessName;
                    PooledStocksaleDto.fullName = t.fullName;
                    PooledStocksaleDto.totalAmount = t.totalAmount;
                    PooledStocksaleDto.transactionDate = t.transactionDate;
                    PooledStocksaleDto.comment = t.comment;
                    PooledStocksaleDto.customerPhone = t.customerPhone;
                    PooledStocksaleDto.customerName = t.customerName;
                    PooledStocksaleDto.paymentMode = t.paymentMode;
                    PooledStocksaleDto.itemTotal = t.itemTotal;
                    PooledStocksaleDto.businessCode = t.businessCode;
                    PooledStocksaleDto.locationId = userLoc;
                    PooledStocksaleDto.documentNo = t.documentNo;

                    let childDetails = []
                    for (const m of t?.stockSalesDetails) {
                        let child = {
                            productName: m.productName,
                            productId: m.productId,
                            measurmentId: m.measurmentId,
                            measurment: m.measureName,
                            orderedQuantity: m.orderedQuantity,
                            dosage: m.dosage,
                            unitPrice: m.unitPrice,
                            extendedPrice: m.extendedPrice
                        }
                        childDetails.push(child)
                    }
                    PooledStocksaleDto.stockSaleDetails = childDetails;

                    finalArray.push(PooledStocksaleDto)
                }

                const payload = {
                    pooledStocksale: finalArray
                }
                // console.log('ddddd', payload)
                const pushSales = async () => {
                    const user = JSON.parse(sessionStorage.getItem('auth'))
                    if (navigator.onLine) {
                        const response = await fetch('https://p2p-inventory.onrender.com/api/stocksales/syncsales', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user.token}`
                            },
                            body: JSON.stringify(payload)
                        })
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const resData = await response.json();
                        console.log('res', resData)
                        const dataResult = resData?.data;
                        if (dataResult.length > 0) {
                            console.log(dataResult)
                            const getsale = JSON.parse(localStorage.getItem('Sales'))
                            if (dataResult.length === getsale.length) {
                                getsale.length = 0;
                                localStorage.setItem('Sales', JSON.stringify(getsale));
                            } else {
                                let d;
                                for (const f of payload.pooledStocksale) {
                                    if (dataResult?.some(x => x.docNo === f.documentNo)) {
                                        d = getsale?.filter(x => x.documentNo !== f.documentNo)
                                        localStorage.setItem('Sales', JSON.stringify(d));
                                    }

                                }
                                console.log(d);
                            }

                        }
                    }
                }
                pushSales()
            }


        }
    }, 120000)
    return () => clearInterval(interval)
});


document.addEventListener('DOMContentLoaded', productsItemss = () => {
    // function productsItems() {
    var html = ''
    // console.log('thy', productes)

    productes?.map((pro, index) => {
        html += '<tr style=" cursor: pointer">'
        html += `
                    <td>
                        <button type="button" class="btn btn-primary btn-rounded btn-icon" id="add" style=" width: 35px; height: 35px; cursor: pointer"
                            onclick="addToCart('${index}')"
                        >
                            <i class="ti-plus mr" class='mr' title="Add" ></i>
                        </button>
                    </td>
                    <td class=""> ${index + 1}</td>
                    <td class=" text-left">
                        <div class="">
                            <div class="">

                                <span class="ml-1 text-capitalize text-wrap" style=" width: 350px">${pro?.productName}</span>
                            </div>
                        </div>
                    </td>

                    <td class="text-capitalize">
                        <span>${pro?.measureName}</span>
                    </td>

                    <td class="text-left">
                        <input type="number" onChange="handleOnChangeMeasure(event, ${index})" class="form-control form-control-sm ind${index}" name="quantity" style="width: 70px" id="orderQuantity1" min="1"
                         value="1"
                        />
                    </td>
                    <td class="text-left">
                        <input type="text" onChange="handleOnChangeMeasure(event, ${index})"
                            class="form-control form-control-sm ind${index}"
                            name="dosage" style=" width: 100px" id="dosage"
                        />
                    </td>
                    <td class="text-right">
                        &#8358; ${formatter1.format(pro?.sellingPrice)}
                    </td>
                    <td class="text-center">
                        ${pro?.avaQuantity}
                    </td>

        `
        html += '</tr>'

    })

    var text = ''
    if (productes) {
        document.getElementById('productsTable').innerHTML = html;

    } else {
        text += `<strong class='text-muted text-center mx-auto h5'>No product found</strong>`
        document.getElementById('row').innerHTML = text;
    }

}
);
// document.load = productsItemss();


document.addEventListener('DOMContentLoaded', orderDetails = () => {
    var textDisplay = `     
    <div class="d-flex align-items-center mb-2 ms-2">
    <i class="ti-shopping-cart" style=" margin-right: 3px; font-size: 22px; font-weight:bold; margin-top: 2px;" ></i>
    <p class="card-title mb-0 text-left fs-5">Cart 
    ${`<span>(${cartItems?.retailShopDetails?.length ? cartItems?.retailShopDetails?.length : 0})</span>`}</p>
    </div>                           

        <ul class="list-group list-group-flush ms-2" style = ${cartItems?.retailShopDetails?.length > 10 ? tableStyle : {}}>
        
        ${!cartItems?.retailShopDetails ? '' : cartItems?.retailShopDetails?.map((order, i) =>
        `<li class="list-group-item d-flex align-items-center justify-content-between">
    <div class="d-flex flex-column align-items-start">
        <div class="mb-auto text-capitalize">
            ${order?.productName}(${order?.measureName})
        </div>
        <div class='d-flex align-items-center'>
         <i class="ti-trash" style="color: red; font-size:18px; cursor:pointer" onclick="deleteLineItem(${i})"></i>
         <span class="ml-3">${order?.dosage ? order?.dosage : ''}</span>
        </div>
    </div>
    <div class="d-flex flex-column align-items-end">
        <div class="mb-auto">&#8358; ${formatter1.format(order?.extendedPrice)} </div>
        <div class="d-flex align-items-center">
            <button type="button" class="btn btn-primary btn-rounded btn-icon removeBtn${i}" id="removeBtn" onclick="removeQuantity(${i})" style=" width: 25px; height: 25px; cursor: pointer">
                <i class="ti-minus" style="font-size:18px; color:white;"></i>
            </button>
            <input type="number" onChange="handleOnChangeOrder(event,${i})" class="form-control form-control-sm mt-1 mx-1 in${i}" name="orderQuantity" style="height: 30px; width: 50px" id="orderQuantity"
                value=${order?.orderedQuantity} min="1"
            />
            <button type="button" class="btn btn-primary btn-rounded btn-icon addBtn${i}" id="addBtn" onclick="addQuantity(${i})" style=" width: 25px; height: 25px; cursor: pointer">
                <i class="ti-plus" style="font-size:18px; color:white;"></i>
            </button>
        </div>
    </div>
</li>`
    )}
     </ul>

    <div class="mt-2 px-3">
        <span class="float-right">Total: ${cartItems?.itemTotal ? cartItems?.itemTotal : 0} </span>
        <button type="button" class="btn btn-primary btn-block rounded"

            onclick="validateOrderQuantity()"
            data-toggle="modal"
            data-target="#paymentModal"
        ><span style="padding-top:4px; font-size:18px">&#8358;${formatter1.format(cartItems?.totalAmount ? cartItems?.totalAmount : 0)}</span>
            <i class="ti-angle-right" style="float:right; color:white; font-size:18px"></i>
        </button>
    </div>      
    ${customers.length === 0 ? '' : customers?.length > 0 &&
            `    <div class="form-group mt-5 mx-2" id="customers">
                  <p class="card-title mb-2 float-left">Saved Orders</p>

                  <select
                    class="form-control text-capitalize"
                    id="pendingCustomers"
                    name="pendingCustomers"
                    onChange="handleOnChangeCustomers(event.target.value)"
                  >
                    <option value="">Select Customer</option>
                    ${customers?.map((cus, index) => (
                `<option value="${cus?.name}">${cus?.name}</option>`
            ))}
                  </select>
                </div>`
        }

`
    document.getElementById('orderD').innerHTML = textDisplay;
});
// document.load = orderDetails();


const tableStyle = {
    overflowY: "scroll",
    maxHeight: "300px",
    minHeight: "300px"
};

const handlePrint = () => {
    printJS('receipt', 'html')
};


let keyWord = '';
const searchProduct = (value) => {
    keyWord = value;
    const prods = JSON.parse(localStorage.getItem('products'));
    const findProd = prods?.filter(e => e.productName.trim().toLowerCase().includes(keyWord.trim()));
    if (findProd) {
        productes = findProd;
        productsItemss(productes)
    } else {
        productes = prods?.sort((a, b) => a.productName.localeCompare(b.productName));
    }
};

const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "customerPhone") {
        if (value && !value.match(regex.phoneNumber)) {
            setPhoneError = true;
        } else {
            setPhoneError = false;
        }
    }
    shopInfo = {
        ...shopInfo,
        [name]: value ?? JSON.parse(value),
    }
}

const handleOnChangeLater = (e) => {
    const { name, value } = e.target;
    setInfo = {
        ...setInfo,
        [name]: value ?? JSON.parse(value),
    }
}


const handleOnChangeMeasure = (e, index) => {
    const { name, value } = e.target;
    const obj = {};
    obj[name] = value;
    obj['index'] = index;
    setChildDetails = [...setChildDetails, obj]
    if (name === "measurementId") {
        const x = productes[index];
        const measure = x?.measure.find(y => y.measurementId === value);

        x.sellingPrice = measure.sellingPrice
        // x.costPrice = measure.costPrice
        x.quantity = measure.quantity
        x.measureId = measure.measurementId
        x.measureName = measure.measurmentName
        x.parentMeasure = measure.parentMeasure
    }
    if (name === "quantity") {
        const x = productes[index];
        if ((parseInt(value) > x?.parentMeasure) && (x?.parentMeasure !== 0)) {
            // document.querySelector(`.ind${index}`).value = "";
            document.querySelectorAll(`.in${index}`)[0].value = "";
            document.querySelectorAll(`.in${index}`)[1].value = "";
            return $.notify("Please select the parent measure", 'error')
        }
        x.orderedQuantity = parseInt(value)
    }
    if (name === "dosage") {
        const x = productes[index];
        x.dosage = value
    }
}



const handleOnChangeOrder = (e, index) => {
    if (Number(e.target.value < 1)) {
        document.querySelector(`.in${index}`).value = 1;
    }
    let currentOrder;
    const itemInLocal = JSON.parse(localStorage.getItem("shopItems"));
    const itemEditing = itemInLocal.retailShopDetails[index];
    if (e.target.value === "") {
        currentOrder = 1
    } else {
        currentOrder = e.target.value
    }

    // const x = products.find(y => y.measurementId === itemEditing?.measurmentId);
    const prod = productes.find(y => y.productId === itemEditing?.productId);

    const extendedPrice = Number(itemEditing.extendedPrice);
    const totalAmount = Number(itemInLocal.totalAmount);
    const itemTotal = Number(itemInLocal.itemTotal);

    itemEditing.extendedPrice = extendedPrice + ((Number(currentOrder) * Number(itemEditing.unitPrice)) - (Number(itemEditing.orderedQuantity) * (itemEditing.unitPrice)));
    itemInLocal.totalAmount = totalAmount + ((Number(currentOrder) * Number(itemEditing.unitPrice)) - (Number(itemEditing.orderedQuantity) * Number(itemEditing.unitPrice)));
    itemInLocal.itemTotal = itemTotal + (Number(currentOrder) - Number(itemEditing?.orderedQuantity));
    itemEditing.orderedQuantity = Number(currentOrder);

    localStorage.setItem("shopItems", JSON.stringify(itemInLocal))
    const cart = JSON.parse(localStorage.getItem("shopItems"));
    cartItems = cart;
    window.location.reload()
}

const Cancel = () => {
    window.location.reload()
}

const logout = () => {
    window.sessionStorage.removeItem('auth')
    // token = null
    window.location.reload()
    window.location.href = './signin/login.html'
}

const cancelSale = async () => {
    localStorage.removeItem("shopItems");
    window.location.reload()

}

const verifyAuth = () => {
    const getAuth = JSON.parse(sessionStorage.getItem('auth')) || [];
    if (getAuth.length < 1) {
        window.location.reload()
        window.location.href = './signin/index.html'
    }
}

const saveForLater = (value) => {
    setLoading = true;
    const obj = {
        name: value
    }
    nameStorage = JSON.parse(localStorage.getItem("pendingCustomers"));
    if (nameStorage === null) {
        nameStorage = []
    } else {
        nameStorage = JSON.parse(localStorage.getItem("pendingCustomers"));
    }
    nameStorage.push(obj);
    localStorage.setItem("pendingCustomers", JSON.stringify(nameStorage));

    const shopItems = JSON.parse(localStorage.getItem("shopItems"));
    localStorage.setItem(value, JSON.stringify(shopItems));
    setTimeout(() => {
        localStorage.removeItem("shopItems");
        window.location.reload();
    }, 500);
}


const handleOnChangeCustomers = (value) => {
    const order = JSON.parse(localStorage.getItem(value));
    localStorage.setItem("shopItems", JSON.stringify(order));
    const shopItems = JSON.parse(localStorage.getItem("shopItems"));
    cartItems = shopItems;
    localStorage.removeItem(value);

    const getCustomers = JSON.parse(localStorage.getItem("pendingCustomers"));
    const getSingleCus = getCustomers.find(x => x.name === value)
    let index = getCustomers.indexOf(getSingleCus);

    getCustomers.splice([index], 1);
    localStorage.setItem("pendingCustomers", JSON.stringify(getCustomers));
    const getCus = JSON.parse(localStorage.getItem("pendingCustomers"));
    if (getCus) {
        cartItems = getCus;
        window.location.reload()
        // console.log(customers)
    } else {
        cartItems = '';
    }
}




const getOperatingSystem = (window) => {
    let operatingSystem = 'Not known';
    if (window.navigator.appVersion.indexOf('Win') !== -1) { operatingSystem = 'Windows OS'; }
    if (window.navigator.appVersion.indexOf('Mac') !== -1) { operatingSystem = 'MacOS'; }
    if (window.navigator.appVersion.indexOf('X11') !== -1) { operatingSystem = 'UNIX OS'; }
    if (window.navigator.appVersion.indexOf('Linux') !== -1) { operatingSystem = 'Linux OS'; }

    return operatingSystem;
}


const printstring = `netopscheme://netop/netopurl/open?data=${getBusiness.businessName}~${moment(receipt.transactionDate).format('MMM D, YYYY hh:mm')}@!${formatter1.format(receipt?.totalAmount)}~${receipt?.DocumentNo}~${receipt.createdBy}~${receipt?.paymentMode}@!${productString}~!printer`

// const scannerstring = `netopscheme://netop/netopurl/open?data=${getBusiness.businessName}~${moment(receipt.transactionDate).format('MMM D, YYYY hh:mm')}@!${formatter1.format(receipt?.totalAmount)}~${receipt?.DocumentNo}~${receipt.createdBy}~${receipt?.paymentMode}@!${productString}~!scanner`


const addQuantity = (index) => {
    const initialValue = document.querySelector(`.in${index}`).value;
    let val = Number(initialValue) + 1
    document.querySelector(`.in${index}`).value = val;

    const itemInLocal = JSON.parse(localStorage.getItem("shopItems"));
    const itemEditing = itemInLocal.retailShopDetails[index];
    const prod = productes.find(y => y.productId === itemEditing?.productId);
    const x = prod?.measure?.find(y => y.measureId === itemEditing?.measureId);

    if (parseInt(val) >= x?.parentMeasure && x?.parentMeasure !== 0) {
        document.querySelector(`.in${index}`).value = x?.parentMeasure;
        //    document.getElementById("orderQuantity1").value = 0;
        val = x?.parentMeasure
        $.notify("Please select the parent measure", 'error')
    }

    // if (Number(val) === Number(itemEditing.quantity)) {
    //     document.querySelector(`.addBtn${index}`).disabled = true;
    // } else {
    //     document.querySelector(`.addBtn${index}`).disabled = false;
    // }

    if (val === 1) {
        document.querySelector(`.removeBtn${index}`).disabled = true;
    } else {
        document.querySelector(`.removeBtn${index}`).disabled = false;
    }

    const extendedPrice = Number(itemEditing.extendedPrice);
    const totalAmount = Number(itemInLocal.totalAmount);
    const itemTotal = Number(itemInLocal.itemTotal);

    itemEditing.extendedPrice = extendedPrice + ((Number(val) * Number(itemEditing.unitPrice)) - (itemEditing.orderedQuantity * itemEditing.unitPrice));
    itemInLocal.totalAmount = totalAmount + ((Number(val) * Number(itemEditing.unitPrice)) - (Number(itemEditing.orderedQuantity) * Number(itemEditing.unitPrice)));
    itemInLocal.itemTotal = itemTotal + (Number(val) - Number(itemEditing?.orderedQuantity));
    // itemEditing.quantity = val;
    itemEditing.orderedQuantity = val;

    localStorage.setItem("shopItems", JSON.stringify(itemInLocal))
    const cart = JSON.parse(localStorage.getItem("shopItems"));
    cartItems = cart;
    window.location.reload()
}

const removeQuantity = (index) => {
    let val;
    const initialValue = document.querySelector(`.in${index}`).value;
    if (Number(initialValue) === 1) {
        return val === 1
    } else {
        val = Number(initialValue) - 1
    }
    document.querySelector(`.in${index}`).value = val;

    const itemInLocal = JSON.parse(localStorage.getItem("shopItems"));
    const itemEditing = itemInLocal.retailShopDetails[index];

    // if (Number(val) === Number(itemEditing.quantity)) {
    //     document.querySelector(`.addBtn${index}`).disabled = true;
    // } else {
    //     document.querySelector(`.addBtn${index}`).disabled = false;
    // }

    if (val === 1) {
        document.querySelector(`.removeBtn${index}`).disabled = true;
    } else {
        document.querySelector(`.removeBtn${index}`).disabled = false;
    }

    const extendedPrice = Number(itemEditing.extendedPrice);
    const totalAmount = Number(itemInLocal.totalAmount);
    const itemTotal = Number(itemInLocal.itemTotal);

    itemEditing.extendedPrice = extendedPrice + ((Number(val) * Number(itemEditing.unitPrice)) - (itemEditing.orderedQuantity * itemEditing.unitPrice));
    itemInLocal.totalAmount = totalAmount + ((Number(val) * Number(itemEditing.unitPrice)) - (Number(itemEditing.orderedQuantity) * Number(itemEditing.unitPrice)));
    itemInLocal.itemTotal = itemTotal + (Number(val) - itemEditing?.orderedQuantity);
    // itemEditing.quantity = val;
    itemEditing.orderedQuantity = val;

    localStorage.setItem("shopItems", JSON.stringify(itemInLocal))
    const cart = JSON.parse(localStorage.getItem("shopItems"));
    cartItems = cart
    window.location.reload()

}

const deleteLineItem = (index) => {
    const itemInLocal = JSON.parse(localStorage.getItem("shopItems"));
    const child = itemInLocal.retailShopDetails;
    const itemToDelete = itemInLocal.retailShopDetails[index];

    const totalAmount = Number(itemInLocal.totalAmount);
    const itemTotal = Number(itemInLocal.itemTotal);

    itemInLocal.totalAmount = totalAmount - ((Number(itemToDelete.orderedQuantity) * Number(itemToDelete.unitPrice)));
    itemInLocal.itemTotal = itemTotal - Number(itemToDelete.orderedQuantity);

    child.splice([index], 1);

    localStorage.setItem("shopItems", JSON.stringify(itemInLocal));
    const shopItems = JSON.parse(localStorage.getItem("shopItems"));
    cartItems = shopItems;
    window.location.reload()
}

const synctoOffline = async () => {
    const page = 1;
    // const prod = productsPayload
    let search = '';
    let summed = true;
    let locationId = JSON.parse(localStorage.getItem('locationId'));
    let user = JSON.parse(sessionStorage.getItem('auth'))
    try {
        setLoadingSync = true
        // alert('You are about to update your retail shop. PROCEED?')
        Swal.fire({
            position: 'top',
            title: 'You are about to update your retail shop. PROCEED?',
            confirmButtonText: 'Confirm',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#d33',
            preConfirm: async () => {
                // setLoadingSync(true)
                // const response = await api.StockBalances.loadstore(page, 1000, search, locationId, false)
                const response = await fetch(`https://p2p-inventory.onrender.com/api/stockbalance/new/stock/balance/wen/liater/pohs/wit/payload/balance/${summed}?locationId=${locationId}&page=${page}&limit=${1000}&search=${encodeURIComponent(search)}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const resData = await response.json();

                // .then((res) => {
                const dataResult = resData.data?.data?.data;
                let prod = [];
                if (dataResult.length > 0) {
                    for (const pro of dataResult) {
                        let obj = {
                            productListGuid: pro?.id,
                            productId: pro?.productId,
                            productName: pro?.productName,
                            barcode: pro?.barCode,
                            measureId: pro?.measurementId,
                            measureName: pro?.measurmentName,
                            sellingPrice: pro?.sellingPrice,
                            avaQuantity: parseInt(pro?.quantity),
                            createdOn: new Date(),
                            costPrice: pro?.costPrice,
                            locationId: pro?.locationId
                        }
                        prod.push(obj)
                        // obj = {};

                    }
                    localStorage.setItem('products', JSON.stringify(prod))
                    $.notify('Synced successfully', 'success')
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                    setLoadingSync = false
                } else {
                    setLoadingSync = false
                    return $.notify('No data to sync', 'error')
                }
                // setLoadingSync = false

                // })
            }

        })

    } catch (error) {
        console.error('Error occurred:', error);
        $.notify('Error occurred while syncing data', 'error');
    } finally {
        // Hide loading state after request completes (whether success or error)
        setLoadingSync = false;
    }

};


const addToCart = (index) => {

    const product = productes[index];
    if ((product?.quantity > product?.parentMeasure) && (product?.parentMeasure !== 0)) {
        return $.notify("Please select the parent measure", 'info')
    }
    const output = {};
    output.index = index;
    output.productId = product?.productId;
    output.productName = product?.productName;
    output.measureName = product?.measureName;
    output.measurment = product?.measureName;
    output.measurmentId = product.measureId;
    output.unitPrice = product?.sellingPrice;
    output.quantity = product?.avaQuantity;
    output.orderedQuantity = product?.orderedQuantity ? product?.orderedQuantity : 1;
    output.extendedPrice = (product?.sellingPrice * output.orderedQuantity);
    output.stockSalesId = shopInfo?.stocksaleGuid;
    output.discount = 0
    output.dosage = product?.dosage;

    const shopItems = JSON.parse(localStorage.getItem("shopItems"));
    if (output.orderedQuantity > output.quantity) {
        return $.notify("ordered quantity can not be greater than available quantity", 'error')
    }
    if (output.unitPrice === null) {
        return $.notify("Product price is not set", 'error')
    } else {
        if (shopItems) {
            const checkItem = shopItems.retailShopDetails.find(x => x.measurmentId === product.measureId && x.index === index);
            if (checkItem) {
                const findind = shopItems.retailShopDetails.findIndex(x => x.measurmentId === product.measureId && x.index === index);
                const initialValue = document.querySelector(`.in${findind}`).value;
                let val = Number(initialValue) + Number(output.orderedQuantity)
                if ((val > product?.parentMeasure) && (product?.parentMeasure !== 0)) {
                    // document.querySelector(`.in${ index }`).value = product?.parentMeasure - 1;
                    val = product?.parentMeasure
                    // notifyError("Please select the parent measure")
                }
                document.querySelector(`.in${findind}`).value = val;

                // const val = Number(output.quantity)
                const itemInLocal = JSON.parse(localStorage.getItem("shopItems"));
                // const itemEditing = checkItem;
                const itemEditing = itemInLocal.retailShopDetails[findind];
                const extendedPrice = Number(itemEditing.extendedPrice);
                const totalAmount = Number(itemInLocal.totalAmount);
                const itemTotal = Number(itemInLocal.itemTotal);

                itemEditing.extendedPrice = extendedPrice + ((Number(val) * Number(itemEditing.unitPrice)) - (Number(itemEditing.orderedQuantity) * Number(itemEditing.unitPrice)));
                itemInLocal.totalAmount = totalAmount + ((Number(val) * Number(itemEditing.unitPrice)) - (Number(itemEditing.orderedQuantity) * Number(itemEditing.unitPrice)));
                itemInLocal.itemTotal = itemTotal + (Number(val) - Number(itemEditing?.orderedQuantity));
                // itemEditing.quantity = Number(val);
                itemEditing.orderedQuantity = Number(val);

                let shopItems = JSON.parse(localStorage.getItem('shopItems'))
                if (shopItems === null) {
                    shopItems = [];
                } else {
                    shopItems = JSON.parse(localStorage.getItem('shopItems'))
                }
                shopItems.push(itemInLocal)
                localStorage.setItem("shopItems", JSON.stringify(itemInLocal))
                const cart = JSON.parse(localStorage.getItem("shopItems"));
                cartItems = cart;
            } else {
                if (output.orderedQuantity < 1 || output.orderedQuantity === undefined) {
                    return $.notify("Quantity cannot be empty", 'error')
                }

                if (shopItems?.retailShopDetails.length > 0) {
                    items = [];
                    items.push(...shopItems?.retailShopDetails);
                }
                items.push(output);

                const obj = {
                    totalAmount: 0,
                    itemTotal: 0,
                    comment: "",
                    customerPhone: "",
                    customerName: "",
                    paymentMode: "",
                    locationId: "",
                    retailShopDetails: items
                }

                localStorage.setItem("shopItems", JSON.stringify(obj));
                $.notify("Product added to cart successfully", 'success')
                setTimeout(() => {
                    window.location.reload()

                }, 1000)

                const getItems = JSON.parse(localStorage.getItem("shopItems"));
                const totalAmounts = getItems?.retailShopDetails?.map(x => (Number(x.extendedPrice))).reduce((prev, curr) => prev + curr, 0);
                const totalQty = getItems?.retailShopDetails?.map(x => Number(x.orderedQuantity)).reduce((prev, curr) => prev + curr, 0);
                getItems.totalAmount = Number(totalAmounts);
                getItems.itemTotal = Number(totalQty);

                localStorage.setItem("shopItems", JSON.stringify(getItems));
                const cart = JSON.parse(localStorage.getItem("shopItems"));
                cartItems = cart;
            }
            document.querySelector(`.ind${index}`).value = "";
        } else {
            if (output.orderedQuantity < 1 || output.quantity === undefined) {
                return $.notify("Quantity cannot be empty", 'error')
            }
            if (output.orderedQuantity > output.quantity) {
                return $.notify("ordered quantity can not be greater than available quantity", 'error')
            } else {
                if (shopItems?.retailShopDetails.length > 0) {
                    items = [];
                    items.push(...shopItems?.retailShopDetails);
                }
                items.push(output);

                const obj = {
                    totalAmount: 0,
                    itemTotal: 0,
                    comment: "",
                    customerPhone: "",
                    customerName: "",
                    paymentMode: "",
                    locationId: "",
                    retailShopDetails: items
                }
                localStorage.setItem("shopItems", JSON.stringify(obj));
                $.notify("Product added to cart successfully", 'success')
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                const getItems = JSON.parse(localStorage.getItem("shopItems"));
                const totalAmounts = getItems?.retailShopDetails?.map(x => (Number(x.extendedPrice))).reduce((prev, curr) => prev + curr, 0);
                const totalQty = getItems?.retailShopDetails?.map(x => Number(x.orderedQuantity)).reduce((prev, curr) => prev + curr, 0);
                getItems.totalAmount = Number(totalAmounts);
                getItems.itemTotal = Number(totalQty);

                localStorage.setItem("shopItems", JSON.stringify(getItems));
                const cart = JSON.parse(localStorage.getItem("shopItems"));
                cartItems = cart;
            }
            product.orderedQuantity = "";
            // document.querySelector(`.ind${ index }`).value = "";
            document.querySelectorAll(`.ind${index}`)[0].value = "";
            document.querySelectorAll(`.ind${index}`)[1].value = "";
        }
    }
}


receipt?.stockSalesDetails?.map((detail1) =>
    detail1?.productName + '*3*' + detail1?.quantity + '*3*' + detail1?.extendedPrice
)
var productString = '';

receipt?.stockSalesDetails?.forEach(function (detail) {
    const st = detail?.productName + 'xx' + detail?.quantity + 'xx' + detail?.extendedPrice
    if (st !== undefined) {
        productString += st + "~" + ""
    }

});

const validateOrderQuantity = () => {
    const shopItems = JSON.parse(localStorage.getItem("shopItems"));
    if (!shopItems || shopItems?.retailShopDetails.length === 0) {
        setShow = false;
    } else {
        setShow = true;
    }
}

const selectLoc = (index) => {
    const loc = SelLocation[index]
    // const auth = JSON.parse(sessionStorage.getItem('auth'))
    const locationId = loc.id
    localStorage.setItem('locationId', JSON.stringify(locationId))
    localStorage.setItem('locationDetails', JSON.stringify(loc))
}


window.addEventListener("load", () => {
    locationCheck()
})

const locationCheck = async () => {
    try {
        let location;
        const loc = JSON.parse(sessionStorage.getItem('auth'))
        const check = JSON.parse(localStorage.getItem('locationId'))
        if (!check) {
            location = loc.location
            SelLocation = location;
            document.getElementById('toggleModall').click();
        }

    } catch (error) {
        console.log(error)
    }
}

const doSubmit = async () => {

    const s = []
    const SelLoc = JSON.parse(localStorage.getItem('locationId'));

    const shopItems = JSON.parse(localStorage.getItem("shopItems"));
    const auth = JSON.parse(sessionStorage.getItem("auth"));

    const payload = {
        // stocksaleGuid: shopInfo?.stocksaleGuid,
        totalAmount: shopItems?.totalAmount,
        comment: shopItems?.comment,
        // DocumentNo: ModuleNoGenerator(auth.businessName),
        documentNo: `${Number(Date.parse(new Date()))}`,
        customerPhone: shopItems?.customerPhone,
        customerName: shopItems?.customerName ? shopItems?.customerName : "General Customer",
        paymentMode: shopItems?.paymentMode,
        itemTotal: shopItems?.itemTotal,
        stockSalesDetails: shopItems?.retailShopDetails,
        transactionDate: new Date().toUTCString(),
        authorizedBy: auth.fullName,
        authorizedOn: new Date(),
        authorized: true,
        createdOn: new Date(),
        createdBy: auth.fullName,
        businessName: auth.businessName,
        businessCode: auth.businessCode,
        fullName: auth.fullName,
        locationId: SelLoc.locationId,
        returnStatus: ""
    }

    if (!shopItems) {
        return $.notify("Cart data is empty", 'error')
    }
    try {
        payload.comment = shopInfo.comment;
        payload.customerPhone = shopInfo.customerPhone;
        payload.customerName = shopInfo.customerName ? shopInfo.customerName : "General Customer";
        payload.paymentMode = shopInfo.paymentMode;
        setLoading = true;
        receipt = payload;
        receiptModal(payload)
        // btn(payload)
        if (payload.paymentMode === "cash" || payload.paymentMode === "transfer" || payload.paymentMode === "pos") {
            payload.stockSalesDetails = shopItems?.retailShopDetails;
            payload.pooled = false;
            for (const r of shopItems?.retailShopDetails) {
                if (r.orderedQuantity > r.quantity) {
                    setTimeout(() => {
                        window.location.reload()
                    }, 6000);

                    return $.notify(" You ordered more than the available quantity in one of the products", 'error')
                }
            }
            let Sales;
            if (localStorage.getItem('Sales') === null) {
                Sales = []
            } else {
                Sales = JSON.parse(localStorage.getItem('Sales'))
            }
            Sales.push(payload)
            localStorage.setItem('Sales', JSON.stringify(Sales));
            setLoading = false;
            document.getElementById("closeModal").click();
            document.getElementById("toggleModal").click();

            const getProducts = JSON.parse(localStorage.getItem("products"));
            for (const p of shopItems?.retailShopDetails) {
                // if (p.orderedQuantity > p.quantity) {
                //     notifyError(" You ordered more than the available quantity in one of the products")
                // }
                const newArr = getProducts.map(obj => {
                    if (obj.productId === p.productId && obj.measureId === p.measurmentId) {
                        let avatotal = Number(obj.avaQuantity) - Number(p.orderedQuantity)
                        if (avatotal < 0) {
                            return $.notify("ordered quantity can not be greater than available quantity", 'error')
                        }
                        obj.avaQuantity = avatotal

                        // return { ...obj, avaQuantity: p.ty };
                    }
                    return obj;
                });
                $.notify('Successful', 'success')
                localStorage.setItem("products", JSON.stringify(newArr));

            }
            setTimeout(() => {
                document.getElementById("toggleModal").click();
                localStorage.removeItem("shopItems");
            }, 200);

        }
    }
    catch (error) {
        console.log(error)
        setLoading = false;
    }
}

window.addEventListener('load', receiptModal = () => {

    var html = `
              <div style="border-bottom: double; padding-bottom: 15px">
                <h6 class="text-center">${getBusiness?.businessName === undefined ? 'GENERAL CUSTOMER' : getBusiness?.businessName}</h6>
                <p
                  class="text-left"
                  style="
                    font-size: 0.6rem;
                    line-height: 1;
                    text-transform: capitalize;
                  "
                >
                  ${locationDetails?.locationName === undefined ? '' : locationDetails?.locationName.toLowerCase()}
                </p>
                <p class="text-left" style="font-size: 0.6rem; line-height: 1">
                  ${locationDetails?.locationContactEmail === undefined ? '' : locationDetails?.locationContactEmail}
                </p>
                <p class="text-left" style="font-size: 0.6rem">
                  ${locationDetails?.locationContactPhone === undefined ? '' : locationDetails?.locationContactPhone}
                </p>
              </div>
              <table class="table table-borderless table-sm">
                <thead>
                  <tr>
                    <th class="text-left">Qty</th>
                    <th class="text-left">Product</th>
                    <th class="text-center">Dosage</th>
                    <th class="text-right">Price (&#8358;)</th>
                  </tr>
                </thead>
                <tbody>
                   ${receipt && receipt?.stockSalesDetails?.map(pro =>
        `<tr>
                    <td
                      class="font-weight-medium text-center"
                      style="font-size: 0.6rem; line-height: 1"
                    >
                      ${pro?.orderedQuantity}
                    </td>
                    <td
                      class="font-weight-medium text-left"
                      style="font-size: 0.6rem; line-height: 1"
                    >
                      ${pro?.productName.slice(0, 11).toLowerCase()}
                    </td>

                    <td
                      class="font-weight-medium text-center"
                      style="font-size: 0.6rem; line-height: 1"
                    >
                      ${pro?.dosage === undefined ? '' : pro?.dosage}
                    </td>

                    <td
                      class="font-weight-medium text-center"
                      style="font-size: 0.6rem; line-height: 1"
                    >
                      ${formatter1.format(pro?.extendedPrice)}
                    </td>
                  </tr>`
    ).join('')
        }
                </tbody >
              </table >

             <div class="mt-2 pt-2" style="border-top: double">
                <div class="text-left">
                  <h6
                    class="font-weight-bold"
                    style="font-size: 1rem; line-height: 1"
                  >
                    SUBTOTAL:
                    <span class="px-2" style="font-size: 1rem; line-height: 1"
                      >&#8358; ${formatter1.format(receipt?.totalAmount === undefined ? 0 : receipt?.totalAmount)}</span
                    >
                  </h6>
                </div>
                <div class="text-left">
                  <p style="font-size: 0.6rem; line-height: 1">
                    Total Charge:
                    <span class="px-2" style="font-size: 0.6rem; line-height: 1"
                      >&#8358; ${formatter1.format(receipt?.totalCharges ?
            receipt?.totalCharges : 0)}</span
                    >
                  </p>
                </div>
                <div class="text-left">
                  <p style="font-size: 0.6rem; line-height: 1">
                    Total Discount:
                    <span class="px-2" style="font-size: 0.6rem; line-height: 1"
                      >&#8358; ${formatter1.format(receipt?.totalDiscounts ?
                receipt?.totalDiscounts : 0)}</span
                    >
                  </p>
                </div>
                <div class="text-left">
                  <p style="font-size: 0.6rem; line-height: 1">
                    Transaction No.:
                    <span class="px-2" style="font-size: 0.6rem; line-height: 1"
                      >${receipt?.documentNo}</span
                    >
                  </p>
                </div>
                <p style="font-size: 0.6rem; line-height: 1">
                Bill Printed Time: ${moment().format('MMM D, YYYY hh:mm')}
              </p>

              <div class="mt-2 pt-2 text-left" style="border-top: double">
                <p
                  style="
                    font-size: 0.6rem;
                    line-height: 1.3;
                    padding-bottom: 10px;
                  "
                >
                  Bill Prepared By: ${receipt?.authorizedBy}
                </p>

                <p style="font-size: 0.6rem; line-height: 1.3">
                  Powered by Logiflex Technologies Limited |
                  p2psupport@logiflextech.com
                </p>
                <p style="font-size: 0.6rem; line-height: 1">
                  Tel : <span> +234 815 042 4479, +234 806 711 1889</span>
                </p>
              </div>
            </div >
        </div>`

    document.getElementById('receipt').innerHTML = html;
})


document.addEventListener('DOMContentLoaded', btn = () => {
    var butts = `
     <button
                type="button"
                id="closeModal"
                class="btn btn-sm btn-secondary btn-icon-text"
                onclick="Cancel()"
                data-dismiss="modal"
                >
                Close
                </button>
            ${os === "Linux OS" ?
            `<a
                class="btn btn-sm btn-primary btn-icon-text"
                href="printstring"
                >PRINT</a
              >` : ''}
            ${os !== "Linux OS" ?
            `<button
                type="button"
                class="btn btn-sm btn-primary btn-icon-text"
                onclick="handlePrint()"
              >
                PRINT</button
              >` : ''}
`
    document.getElementById('btnPrints').innerHTML = butts;
})

window.addEventListener('load', locations = () => {
    var displayLoc = `
    ${SelLocation?.length > 0 &&
        SelLocation?.map((loc, index) =>
            `   <tr>
                              <td>
                                <button
                                  type="button"
                                  onclick="selectLoc(${index})"
                                  class="btn btn-primary btn-sm btn-icon-text text-white d-flex float-left"
                                  data-toggle="modal"
                                  id="selectLocButton"
                                  data-target="#locationModal"
                                >
                                  SELECT
                                </button>
                              </td>
                              <td>${index + 1}</td>
                              <td>
                                <span class="text-uppercase"
                                  >${loc?.locationName}</span
                                >
                              </td>
                              <td
                                class="text-left text-wrap"
                                style="width: 400px"
                              >
                                <span class="text-uppercase"
                                  >${loc?.locationAddress}</span
                                >
                              </td>
                            </tr>
                          `
        ).join('')
        }
    `
    document.getElementById('loc-body').innerHTML = displayLoc;
})
