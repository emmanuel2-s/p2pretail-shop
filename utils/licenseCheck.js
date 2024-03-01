export const licenseExpiration = (date) => {
    if (!date) {
        return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const licenseExpirationDate = new Date(date);
    licenseExpirationDate.setHours(0, 0, 0, 0);

    if (licenseExpirationDate <= today) {
        return true;
    }

    return false;
};

export const licenseExpirationWarning = (date) => {
    if (!date) {
        return false;
    }
    const d = new Date(date)
    const warningDate = d.setDate(d.getDate() - 7);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const licenseWarningDate = new Date(warningDate);
    licenseWarningDate.setHours(0, 0, 0, 0);

    if (licenseWarningDate <= today) {
        return true;
    }

    return false;
};