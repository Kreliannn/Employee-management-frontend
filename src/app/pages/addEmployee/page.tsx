"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { employeeInterface } from "@/types/employeeInterface";


export default function Page()
{
    const { register, handleSubmit } = useForm<employeeInterface>()

    const mutation = useMutation({
        mutationFn : (data: employeeInterface) => axios.post("http://localhost:5000/employee", data),
        onSuccess : (response) => alert(response.data),
        onError : (err : { request : { response : string}}) => alert(err.request.response)
    })

    const onSubmit = (data : employeeInterface) => {
        mutation.mutate(data)
    }


    return(
        <div className="m-10">
            <form  onSubmit={handleSubmit(onSubmit)} className="bg-stone-50 shadow-lg m-auto p-10">
                <Input  
                    {...register("name")}
                    className="m-2  "
                    placeholder="Employee Name" 
                /> 
                <Input  
                    {...register("email")}
                    className="m-2  "
                    placeholder="Employee email" 
                /> 
                <Input  
                    {...register("contact")}
                    className="m-2  "
                    placeholder="Employee contact" 
                /> 
                <Input  
                    {...register("age")}
                    className="m-2  "
                    placeholder="Employee age" 
                /> 
                <Input  
                    {...register("work")}
                    className="m-2  "
                    placeholder="Employee work" 
                /> 
                <Input  
                    {...register("salary")}
                    className="m-2  "
                    placeholder="Employee salary" 
                /> 
                <Button type={"submit"} variant={"default"} className=" w-full m-2">
                    Submit
                </Button>
            </form>
           

        </div>
    )
}
