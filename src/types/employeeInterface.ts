export interface infoInterface {
    period_covered : string,
    salary : number,
    pera_adcom_allow : number,
    tax : number,
    life_retirement : number,
    medicare : number,
    pagibig_cont : number,
    euli : number,
    pagibig_loan : number,
    pagibig_calamity_loan : number,
    pagibig_housing_loan : number,
    veterans_loan : number,
    dbp_loan : number,
    consol_salary_loan : number,
    mpl : number,
    emergency_loan : number,
    policy_loan : number,
    gfal : number,
    educ : number,
    policy_loan_opt : number,
    computer_loan : number,
    amount_due_1_15 : number,
    amount_due_16_30 : number,
    landbank_loan_due_1_15 : number,
    landbank_loan_due_16_30 : number,
    amount_due_after_landbank : number
}



export interface employeeAddInterface {
    name : string, 
    department : string,
    position : string,
    salary : number
}

export interface employeeGetInterface {
    _id : string, 
    name : string, 
    department : string,
    position : string,
    salary : number,
    filename : string,
    info : infoInterface[]
}