import axios from "axios";
import { employeeGetInterface } from "@/types/employeeInterface";
import { Button } from "@/components/ui/button";
import { bgStyle } from "@/app/util/func";
import Link from "next/link";

export default async function PayrollTable({ params} : { params : { id : string}}) {

    const id = params.id

    const response = await axios.get("http://localhost:5000/employee/" + id)

    const employee : employeeGetInterface = response.data


    const formatCurrency = (value : number) => {
        return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
        }).format(value);
    };

  return (
    <div className="w-full p-4 h-dvh" style={bgStyle}>
      {/* Employee Information Section */}
      <div className="w-full mb-5">
           <Button size={"lg"}> <Link href={"/pages/adminIndexPaymentPage"}> Back </Link>  </Button>
       </div>
      <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6 h-full mb-5">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Employee Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex border-b border-gray-100 pb-3">
                  <div className="w-1/3 font-medium text-gray-600">Name:</div>
                  <div className="w-2/3 font-semibold text-green-600">{employee.name}</div>
                </div>
                <div className="flex border-b border-gray-100 pb-3">
                  <div className="w-1/3 font-medium text-gray-600">Position:</div>
                  <div className="w-2/3 text-gray-900">{employee.position}</div>
                </div>
                <div className="flex border-b border-gray-100 pb-3">
                  <div className="w-1/3 font-medium text-gray-600">Salary:</div>
                  <div className="w-2/3 text-gray-900">{employee.salary}</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 font-medium text-gray-600">Annual Salary:</div>
                  <div className="w-2/3 text-gray-900">{employee.salary * 12}</div>
                </div>
              </div>
            </div>
          </div>
      
      {/* Payroll Table */}
      <div className="overflow-x-auto">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-xs">
            <thead>
            <tr className="bg-green-600 text-white">
                <th className="border border-gray-300 p-1 font-bold text-center" colSpan={26}>Payroll Details</th>
            </tr>
            
            <tr className="bg-green-500 text-white">
                <th className="border border-gray-300 p-1 text-center">Period</th>
                <th className="border border-gray-300 p-1 text-center">Salary</th>
                <th className="border border-gray-300 p-1 text-center">PERA/ADCOM</th>
                <th className="border border-gray-300 p-1 text-center">Tax</th>
                <th className="border border-gray-300 p-1 text-center">Life & Ret.</th>
                <th className="border border-gray-300 p-1 text-center">Medicare</th>
                <th className="border border-gray-300 p-1 text-center">PAG-IBIG</th>
                <th className="border border-gray-300 p-1 text-center">EULI</th>
                <th className="border border-gray-300 p-1 text-center">PB Loan</th>
                <th className="border border-gray-300 p-1 text-center">Calamity</th>
                <th className="border border-gray-300 p-1 text-center">Housing</th>
                <th className="border border-gray-300 p-1 text-center">Veterans</th>
                <th className="border border-gray-300 p-1 text-center">DBP</th>
                <th className="border border-gray-300 p-1 text-center">Consol.</th>
                <th className="border border-gray-300 p-1 text-center">MPL</th>
                <th className="border border-gray-300 p-1 text-center">Emerg.</th>
                <th className="border border-gray-300 p-1 text-center">Policy</th>
                <th className="border border-gray-300 p-1 text-center">GFAL</th>
                <th className="border border-gray-300 p-1 text-center">Educ</th>
                <th className="border border-gray-300 p-1 text-center">PL Opt</th>
                <th className="border border-gray-300 p-1 text-center">Comp.</th>
                <th className="border border-gray-300 p-1 text-center">Due 1-15</th>
                <th className="border border-gray-300 p-1 text-center">Due 16-30</th>
                <th className="border border-gray-300 p-1 text-center">LB 1-15</th>
                <th className="border border-gray-300 p-1 text-center">LB 16-30</th>
                <th className="border border-gray-300 p-1 text-center">Final Amt</th>
            </tr>
            </thead>
            <tbody>
            {employee.info.map((period, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border border-gray-300 p-1">{period.period_covered}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.salary)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.pera_adcom_allow)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.tax)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.life_retirement)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.medicare)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.pagibig_cont)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.euli)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.pagibig_loan)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.pagibig_calamity_loan)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.pagibig_housing_loan)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.veterans_loan)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.dbp_loan)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.consol_salary_loan)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.mpl)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.emergency_loan)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.policy_loan)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.gfal)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.educ)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.policy_loan_opt)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.computer_loan)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.amount_due_1_15)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.amount_due_16_30)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.landbank_loan_due_1_15)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.landbank_loan_due_16_30)}</td>
                <td className="border border-gray-300 p-1 text-right">{formatCurrency(period.amount_due_after_landbank)}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}