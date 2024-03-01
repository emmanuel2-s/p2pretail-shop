export const BalanceAdjustmentType = {
    measure: "Pack Unit Conversion",
    balanceadj: "Balance Adjustment",
    stockstatetrans: "Stock State Transition",
    batchtrans: "Batch Transition",
    openingadj: "Opening Adjustment"
}

export const routeTo = (id) => {
    if (window.location.href === `${window.location.origin}/balanceadj` ||
        window.location.href === `${window.location.origin}/balanceadj/${id}` ||
        window.location.href === `${window.location.origin}/balanceadj/edit/${id}`) {
        return '/balanceadjlist'
    }
    else if (window.location.href === `${window.location.origin}/measure` ||
        window.location.href === `${window.location.origin}/measure/${id}` ||
        window.location.href === `${window.location.origin}/measure/edit/${id}`) {
        return '/measurelist'
    }
    else if (window.location.href === `${window.location.origin}/stockstatetrans` ||
        window.location.href === `${window.location.origin}/stockstatetrans/${id}` ||
        window.location.href === `${window.location.origin}/stockstatetrans/edit/${id}`) {
        return '/stockstatetranslist'
    }
    else if (window.location.href === `${window.location.origin}/batchtrans` ||
        window.location.href === `${window.location.origin}/batchtrans/${id}` ||
        window.location.href === `${window.location.origin}/batchtrans/edit/${id}`) {
        return '/batchtranslist'
    }
}