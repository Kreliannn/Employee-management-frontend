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
import { confirmAlert, errorAlert, successAlert } from "@/app/util/sweetAlert"
import { Edit } from "lucide-react"

export function EditButton({employee, setEmployees} : { employee : employeeGetInterface, setEmployees :  React.Dispatch<React.SetStateAction<employeeGetInterface[]>>}) {
    
    const [open, setOpen] = useState(false);

    const _id = employee._id
    const [name, setName] = useState(employee.name)
    const [position, setPosition] = useState(employee.position)
    const [department, setDepartment] = useState(employee.department)
    const [salary, setSalary] = useState(employee.salary)
    const [filename, setFilename] = useState(employee.filename)
    const [info, setInfo] = useState(employee.info)
    const [contact, setContact] = useState(employee.contact)
    const [email, setEmail] = useState(employee.email)

    const mutationUpdate = useMutation({
        mutationFn : (data : employeeGetInterface) => axios.put("http://localhost:5000/employee", data),
        onSuccess : (response : { data : employeeGetInterface[]} ) => {
          setEmployees(response.data)
          successAlert("updated Successfuly")
        },
        onError : (err : { request : { response : string}}) => errorAlert(err.request.response)
    })

    const mutationDelete = useMutation({
      mutationFn : (id : string) => axios.delete("http://localhost:5000/employee/" + id),
      onSuccess : (response : { data : employeeGetInterface[]} ) => setEmployees(response.data),
      onError : (err : { request : { response : string}}) => errorAlert(err.request.response)
  })

    const saveFunction = () =>  {
      confirmAlert("you want to updated employee?.", "Save Changes" , () => {
        mutationUpdate.mutate({_id, name, position, department, salary, filename, info, contact, email})
      }) 
      setOpen(false)
    }
    const deleteFunction = () => {
      confirmAlert("data will be deleted permanently.", "delete" , () => {
        mutationDelete.mutate(_id) 
      }) 
      setOpen(false)
    }
  
    return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)} asChild>
        <Button variant="outline"> <Edit className=" h-4 w-4" />  Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit {name} </SheetTitle>
          <SheetDescription>
            Make changes to your Employee here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

          <div className=" rounded-lg p-6 shadow-sm w-5/6 m-auto">
            <div className="grid gap-6 mb-6">

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
            <Button type="submit" variant={"outline"}> Close </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}