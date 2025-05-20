import { infoInterface } from "@/types/employeeInterface";

export const getCurrentMonth = () => {
    const monthName = new Date().toLocaleString('default', { month: 'long' });
    return monthName.toString()
}


export const getTotalDeduction = (info : infoInterface[]) => {
    const length = info.length
    if( length == 0) return 0

    const { 
        pera_adcom_allow ,
        tax,
        life_retirement,
        medicare,
        pagibig_cont,
        euli,
        pagibig_loan,
        pagibig_calamity_loan,
        pagibig_housing_loan,
        veterans_loan,
        dbp_loan,
        consol_salary_loan,
        mpl,
        emergency_loan,
        policy_loan,
        gfal,
        educ,
        policy_loan_opt,
        computer_loan
    } = info[length - 1]
    
    const total_deduction = computer_loan + policy_loan_opt + educ + gfal + policy_loan + mpl + emergency_loan+  dbp_loan + consol_salary_loan +  veterans_loan + pagibig_housing_loan + pera_adcom_allow + tax + life_retirement + medicare + pagibig_cont + euli + pagibig_loan + pagibig_calamity_loan
    
    return total_deduction
   
}