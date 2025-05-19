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
import { getEmployeeInterface } from "@/types/employeeInterface"
import { EditButton } from "./components/editPopUp"
import { Button } from "@/components/ui/button"

 
export default  function TableDemo() {

    const [employees, setEmployees] = useState<getEmployeeInterface[]> ()

    useEffect(() => {
        const fetch = async () => {
            const respone = await axios.get("http://localhost:5000/employee")
            setEmployees(respone.data)
            console.log(employees)
        }
        fetch()
    }, [])
   

  return (
    <div >
        <Button> back </Button>
        <Table className="w-5/6 m-auto shadow-lg">
            <TableCaption>A list of Employee.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead > Name </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead >Contact</TableHead>
                <TableHead >Work</TableHead>
                <TableHead >Salary</TableHead>
                <TableHead > Edit </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {employees?.map((employee) => (
                <TableRow key={employee._id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.age}</TableCell>
                    <TableCell>{employee.contact}</TableCell>
                    <TableCell>{employee.work}</TableCell>
                    <TableCell>{employee.salary}</TableCell>
                    <TableCell> 
                        <EditButton employee={employee} employees={employees} setEmployees={}/>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
   
  )
}