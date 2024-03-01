let sales = [];
let os = '';
let receipt = {};
let searchValue = '';
const getBusiness = JSON.parse(sessionStorage.getItem("auth"));
const locationDetails = JSON.parse(localStorage.getItem('locationDetails'))

const formatter1 = new Intl.NumberFormat('en-NI', {
  minimumFractionDigits: 2
});

const verifyAuth = () => {
  const getAuth = JSON.parse(sessionStorage.getItem('auth')) || [];
  if (getAuth.length < 1) {
    window.location.reload()
    window.location.href = '../signin/login.html'
  }
}


document.addEventListener('DOMContentLoaded', loadAll = () => {
  try {
    const check = getOperatingSystem(window);
    os = check;

    const retrieve = JSON.parse(localStorage.getItem('Sales'));
    if (retrieve) {
      sales = retrieve;

    }
  }
  catch (error) {
    console.log(error)
  }

})


const searchSale = async (value) => {
  searchValue = value;
  const prods = JSON.parse(localStorage.getItem('Sales'))
  const findProd = prods?.filter(e => e.documentNo.includes(searchValue))
  if (searchValue) {
    sales = findProd;
    offlinelistSales(sales)
  }
  else {
    productes = prods?.sort((a, b) => a.productName.localeCompare(b.productName));
  }

}


const selectReceipt = (documentNo) => {
  const getSingle = JSON.parse(localStorage.getItem('Sales'));
  const sales = getSingle.find(x => x.documentNo === documentNo)
  if (sales) {
    receipt = sales;
    receiptModal(sales)

  }
  console.log(getSingle)
}



const getOperatingSystem = (window) => {
  let operatingSystem = 'Not known';
  if (window.navigator.appVersion.indexOf('Win') !== -1) { operatingSystem = 'Windows OS'; }
  if (window.navigator.appVersion.indexOf('Mac') !== -1) { operatingSystem = 'MacOS'; }
  if (window.navigator.appVersion.indexOf('X11') !== -1) { operatingSystem = 'UNIX OS'; }
  if (window.navigator.appVersion.indexOf('Linux') !== -1) { operatingSystem = 'Linux OS'; }

  return operatingSystem;
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

const handlePrint = () => {
  printJS('receipt', 'html')
}

const cancelSale = () => {
  window.location.reload()
}

const salesLocation = (docNo) => {
  localStorage.setItem('documentNo', JSON.stringify(docNo))
  window.location.href = '../salesshopview.html'
}
// const printstring = `netopscheme://netop/netopurl/open?data=${getBusiness.businessName}~${moment(receipt.transactionDate).format('MMM D, YYYY hh:mm')}@!${formatter1.format(receipt?.totalAmount)}~${receipt?.paymentMode}@!${productString}~!printer`


// const sales = JSON.parse(localStorage.getItem('Sales'));

document.addEventListener('DOMContentLoaded', offlinelistSales = () => {
  var html = ''
  sales && sales.map((sale, index) => {

    html += `<tr class="text-capitalize">`
    html += `<td>
                     ${!sale.authorized ?
        `<span class="badge bg-warning p-2 text-center">PENDING</span>` :
        `<span class="badge bg-success p-2 text-center">APPROVED</span>`
      } 
                  </td>
                  <td>
                    <div class="">
                      <a
                      onclick="salesLocation('${sale.documentNo}')"
                        style="cursor: pointer; text-decoration: none"
                        ><i
                          class="ti-eye"
                          class="btn-icon-append text-primary mr-3"
                          title="View"
                        ></i
                      ></a>
                      <i
                        class="ti-printer"
                        class="ti-printer mr-3"
                        style="cursor: pointer; text-decoration: none"
                        title="Print"
                        data-toggle="modal"
                        data-target="#receiptModal"
                        onclick="selectReceipt('${sale.documentNo}')"
                      ></i>
                    </div>
                  </td>
                  <td class="text-center">${index + 1}</td>
                  <td class="text-center">
                    ${moment(sale?.transactionDate).format('MMM D, YYYY')}
                  </td>
                  <td class="text-center">${sale?.documentNo}</td>
                  <td class="text-center">${sale?.itemTotal}</td>
                  <td class="text-center">
                    &#8358; 
                    ${formatter1.format(sale?.totalAmount)}
                  </td>
                  <td class="text-center">${sale?.customerName}</td>
                  <td class="text-center">${sale?.paymentMode}</td>`
    html += "</tr>"
  })
  var text = ''
  if (sales) {
    document.getElementById('salesTable').innerHTML = html
  } else {
    text += `<strong class='text-muted text-center mx-auto h-5 mb-4'>No Sales Record</strong>`
    document.getElementById('rowspan').innerHTML = text;

  }

})
// document.load = offlinelistSales()


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
  )}
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
              </div>
                <p style="font-size: 0.6rem; line-height: 1">
                Bill Printed Time: ${moment().format('MMM D, YYYY hh:mm')}
              </p>

              <div class="mt-2 pt-2 text-left pb-20" style="border-top: double">
                <p
                  style="
                    font-size: 0.6rem;
                    line-height: 1.3;
                    padding-bottom: 10px;
                  "
                >
                  Bill Prepared By: ${receipt?.authorizedBy ? receipt.authorizedBy : 'GENERAL CUSTOMER'}
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
        <div class="modal-footer">
            <button
                type="button"
                id="closeModal"
                class="btn btn-sm btn-secondary btn-icon-text"
                data-dismiss="modal"
            >
                Close
            </button>
            ${os === "Linux OS" ?
      `<a
                type="button"
                class="btn btn-sm btn-primary btn-icon-text"
                href="{printstring}"
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
        </div>`

  document.getElementById('receipt').innerHTML = html;
})
// document.load = receiptModal();