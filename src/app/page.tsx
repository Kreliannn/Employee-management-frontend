"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div >
        <h1 className="bg-blue-800 m-auto text-2xl text-white">  home </h1>
        <Button variant={"default"} className="m-2.5" onClick={() => router.push("pages/addEmployee")}> add employee </Button>
        <Button variant={"outline"} className="m-2.5" onClick={() => router.push("pages/viewEmployee")}> view employee</Button>
    </div>
  );
}
