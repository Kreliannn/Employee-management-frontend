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


interface  validityInterface {
    end_date : string,
    validity : number
}

export interface loan_dateInterface {
    tax : validityInterface,
    life_retirement : validityInterface,
    medicare : validityInterface,
    pagibig_cont : validityInterface,
    euli : validityInterface,
    pagibig_loan : validityInterface,
    pagibig_calamity_loan : validityInterface,
    pagibig_housing_loan : validityInterface,
    veterans_loan : validityInterface,
    dbp_loan : validityInterface,
    consol_salary_loan : validityInterface,
    mpl : validityInterface,
    emergency_loan : validityInterface,
    policy_loan : validityInterface,
    gfal : validityInterface,
    educ : validityInterface,
    policy_loan_opt : validityInterface,
    computer_loan : validityInterface, 
    landbank_loan_due_1_15 : validityInterface,
    landbank_loan_due_16_30 : validityInterface,
}

export interface employeeAddInterface {
    name : string, 
    department : string,
    position : string,
    salary : number,
    email : string,
    contact : string
}

export interface employeeGetInterface {
    _id : string, 
    name : string, 
    department : string,
    position : string,
    salary : number,
    filename : string,
    email : string,
    contact : string,
    loan : loan_dateInterface,
    info : infoInterface[]
}