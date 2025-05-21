"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { employeeGetInterface, infoInterface } from "@/types/employeeInterface"
import { getCurrentMonth } from "@/app/util/func"
import { useMutation } from "@tanstack/react-query"
import { errorAlert , successAlert, confirmAlert} from "@/app/util/sweetAlert"
import axios from "axios"
import { getTotalDeduction } from "@/app/util/func"
import { Edit } from "lucide-react"
import { loan_dateInterface } from "@/types/employeeInterface"

export function EditButton({employee, setEmployees} : { employee : employeeGetInterface, setEmployees :  React.Dispatch<React.SetStateAction<employeeGetInterface[]>>}) {
  
  const [open, setOpen] = useState(false)

  const [lastInfo, setLastInfo] = useState(employee.info[employee.info.length - 1]);



  const loan = employee.loan;

  const [taxDate, setTaxDate] = useState(loan.tax.end_date);
  const [taxValidity, setTaxValidity] = useState(loan.tax.validity);
  
  const [lifeRetirementDate, setLifeRetirementDate] = useState(loan.life_retirement.end_date);
  const [lifeRetirementValidity, setLifeRetirementValidity] = useState(loan.life_retirement.validity);
  
  const [medicareDate, setMedicareDate] = useState(loan.medicare.end_date);
  const [medicareValidity, setMedicareValidity] = useState(loan.medicare.validity);
  
  const [pagibigContDate, setPagibigContDate] = useState(loan.pagibig_cont.end_date);
  const [pagibigContValidity, setPagibigContValidity] = useState(loan.pagibig_cont.validity);
  
  const [euliDate, setEuliDate] = useState(loan.euli.end_date);
  const [euliValidity, setEuliValidity] = useState(loan.euli.validity);
  
  const [pagibigLoanDate, setPagibigLoanDate] = useState(loan.pagibig_loan.end_date);
  const [pagibigLoanValidity, setPagibigLoanValidity] = useState(loan.pagibig_loan.validity);
  
  const [pagibigCalamityLoanDate, setPagibigCalamityLoanDate] = useState(loan.pagibig_calamity_loan.end_date);
  const [pagibigCalamityLoanValidity, setPagibigCalamityLoanValidity] = useState(loan.pagibig_calamity_loan.validity);
  
  const [pagibigHousingLoanDate, setPagibigHousingLoanDate] = useState(loan.pagibig_housing_loan.end_date);
  const [pagibigHousingLoanValidity, setPagibigHousingLoanValidity] = useState(loan.pagibig_housing_loan.validity);
  
  const [veteransLoanDate, setVeteransLoanDate] = useState(loan.veterans_loan.end_date);
  const [veteransLoanValidity, setVeteransLoanValidity] = useState(loan.veterans_loan.validity);
  
  const [dbpLoanDate, setDbpLoanDate] = useState(loan.dbp_loan.end_date);
  const [dbpLoanValidity, setDbpLoanValidity] = useState(loan.dbp_loan.validity);
  
  const [consolSalaryLoanDate, setConsolSalaryLoanDate] = useState(loan.consol_salary_loan.end_date);
  const [consolSalaryLoanValidity, setConsolSalaryLoanValidity] = useState(loan.consol_salary_loan.validity);
  
  const [mplDate, setMplDate] = useState(loan.mpl.end_date);
  const [mplValidity, setMplValidity] = useState(loan.mpl.validity);
  
  const [emergencyLoanDate, setEmergencyLoanDate] = useState(loan.emergency_loan.end_date);
  const [emergencyLoanValidity, setEmergencyLoanValidity] = useState(loan.emergency_loan.validity);
  
  const [policyLoanDate, setPolicyLoanDate] = useState(loan.policy_loan.end_date);
  const [policyLoanValidity, setPolicyLoanValidity] = useState(loan.policy_loan.validity);
  
  const [gfalDate, setGfalDate] = useState(loan.gfal.end_date);
  const [gfalValidity, setGfalValidity] = useState(loan.gfal.validity);
  
  const [educDate, setEducDate] = useState(loan.educ.end_date);
  const [educValidity, setEducValidity] = useState(loan.educ.validity);
  
  const [policyLoanOptDate, setPolicyLoanOptDate] = useState(loan.policy_loan_opt.end_date);
  const [policyLoanOptValidity, setPolicyLoanOptValidity] = useState(loan.policy_loan_opt.validity);
  
  const [computerLoanDate, setComputerLoanDate] = useState(loan.computer_loan.end_date);
  const [computerLoanValidity, setComputerLoanValidity] = useState(loan.computer_loan.validity);
  
  const [landbankLoanDue1_15Date, setLandbankLoanDue1_15Date] = useState(loan.landbank_loan_due_1_15.end_date);
  const [landbankLoanDue1_15Validity, setLandbankLoanDue1_15Validity] = useState(loan.landbank_loan_due_1_15.validity);
  
  const [landbankLoanDue16_30Date, setLandbankLoanDue16_30Date] = useState(loan.landbank_loan_due_16_30.end_date);
  const [landbankLoanDue16_30Validity, setLandbankLoanDue16_30Validity] = useState(loan.landbank_loan_due_16_30.validity);
  

  const submitFunction = () => {
    const loan_data = {
      tax: { end_date: taxDate, validity: taxValidity },
      life_retirement: { end_date: lifeRetirementDate, validity: lifeRetirementValidity },
      medicare: { end_date: medicareDate, validity: medicareValidity },
      pagibig_cont: { end_date: pagibigContDate, validity: pagibigContValidity },
      euli: { end_date: euliDate, validity: euliValidity },
      pagibig_loan: { end_date: pagibigLoanDate, validity: pagibigLoanValidity },
      pagibig_calamity_loan: { end_date: pagibigCalamityLoanDate, validity: pagibigCalamityLoanValidity },
      pagibig_housing_loan: { end_date: pagibigHousingLoanDate, validity: pagibigHousingLoanValidity },
      veterans_loan: { end_date: veteransLoanDate, validity: veteransLoanValidity },
      dbp_loan: { end_date: dbpLoanDate, validity: dbpLoanValidity },
      consol_salary_loan: { end_date: consolSalaryLoanDate, validity: consolSalaryLoanValidity },
      mpl: { end_date: mplDate, validity: mplValidity },
      emergency_loan: { end_date: emergencyLoanDate, validity: emergencyLoanValidity },
      policy_loan: { end_date: policyLoanDate, validity: policyLoanValidity },
      gfal: { end_date: gfalDate, validity: gfalValidity },
      educ: { end_date: educDate, validity: educValidity },
      policy_loan_opt: { end_date: policyLoanOptDate, validity: policyLoanOptValidity },
      computer_loan: { end_date: computerLoanDate, validity: computerLoanValidity },
      landbank_loan_due_1_15: { end_date: landbankLoanDue1_15Date, validity: landbankLoanDue1_15Validity },
      landbank_loan_due_16_30: { end_date: landbankLoanDue16_30Date, validity: landbankLoanDue16_30Validity }
    };
  
   
    console.log(loan_data);
  };
  



  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)} asChild>
        <Button   variant="outline" size="sm" className="absolute top-2 right-2 h-7 px-2 py-1"> <Edit className=" h-4 w-4" /> Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit {employee.name} Loan </SheetTitle>
          <SheetDescription>Update the employee's payroll information below.</SheetDescription>
        </SheetHeader>

        <div className="rounded-lg p-6 shadow-sm w-full m-auto h-[800px] overflow-auto">
            <div className="grid gap-4">
                
                <div className="rounded-lg p-6 shadow-sm w-full m-auto max-h-[800px] overflow-auto">


                {lastInfo.tax !== 0 && (
                <Container
                    name="tax"
                    date={taxDate}
                    validity={taxValidity}
                    setDate={setTaxDate}
                    setValidity={setTaxValidity}
                />
                )}

                {lastInfo.life_retirement !== 0 && (
                <Container
                    name="life_retirement"
                    date={lifeRetirementDate}
                    validity={lifeRetirementValidity}
                    setDate={setLifeRetirementDate}
                    setValidity={setLifeRetirementValidity}
                />
                )}

                {lastInfo.medicare !== 0 && (
                <Container
                    name="medicare"
                    date={medicareDate}
                    validity={medicareValidity}
                    setDate={setMedicareDate}
                    setValidity={setMedicareValidity}
                />
                )}

                {lastInfo.pagibig_cont !== 0 && (
                <Container
                    name="pagibig_cont"
                    date={pagibigContDate}
                    validity={pagibigContValidity}
                    setDate={setPagibigContDate}
                    setValidity={setPagibigContValidity}
                />
                )}

                {lastInfo.euli !== 0 && (
                <Container
                    name="euli"
                    date={euliDate}
                    validity={euliValidity}
                    setDate={setEuliDate}
                    setValidity={setEuliValidity}
                />
                )}

                {lastInfo.pagibig_loan !== 0 && (
                <Container
                    name="pagibig_loan"
                    date={pagibigLoanDate}
                    validity={pagibigLoanValidity}
                    setDate={setPagibigLoanDate}
                    setValidity={setPagibigLoanValidity}
                />
                )}

                {lastInfo.pagibig_calamity_loan !== 0 && (
                <Container
                    name="pagibig_calamity_loan"
                    date={pagibigCalamityLoanDate}
                    validity={pagibigCalamityLoanValidity}
                    setDate={setPagibigCalamityLoanDate}
                    setValidity={setPagibigCalamityLoanValidity}
                />
                )}

                {lastInfo.pagibig_housing_loan !== 0 && (
                <Container
                    name="pagibig_housing_loan"
                    date={pagibigHousingLoanDate}
                    validity={pagibigHousingLoanValidity}
                    setDate={setPagibigHousingLoanDate}
                    setValidity={setPagibigHousingLoanValidity}
                />
                )}

                {lastInfo.veterans_loan !== 0 && (
                <Container
                    name="veterans_loan"
                    date={veteransLoanDate}
                    validity={veteransLoanValidity}
                    setDate={setVeteransLoanDate}
                    setValidity={setVeteransLoanValidity}
                />
                )}

                {lastInfo.dbp_loan !== 0 && (
                <Container
                    name="dbp_loan"
                    date={dbpLoanDate}
                    validity={dbpLoanValidity}
                    setDate={setDbpLoanDate}
                    setValidity={setDbpLoanValidity}
                />
                )}

                {lastInfo.consol_salary_loan !== 0 && (
                <Container
                    name="consol_salary_loan"
                    date={consolSalaryLoanDate}
                    validity={consolSalaryLoanValidity}
                    setDate={setConsolSalaryLoanDate}
                    setValidity={setConsolSalaryLoanValidity}
                />
                )}

                {lastInfo.mpl !== 0 && (
                <Container
                    name="mpl"
                    date={mplDate}
                    validity={mplValidity}
                    setDate={setMplDate}
                    setValidity={setMplValidity}
                />
                )}

                {lastInfo.emergency_loan !== 0 && (
                <Container
                    name="emergency_loan"
                    date={emergencyLoanDate}
                    validity={emergencyLoanValidity}
                    setDate={setEmergencyLoanDate}
                    setValidity={setEmergencyLoanValidity}
                />
                )}

                {lastInfo.policy_loan !== 0 && (
                <Container
                    name="policy_loan"
                    date={policyLoanDate}
                    validity={policyLoanValidity}
                    setDate={setPolicyLoanDate}
                    setValidity={setPolicyLoanValidity}
                />
                )}

                {lastInfo.gfal !== 0 && (
                <Container
                    name="gfal"
                    date={gfalDate}
                    validity={gfalValidity}
                    setDate={setGfalDate}
                    setValidity={setGfalValidity}
                />
                )}

                {lastInfo.educ !== 0 && (
                <Container
                    name="educ"
                    date={educDate}
                    validity={educValidity}
                    setDate={setEducDate}
                    setValidity={setEducValidity}
                />
                )}

                {lastInfo.policy_loan_opt !== 0 && (
                <Container
                    name="policy_loan_opt"
                    date={policyLoanOptDate}
                    validity={policyLoanOptValidity}
                    setDate={setPolicyLoanOptDate}
                    setValidity={setPolicyLoanOptValidity}
                />
                )}

                {lastInfo.computer_loan !== 0 && (
                <Container
                    name="computer_loan"
                    date={computerLoanDate}
                    validity={computerLoanValidity}
                    setDate={setComputerLoanDate}
                    setValidity={setComputerLoanValidity}
                />
                )}

                {(lastInfo.landbank_loan_due_16_30 !== 0 || lastInfo.landbank_loan_due_1_15 !== 0) && (
                <Container
                    name="landbank_loan"
                    date={landbankLoanDue1_15Date}
                    validity={landbankLoanDue1_15Validity}
                    setDate={setLandbankLoanDue1_15Date}
                    setValidity={setLandbankLoanDue1_15Validity}
                />
                )}


                </div>
            
                <div className="flex flex-col gap-2">
                    <Button onClick={submitFunction}>Submit</Button>
                </div>
            </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant={"outline"}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}





const Container = ({ name, date, setDate, validity, setValidity } : { name: string, date: string, setDate: React.Dispatch<React.SetStateAction<string>>, validity: number, setValidity: React.Dispatch<React.SetStateAction<number>> }) => {

    return(
        <div className="w-full mb-5">
                <h3 className="text-lg font-semibold mb-2">{name}</h3>
                
                <div className="w-full flex gap-2">
                    <div className="flex flex-col w-full">
                        <label htmlFor="date" className="mb-1 text-sm text-gray-700">Loan End Date</label>
                        <input
                            type="date"
                            id="date"
                            defaultValue={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="validity" className="mb-1 text-sm text-gray-700">Validity</label>
                        <Input
                            id="validity"
                            type="number"
                            className="w-full"
                            value={validity}
                            onChange={(e) => setValidity(Number(e.target.value))}
                        />
                    </div>
                </div>
         </div>
    )
}
