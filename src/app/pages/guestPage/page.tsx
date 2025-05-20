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
import { bgStyle } from "@/app/util/func"
import { Search } from "lucide-react" 

export default  function TableDemo() {

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
        <div className="w-full mb-5">
            <div className="m-auto w-5/6">
                <div className="m-auto w-5/6 flex justify-start items-start" >
                    <Button variant={"destructive"} className="m-2 mt-5" onClick={() => router.push("/")}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
        <div className="w-5/6 m-auto">
            <div className="w-5/6 m-auto ">
                <h1 className=" text-center m-4 text-6xl text-white font-bold"  style={{
                    WebkitTextStroke: '2px green', // Tailwind green-500
                }}> Employee List </h1>
            </div>
            <div className="w-5/6 m-auto flex">
                <Input onChange={ searchOnchange }  value={search} placeholder="search Employee Name" className="m-2 bg-white"/>
                <Button className="m-2 bg-green-500 hover:bg-green-600 text-white" onClick={searchName}> <Search className=" h-4 w-4" /> Search </Button>
            </div>
            <br /> 
            <div className="w-5/6 m-auto shadow-lg  h-[430px] overflow-auto rounded-lg">
                <Table className=" rounded-lg  ">
                    <TableHeader  className="bg-green-500    ">
                        <TableRow>
                            <TableHead className="text-white"> Name </TableHead>
                            <TableHead className="text-white"> Position </TableHead>
                            <TableHead className="text-white"> Department </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-96 overflow-y-auto">
                        {employees?.map((employee, index) => (
                        <TableRow key={employee._id} className={index % 2 === 0 ? 'bg-stone-100 hover:bg-stone-100' : 'bg-stone-200 hover:bg-stone-200 ' }>
                            <TableCell className="font-semibold">{employee.name}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
           
        </div>
    </div>
   
  )
}