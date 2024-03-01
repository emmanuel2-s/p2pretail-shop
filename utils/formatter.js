import moment from "moment";

export const formatter = new Intl.NumberFormat('en-NI', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2
});
export const formatter1 = new Intl.NumberFormat('en-NI', {
  minimumFractionDigits: 2
});
export const formatter2 = new Intl.NumberFormat('en-NI', {});

export const fourDecimal = (myNumber) => {
  const num = parseFloat(myNumber).toFixed(4);
  return num;
}

export const toDate = (date) => {
  const newDate = moment(date).format('DD-MMM-YYYY');
  return newDate;
}

export const convert = (num) => {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const format2 = (n) => {
  return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
// function currencyFormat(num) {
//     return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
//  }
// (12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

// const [value, dispatchValue] = useReducer(
//     (state, newValue) => {
//       const [formattedWholeValue, decimalValue = "0"] = newValue.split(".");
//       const signifantValue = formattedWholeValue.replace(/,/g, "");
//       const floatValue = parseFloat(
//         signifantValue + "." + decimalValue.slice(0, 2)
//       );
//       if (isNaN(floatValue) === false) {
//         let n = new Intl.NumberFormat("en-EN", {
//           minimumFractionDigits: 0,
//           maximumFractionDigits: 2
//         }).format(floatValue);
//         if (newValue.includes(".") && !n.includes(".")) {
//           return n + ".";
//         }
//         return n;
//       }
//       return "0";
//     },
//     ""
//   );