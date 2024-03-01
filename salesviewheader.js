useEffect(() => {
    const interval = setInterval(() => {
        let pushresult = [];
        const loc = JSON.parse(localStorage.getItem('locationId'))
        const response = JSON.parse(localStorage.getItem('Sales'))
        if (response) {
            if (response?.length > 0) {
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
                    PooledStocksaleDto.locationId = loc;
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
                    // let ol = checkOnlineStatus()
                    if (await isOnline()) {
                        const response = await api.StockSales.syncSales(payload)
                        if (response?.data.length > 0) {
                            const getsale = JSON.parse(localStorage.getItem('Sales'))
                            if (response?.data.length === getsale.length) {
                                getsale.length = 0
                                localStorage.setItem('Sales', JSON.stringify(getsale));
                            } else {
                                let d;
                                for (const f of payload.pooledStocksale) {
                                    if (response?.data.some(x => x.docNo === f.documentNo)) {
                                        d = getsale.filter(x => x.documentNo !== f.documentNo)
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
    }, 5000)
    return () => clearInterval(interval)
}, [])
