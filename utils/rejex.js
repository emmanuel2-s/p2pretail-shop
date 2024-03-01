export const regex = {
  phoneNumber: /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/,
  email: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
  website: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-]*)?\??(?:[-\+=&;%@.\w]*)#?(?:[\w]*))?)/,
}


// image file size
const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
const docTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const elsTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

export const validFileType = (file) => {
  return fileTypes.includes(file.type);
};
export const validDocType = (file) => {
  return docTypes.includes(file.type);
};
export const validElsType = (file) => {
  return elsTypes.includes(file.type);
};

export const returnFileSize = (number) => {
  if (number.size) {
    return (number.size / 1048576).toFixed(1) + "MB";
  }
};