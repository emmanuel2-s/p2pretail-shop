let sale = [];
let setLoading = false;

const formatter1 = new Intl.NumberFormat('en-NI', {
  minimumFractionDigits: 2
});


document.addEventListener('DOMContentLoaded', loadAllSales = () => {
  try {

    const docNo = JSON.parse(localStorage.getItem('documentNo'))
    console.log(docNo);
    const getSingle = JSON.parse(localStorage.getItem('Sales'));
    console.log("first", getSingle)


    // if (getSingle && Array.isArray(getSingle)) {
    //     // getSingle.forEach(sales => {
    //     const id = docNo
    //     // console.log(id)
    //     if (id) {
    //         // lineData(sales)
    //         // console.log(lineData())
    //         const foundSale = getSingle.find(x => x.documentNo === id);
    //         if (foundSale) {
    //             sale = foundSale;
    //             lineData(foundSale);
    //         } else {
    //             console.log('Sale not found for ID:', id);
    //         }
    //     } else {
    //         console.log('Sale not found for ID:', id)
    //     }
    //     // });
    // } else {
    //     console.log('Sales data not found ');
    // }
    const id = docNo;
    const sales = getSingle.find(x => x.documentNo === id)
    if (sales) {
      sale = sales;
      lineData(sales)
      console.log(sale)

    }
    console.log(sales)
  }
  catch (error) {
    console.log(error)
  }
});

const approve = async () => {
  try {
    setLoading = true;
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to approve this document`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await api.StockSales.approve(sale?.documentNo)
        if (response?.sucessMessage) {
          notifySuccess(response?.sucessMessage)
          window.location.href = "../offlinelist/offlinelistsales.html"
        } else {
          setLoading = false;
        }
      }
      setLoading = false;
    })
  } catch (error) {
    console.log(error);
  }
}


document.addEventListener('DOMContentLoaded', lineData = () => {
  var text = `
                <div class="d-flex justify-content-end mr-2 ">
            ${!sale?.authorized ?
      `<button
              type="submit"
              class="btn btn-success btn-sm btn-icon-text text-white d-flex align-items-center float-right mx-1 mt-3"
              onclick="approve()"
            >
              <i class="ti-check" style="color: white;font-size: 18px;margin-top: 3px;margin-right: 6px;
                  " title="Approve"></i>
              <span class="d-none d-md-block">Approve</span>
            </button>`: ''}

            <div class="d-flex justify-content-end mr-2 ">
          <a href="offlinelist/offlinelistsales.html"
                class="btn btn-dark btn-sm btn-icon-text text-white d-flex mx-1 rounded align-items-center"
              >
                <i
                  class="ti-arrow-left"
                  style="
                    color: white;
                    font-size: 18px;
                    margin-top: 3px;
                    margin-right: 6px;
                  "
                  title="Back"
                ></i>
                <span class="d-none d-md-block pt-2 fs-7">BACK</span></a>            
              </div>
              </div>
    
    
    <div class="col-md-3 mb-3">
                  <span class="font-weight-bold"
                    >Transaction Number:
                    <span class="text-uppercase font-weight-normal"
                      >${sale?.documentNo === undefined ? "" : sale?.documentNo}&nbsp; ${!sale?.authorized ?
      `<span class="badge bg-warning">PENDING</span>` :
      `<span class="badge bg-success">APPROVED</span>`
    }
                    </span>
                  </span>
                </div>
                <div class="col-md-3 mb-3">
                  <span class="font-weight-bold"
                    >Item Total:
                    <span class="text-uppercase font-weight-normal"
                      >${sale?.itemTotal === undefined ? "" : sale?.itemTotal}</span
                    ></span
                  >
                </div>
                <div class="col-md-3 mb-3">
                  <span class="font-weight-bold"
                    >Total Amount:
                    <span class="text-uppercase font-weight-normal"
                      >&#8358; ${formatter1.format(sale?.totalAmount === undefined ? "" : sale?.totalAmount)}</span
                    ></span
                  >
                </div>
                <div class="col-md-3 mb-3">
                  <span class="font-weight-bold"
                    >Comment:
                    <span class="text-uppercase font-weight-normal"
                      >${sale?.comment === undefined ? "" : sale?.comment}</span
                    ></span
                  >
                </div>
                <div class="col-md-3 mb-3">
                  <span class="font-weight-bold"
                    >Payment Mode:
                    <span class="text-uppercase font-weight-normal"
                      >${sale?.paymentMode === undefined ? "" : sale?.paymentMode}</span
                    ></span
                  >
                </div>
                <div class="col-md-3 mb-3">
                  <span class="font-weight-bold"
                    >Customer Name:
                    <span class="text-uppercase font-weight-normal"
                      >${sale?.customerName === undefined ? "" : sale?.customerName}</span
                    ></span
                  >
                </div>
                <div class="col-md-3 mb-3">
                  <span class="font-weight-bold"
                    >Customer Phone Number:
                    <span class="text-uppercase font-weight-normal"
                      >${sale?.customerPhone === undefined ? "" : sale?.customerPhone}</span
                    ></span
                  >
                </div>
                <div class="col-md-3 mb-3">
                  <span class="font-weight-bold"
                    >Authorized By:
                    <span class="text-uppercase font-weight-normal"
                      >${sale?.authorizedBy === undefined ? '' : sale.authorizedBy}</span
                    ></span
                  >
                </div>`
  document.getElementById('salesData').innerHTML = text;
})
// document.load = lineData()



document.addEventListener('DOMContentLoaded', tableData = () => {
  var displayText = `
    ${sale?.stockSalesDetails?.map((detail, index) =>
    `<tr>
                    <td class="text-right">${index + 1}</td>
                    <td class="text-left">${detail?.productName}</td>
                    <td class="text-left">${detail?.measureName}</td>
                    <td class="text-center">${detail?.orderedQuantity}</td>
                    <td class="text-left">
                      &#8358; ${formatter1.format(detail?.unitPrice)}
                    </td>
                    <td class="text-left">
                      &#8358; ${formatter1.format(detail?.extendedPrice)}
                    </td>
                    <td class="">${detail?.dosage === undefined ? '' : detail?.dosage}</td>
                  </tr>`
  ).join('')}`;
  document.getElementById('tbdy').innerHTML = displayText;
})
// document.load = tableData();