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
import { backendUrl } from "@/app/util/url"

export function EditButton({employee, setEmployees} : { employee : employeeGetInterface, setEmployees :  React.Dispatch<React.SetStateAction<employeeGetInterface[]>>}) {
  
  const [open, setOpen] = useState(false)

  const lastInfo = employee.info[employee.info.length - 1] ?? {}

  const [info, setInfo] = useState({
    period_covered: getCurrentMonth(),
    pera_adcom_allow: lastInfo.pera_adcom_allow ?? 0,
    tax: lastInfo.tax ?? 0,
    life_retirement: lastInfo.life_retirement ?? 0,
    medicare: lastInfo.medicare ?? 0,
    pagibig_cont: lastInfo.pagibig_cont ?? 0,
    euli: lastInfo.euli ?? 0,
    pagibig_loan: lastInfo.pagibig_loan ?? 0,
    pagibig_calamity_loan: lastInfo.pagibig_calamity_loan ?? 0,
    pagibig_housing_loan: lastInfo.pagibig_housing_loan ?? 0,
    veterans_loan: lastInfo.veterans_loan ?? 0,
    dbp_loan: lastInfo.dbp_loan ?? 0,
    consol_salary_loan: lastInfo.consol_salary_loan ?? 0,
    mpl: lastInfo.mpl ?? 0,
    emergency_loan: lastInfo.emergency_loan ?? 0,
    policy_loan: lastInfo.policy_loan ?? 0,
    gfal: lastInfo.gfal ?? 0,
    educ: lastInfo.educ ?? 0,
    policy_loan_opt: lastInfo.policy_loan_opt ?? 0,
    computer_loan: lastInfo.computer_loan ?? 0,
    amount_due_1_15: lastInfo.amount_due_1_15 ?? 0,
    amount_due_16_30: lastInfo.amount_due_16_30 ?? 0,
    landbank_loan_due_1_15: lastInfo.landbank_loan_due_1_15 ?? 0,
    landbank_loan_due_16_30: lastInfo.landbank_loan_due_16_30 ?? 0
  })

  const mutationUpdate = useMutation({
    mutationFn : (data : { _id : string, info : infoInterface}) => axios.put(backendUrl("employee/info"), data),
    onSuccess : (response : { data : employeeGetInterface[]} ) => {
      setEmployees(response.data)
      successAlert("Excel File updated")
    },
    onError : (err : { request : { response : string}}) => errorAlert(err.request.response)
  })


const submitFunction = () => {
  setOpen(false)
  confirmAlert(`Update ${employee.name} Data?`, "confirm", () => {
    const net_amount = (info.amount_due_1_15 + info.amount_due_16_30) - (info.landbank_loan_due_1_15 + info.landbank_loan_due_16_30)
    const completedInfo : infoInterface = {...info, salary : employee.salary, amount_due_after_landbank : net_amount}
    mutationUpdate.mutate({ _id : employee._id , info : completedInfo })
  })
}

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)} asChild>
        <Button variant="outline"> <Edit className=" h-4 w-4" /> Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit {employee.name} Info</SheetTitle>
          <SheetDescription>Update the employee's payroll information below.</SheetDescription>
        </SheetHeader>

        <div className="rounded-lg p-6 shadow-sm w-full m-auto h-[800px] overflow-auto">
          <div className="grid gap-4">
            {Object.entries(info).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-2">
                <Label htmlFor={key}>{key.replace(/_/g, ' ')}</Label>
                <Input
                  id={key}
                  type={typeof value === "number" ? "number" : "text"}
                  value={value}
                  onChange={(e) =>
                    setInfo((prev) => ({
                      ...prev,
                      [key]: typeof value === "number" ? Number(e.target.value) : e.target.value
                    }))
                  }
                />
              </div>
            ))}

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
