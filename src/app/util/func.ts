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
        computer_loan,
        landbank_loan_due_16_30,
        landbank_loan_due_1_15
    } = info[length - 1]
    
    const total_deduction =  landbank_loan_due_16_30 + landbank_loan_due_1_15 +computer_loan + policy_loan_opt + educ + gfal + policy_loan + mpl + emergency_loan+  dbp_loan + consol_salary_loan +  veterans_loan + pagibig_housing_loan  + tax + life_retirement + medicare + pagibig_cont + euli + pagibig_loan + pagibig_calamity_loan
    
    return total_deduction
   
}


export const getTotalNet = (info : infoInterface[]) => {
    const length = info.length
    if( length == 0) return 0
    const {  amount_due_after_landbank } = info[length - 1]
    return amount_due_after_landbank
}


export const bgStyle = {
    backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/bg.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  }
  