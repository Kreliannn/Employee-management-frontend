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
    <div  className="relative h-screen bg-cover bg-center"  >
        <div className="w-full bg-green-500 mb-5">
            <div className="m-auto w-5/6">
                <div className="m-auto w-5/6 flex justify-end items-end" >
              
                    <Button variant={"outline"} className="m-2" onClick={() => router.push("adminEmployeePage")}>
                        Manage Employee
                    </Button>

                    <Button variant={"outline"} className="m-2" onClick={() => router.push("adminIndexPaymentPage")}>
                        Index Payment
                    </Button>

                    <Button variant={"destructive"} className="m-2" onClick={() => router.push("/")}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
        <div className="w-5/6 m-auto">
            <div className="w-5/6 m-auto ">
               
                <h1 className=" text-center m-4 text-5xl text-green-700 font-bold"> Index Payment </h1>
            </div>
            <div className="w-5/6 m-auto flex">
                <Input onChange={ searchOnchange }  value={search} placeholder="search Employee Name" className="m-2"/>
                <Button className="m-2 bg-green-500 hover:bg-green-600 text-white" onClick={searchName}> search </Button>
            </div>
            <br /> 
            <Table className="w-5/6 m-auto shadow-lg rounded  ">
                <TableCaption>A list of Employee.</TableCaption>
                <TableHeader  className="bg-green-500    ">
                    <TableRow>
                        <TableHead className="text-white"> Name </TableHead>
                        <TableHead className="text-white"> Salary  </TableHead>
                        <TableHead className="text-white"> Total Deduction </TableHead>
                        <TableHead className="text-white"> Net Amount </TableHead>
                        <TableHead className="text-white text-right"> Edit </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="max-h-96 overflow-y-auto">
                    {employees?.map((employee, index) => (
                    <TableRow key={employee._id} className={index % 2 === 0 ? 'bg-muted' : ''}>
                        <TableCell className="font-semibold">{employee.name}</TableCell>
                        <TableCell>{employee.salary}</TableCell>
                        <TableCell>{0}</TableCell>
                        <TableCell>{0}</TableCell>
                        <TableCell className="flex justify-end items-end"><EditButton employee={employee} setEmployees={setEmployees}/></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
   
  )
}