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
import { employeeGetInterface, employeeAddInterface } from "@/types/employeeInterface"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { errorAlert, successAlert } from "@/app/util/sweetAlert"
import { Plus } from "lucide-react";
 
export function AddButton({ setEmployees} : { setEmployees :  React.Dispatch<React.SetStateAction<employeeGetInterface[]>>}) {
    
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [department, setDepartment] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState(0)


    const mutation = useMutation({
        mutationFn : (data : employeeAddInterface) => axios.post("http://localhost:5000/employee", data),
        onSuccess : (response : { data : employeeGetInterface[]} ) => {
          setEmployees(response.data)
          successAlert("Employee Added")
        },
        onError : (err : { request : { response : string}}) => errorAlert(err.request.response)
    })


    const addFunction = () => {
        mutation.mutate({ name, position, department, salary, email, contact})
        setOpen(false)
        setName("")
        setPosition("")
        setSalary(0)
        setDepartment("")
    }
  
  
    return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)} asChild >
        <Button size={"lg"} variant="default"> <Plus className=" h-4 w-4" /> Add Employee</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Employee</SheetTitle>
          <SheetDescription>
            you can add employee here. Click add employee when you're done.
          </SheetDescription>
        </SheetHeader>

          <div className=" rounded-lg p-6 shadow-sm w-5/6 m-auto">
            <div className="grid gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Surname Firstname Mi"/>
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

              <div className="flex flex-col gap-2">
                <Label htmlFor="">Email</Label>
                <Input id="Email"  onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>


              <div className="flex flex-col gap-2">
                <Label htmlFor="">Contact</Label>
                <Input id="salary" type="number" onChange={(e) => setContact(e.target.value)} value={contact} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button  onClick={addFunction}>
                    Add Employee
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