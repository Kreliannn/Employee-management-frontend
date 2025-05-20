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
import { EditButton } from "./components/editPopUp"
import { getTotalDeduction, getTotalNet } from "@/app/util/func"
import { bgStyle } from "@/app/util/func"
import { Search, View } from "lucide-react" 


export default  function IndexPayment() {

    const router = useRouter()

    const [data, setData] = useState<employeeGetInterface[]>([])
    const [employees, setEmployees] = useState<employeeGetInterface[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const respone = await axios.get("http://localhost:5000/employee")
            setData(respone.data)
            setEmployees(respone.data)
            console.log(employees)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const respone = await axios.get("http://localhost:5000/employee")
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
                }}> Index Payment </h1>
            </div>
            <div className="w-5/6 m-auto flex">
                <Input onChange={ searchOnchange }  value={search} placeholder="search Employee Name" className="m-2 bg-white"/>
                <Button className=" m-2 bg-green-500 hover:bg-green-600 text-white" onClick={searchName}> <Search className=" h-4 w-4" /> Search </Button>
            </div>
            <br /> 
            <div className="w-5/6 m-auto shadow-lg  rounded-lg h-[430px] overflow-auto">
                <Table className=" rounded-lg  ">
                    <TableHeader  className="bg-green-500    ">
                        <TableRow>
                            <TableHead className="text-white"> Name </TableHead>
                            <TableHead className="text-white"> Salary  </TableHead>
                            <TableHead className="text-white"> Total Deduction </TableHead>
                            <TableHead className="text-white"> Net Amount </TableHead>
                            <TableHead className="text-white text-center"> View</TableHead>
                            <TableHead className="text-white text-center"> Edit </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-96 overflow-y-auto">
                        {employees?.map((employee, index) => (
                        <TableRow key={employee._id} className={index % 2 === 0 ? 'bg-stone-100 hover:bg-stone-100' : 'bg-stone-200 hover:bg-stone-200 ' }>
                            <TableCell className="font-semibold">{employee.name}</TableCell>
                            <TableCell>{"₱ " + employee.salary}</TableCell>
                            <TableCell>{"₱ " + getTotalDeduction(employee.info)}</TableCell>
                            <TableCell>{"₱ " +getTotalNet(employee.info)}</TableCell>
                            <TableCell className="w-10"> 
                                <Button variant={"default"} onClick={() => router.push(`adminEmployeeInfo/${employee._id}`)}> <View className=" h-4 w-4" /> View </Button>
                            </TableCell>
                            <TableCell className="w-10">
                                <EditButton employee={employee} setEmployees={setEmployees}/>
                                </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
           
        </div>
    </div>
   
  )
}