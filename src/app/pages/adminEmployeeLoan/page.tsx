"use client"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios" 
import { employeeGetInterface } from "@/types/employeeInterface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { getTotalDeduction, getTotalNet } from "@/app/util/func"
import { bgStyle } from "@/app/util/func"
import { Search, View , Edit} from "lucide-react" 
import { Label } from "@/components/ui/label"
import { EditButton } from "./components/EditButton"
import { backendUrl } from "@/app/util/url"

export default  function IndexPayment() {

    const router = useRouter()

    const [data, setData] = useState<employeeGetInterface[]>([])
    const [employees, setEmployees] = useState<employeeGetInterface[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const respone = await axios.get(backendUrl("employee"))
            setData(respone.data)
            setEmployees(respone.data)
            console.log(employees)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const respone = await axios.get(backendUrl("employee"))
            setData(respone.data)
        }
        fetch()
    }, [employees])

    const searchName = () => {
        if(!search) return
        let allEmployee = data
        setEmployees(allEmployee.filter((employee) => employee.name == search))
    }

    const searchOnchange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
        if(!value) setEmployees(data)
    }
    

  return (
    <div  className="relative h-screen bg-cover bg-center"  style={bgStyle}>
        <div className="w-full  mb-5 ">
            <div className="m-auto w-5/6 ">
                <div className="m-auto w-5/6 flex justify-end items-end" >
              
                    <Button variant={"outline"} className="m-2 mt-4" onClick={() => router.push("adminEmployeePage")}>
                        Manage Employee
                    </Button>

                    <Button variant={"outline"} className="m-2 mt-4" onClick={() => router.push("adminIndexPaymentPage")}>
                        Index Payment
                    </Button>

                    <Button variant={"outline"} className="m-2 mt-4" onClick={() => router.push("adminEmployeeLoan")}>
                        Employee Loan
                    </Button>

                    <Button variant={"destructive"} className="m-2 mt-4" onClick={() => router.push("/")}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
        <div className="w-5/6 m-auto">
            <div className="w-5/6 m-auto ">
                <h1 className=" text-center m-4 text-6xl text-white font-bold"  style={{
                    WebkitTextStroke: '2px green', // Tailwind green-500
                }}> Employee Loan </h1>
            </div>
            <div className="w-5/6 m-auto flex">
                <Input onChange={ searchOnchange }  value={search} placeholder="search Employee Name" className="m-2 bg-white"/>
                <Button className=" m-2 bg-green-500 hover:bg-green-600 text-white" onClick={searchName}> <Search className=" h-4 w-4" /> Search </Button>
            </div>
            <br /> 

            <div className="w-5/6 m-auto shadow-lg  rounded-lg h-[430px] overflow-auto ">
                
                {
                    employees.map((employee) => {

                        const name = employee.name
                        const loan = employee.loan
                        const lastInfo = employee.info.length > 0 ? employee.info[employee.info.length - 1] : null;
                        
                        
                        return (
                        <div key={employee._id} className="bg-white rounded-md p-3 text-white relative mb-3">
                            {/* Edit Button */}            
                            
                           

                            {!lastInfo ? (
                                null 
                            ) : <EditButton  employee={employee} setEmployees={setEmployees}/>}
                        
        
                            {/* Employee Name */}
                            <div className="mb-2 pr-16">
                                <Label htmlFor={`employee-${employee._id}`} className="text-green-500 text-sm font-semibold">
                                Employee:
                                </Label>
                                <div id={`employee-${employee._id}`} className="font-medium  text-black">
                                    {name}
                                </div>
                            </div>
        
                            {/* Loans Container */}
                            <div>
                                <Label className="text-green-500 text-xs font-semibold block mb-1">Loans:</Label>
                                <div className="overflow-x-auto pb-2">
                                    <div className="flex gap-5 min-w-min" style={{ paddingBottom: "5px" }}>

                                    {!lastInfo ? (
                                        <div className="text-sm text-stone-300 italic">No loans</div>
                                    ) : (
                                    <>
                                        
                                        {lastInfo.tax !== 0 && (
                                        <LoanCard
                                            name={"tax"}
                                            value={lastInfo.tax}
                                            end_date={loan.tax.end_date}
                                            validity={loan.tax.validity}
                                        />
                                        )}
                                        {lastInfo.life_retirement !== 0 && (
                                        <LoanCard
                                            name={"life & retirement"}
                                            value={lastInfo.life_retirement}
                                            end_date={loan.life_retirement.end_date}
                                            validity={loan.life_retirement.validity}
                                        />
                                        )}
                                        {lastInfo.medicare !== 0 && (
                                        <LoanCard
                                            name={"medicare"}
                                            value={lastInfo.medicare}
                                            end_date={loan.medicare.end_date}
                                            validity={loan.medicare.validity}
                                        />
                                        )}
                                         {lastInfo.pagibig_cont !== 0 && (
                                        <LoanCard
                                            name={"pagibig cont"}
                                            value={lastInfo.pagibig_cont}
                                            end_date={loan.pagibig_cont.end_date}
                                            validity={loan.pagibig_cont.validity}
                                        />
                                        )}
                                        {lastInfo.euli !== 0 && (
                                        <LoanCard
                                            name={"euli"}
                                            value={lastInfo.euli}
                                            end_date={loan.euli.end_date}
                                            validity={loan.euli.validity}
                                        />
                                        )}
                                        {lastInfo.pagibig_loan !== 0 && (
                                        <LoanCard
                                            name={"pagibig loan"}
                                            value={lastInfo.pagibig_loan}
                                            end_date={loan.pagibig_loan.end_date}
                                            validity={loan.pagibig_loan.validity}
                                        />
                                        )}
                                        {lastInfo.pagibig_calamity_loan !== 0 && (
                                        <LoanCard
                                            name={"pagibig_calamity_loan"}
                                            value={lastInfo.pagibig_calamity_loan}
                                            end_date={loan.pagibig_calamity_loan.end_date}
                                            validity={loan.pagibig_calamity_loan.validity}
                                        />
                                        )}
                                        {lastInfo.pagibig_housing_loan !== 0 && (
                                        <LoanCard
                                            name={"pagibig_housing_loan"}
                                            value={lastInfo.pagibig_housing_loan}
                                            end_date={loan.pagibig_housing_loan.end_date}
                                            validity={loan.pagibig_housing_loan.validity}
                                        />
                                        )}
                                         {lastInfo.veterans_loan !== 0 && (
                                        <LoanCard
                                            name={"veterans loan"}
                                            value={lastInfo.veterans_loan}
                                            end_date={loan.veterans_loan.end_date}
                                            validity={loan.veterans_loan.validity}
                                        />
                                        )}
                                         {lastInfo.dbp_loan !== 0 && (
                                        <LoanCard
                                            name={"dbp loan"}
                                            value={lastInfo.dbp_loan}
                                            end_date={loan.dbp_loan.end_date}
                                            validity={loan.dbp_loan.validity}
                                        />
                                        )}
                                         {lastInfo.consol_salary_loan !== 0 && (
                                        <LoanCard
                                            name={"consol salary loan"}
                                            value={lastInfo.consol_salary_loan}
                                            end_date={loan.consol_salary_loan.end_date}
                                            validity={loan.consol_salary_loan.validity}
                                        />
                                        )}
                                        {lastInfo.mpl !== 0 && (
                                        <LoanCard
                                            name={"mpl"}
                                            value={lastInfo.mpl}
                                            end_date={loan.mpl.end_date}
                                            validity={loan.mpl.validity}
                                        />
                                        )}
                                           {lastInfo.emergency_loan !== 0 && (
                                        <LoanCard
                                            name={"emergency loan"}
                                            value={lastInfo.emergency_loan}
                                            end_date={loan.emergency_loan.end_date}
                                            validity={loan.emergency_loan.validity}
                                        />
                                        )}
                                           {lastInfo.policy_loan !== 0 && (
                                        <LoanCard
                                            name={"policy loan"}
                                            value={lastInfo.policy_loan}
                                            end_date={loan.policy_loan.end_date}
                                            validity={loan.policy_loan.validity}
                                        />
                                        )}
                                        {lastInfo.gfal !== 0 && (
                                        <LoanCard
                                            name={"gfal"}
                                            value={lastInfo.gfal}
                                            end_date={loan.gfal.end_date}
                                            validity={loan.gfal.validity}
                                        />
                                        )}
                                        {lastInfo.educ !== 0 && (
                                        <LoanCard
                                            name={"educ"}
                                            value={lastInfo.educ}
                                            end_date={loan.educ.end_date}
                                            validity={loan.educ.validity}
                                        />
                                        )}
                                        {lastInfo.policy_loan_opt !== 0 && (
                                        <LoanCard
                                            name={"policy loan opt"}
                                            value={lastInfo.policy_loan_opt}
                                            end_date={loan.policy_loan_opt.end_date}
                                            validity={loan.policy_loan_opt.validity}
                                        />
                                        )}
                                        {lastInfo.computer_loan !== 0 && (
                                        <LoanCard
                                            name={"computer loan"}
                                            value={lastInfo.computer_loan}
                                            end_date={loan.computer_loan.end_date}
                                            validity={loan.computer_loan.validity}
                                        />
                                        )}
                                        {(lastInfo.landbank_loan_due_16_30 != 0 || lastInfo.landbank_loan_due_1_15 != 0) && (
                                        <LoanCard
                                            name={"landbank loan 1-30"}
                                            value={lastInfo.landbank_loan_due_1_15 + lastInfo.landbank_loan_due_16_30}
                                            end_date={loan.landbank_loan_due_1_15.end_date}
                                            validity={loan.landbank_loan_due_1_15.validity}
                                        />
                                        )}
                                    </>
                                    )}

                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }


            </div>
           
        </div>
    </div>
   
  )
}




const LoanCard = ({ name, value, end_date, validity }: { name: string, value: number, end_date: string, validity: number }) => {

    return(
        <div className="bg-stone-100 shadow-lg p-4 rounded-md flex-shrink-0 w-[180px]">
            <div className="font-medium text-stone-700 border-b border-stone-500 pb-1 mb-1">{name}</div>
            <div className="grid grid-cols-[auto,1fr] gap-x-1 text-xs">
                <Label className="text-green-700 text-[10px] font-bold">Amount:</Label>
                <div className="text-stone-700 mb-1">{`₱ ${value}`}</div>
                
                <Label className="font-bold text-green-700 text-[10px]">Loan End:</Label>
                <div className="text-stone-700 mb-1">{ ` ${(end_date != "") ? formatDate(end_date) : "No Selected Date"}  `  }</div> 
                
                <Label className=" font-bold text-green-700 text-[10px]">Loan Term:</Label>
                <div className="text-stone-700 mb-1">{`${validity} ${(validity > 1) ? "yrs" : "yr"  }`}</div> 
            </div>
        </div>
    )

}


function formatDate(input: string): string {
    const [year, month, day] = input.split('-');
  
    const date = new Date(`${year}-${month}-${day}`);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    return date.toLocaleDateString('en-US', options);
  }
  
  // Example usage
  console.log(formatDate("2025-01-05")); // Output: January 5, 2025
  
  

  