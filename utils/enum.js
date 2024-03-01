export const stockState = {
    USEABLE: "Useable",
    DAMAGED: "Damaged",
    EXPIRED: "Expired",
    QUARANTINE: "Quarantine",
    CLOSE_TO_EXPIRY: "Close To Expiry"
};

export const transactionType = {
    RETURN: "Return",
    RECALL: "Recall",
    RECEIPT: "Receipt"
}

export const measures = [
    // 
]

export const roles = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
];


export const issuetransactionType = {
    ISSUENOTE: "IssueNote",
    OUTWARD: "Outward",
    INWARD: "Inward"
}

export const AccountType = {
    ASSET: {
        name: "Asset",
        value: "asset"
    },
    LIABILITY: {
        name: "Liability",
        value: "liability"
    },
    EQUITY: {
        name: "Equity(Capital)",
        value: "equity"
    },
    REVENUE: {
        name: "Revenue",
        value: "revenue"
    },
    EXPENDITURE: {
        name: "Expenditure",
        value: "expenditure"
    },
    GOODS_SOLD: {
        name: "Cost of Goods Sold",
        value: "costofgoodssold"
    },
    OPERATING: {
        name: "Operating Expenses",
        value: "operatingexpenses"
    },
    OTHER_INCOME: {
        name: "Other Income",
        value: "otherincome"
    },
    OTHER_EXPENSES: {
        name: "Other Expenses",
        value: "otherexpenses"
    },
    INCOME_TAX: {
        name: "Income Tax Expense",
        value: "incometaxexpense"
    },
}

export const ReportFormat = {
    SINGLECOLUMN: {
        name: "Single Column",
        value: "singlecolumn"
    },
    DOUBLECOLUMN: {
        name: "Double Column",
        value: "doublecolumn"
    }
}

export const source = [
    {
        id: "payroll_system",
        name: 'Payroll System',
    },
    {
        id: "journal",
        name: 'Journal',
    },
    {
        id: "sales_system",
        name: 'Sales System',
    },
    {
        id: "asset_mgt_system",
        name: 'Asset Management System',
    },
]

export const PeriodType = {
    WEEKLY: {
        name: "Weekly",
        value: "weekly"
    },
    MONTHLY: {
        name: "Monthly",
        value: "monthly"
    },
    QUARTERLY: {
        name: "Quarterly",
        value: "quarterly"
    }
}