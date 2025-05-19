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
import { employeeGetInterface } from "@/types/employeeInterface"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
 
export function EditButton({employee, setEmployees} : { employee : employeeGetInterface, setEmployees :  React.Dispatch<React.SetStateAction<employeeGetInterface[]>>}) {
    
    const _id = employee._id
    const [name, setName] = useState(employee.name)
    const [position, setPosition] = useState(employee.position)
    const [department, setDepartment] = useState(employee.department)
    const [salary, setSalary] = useState(employee.salary)


    const mutationUpdate = useMutation({
        mutationFn : (data : employeeGetInterface) => axios.put("http://localhost:5000/employee", data),
        onSuccess : (response : { data : employeeGetInterface[]} ) => setEmployees(response.data),
        onError : (err : { request : { response : string}}) => alert(err.request.response)
    })

    const mutationDelete = useMutation({
      mutationFn : (id : string) => axios.delete("http://localhost:5000/employee/" + id),
      onSuccess : (response : { data : employeeGetInterface[]} ) => setEmployees(response.data),
      onError : (err : { request : { response : string}}) => alert(err.request.response)
  })

    const saveFunction = () => mutationUpdate.mutate({_id, name, position, department, salary})
    const deleteFunction = () => mutationDelete.mutate(_id)
  
    return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your Employee here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

          <div className=" rounded-lg p-6 shadow-sm w-5/6 m-auto">
            <div className="grid gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" onChange={(e) => setName(e.target.value)} value={name} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" onChange={(e) => setPosition(e.target.value)} value={position} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" onChange={(e) => setDepartment(e.target.value)} value={department} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" type="number" onChange={(e) => setSalary(Number(e.target.value))} value={salary} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button  onClick={saveFunction}>
                Save Changes
              </Button>
              <Button  variant="destructive" onClick={deleteFunction}>
                Delete
              </Button>
              
            </div>
          </div>


        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit"> Close </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}