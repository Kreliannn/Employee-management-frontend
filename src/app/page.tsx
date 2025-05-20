
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { errorAlert } from "./util/sweetAlert";
import { bgStyle } from "./util/func"



export default function LoginPage() {

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submit = () => {
    if(username == "admin" && password == "123")
    {
      router.push("pages/adminEmployeePage")
    }
    else if(username == "guest" && password == "123")
    {
      router.push("pages/guestPage")
    }
    else
    {
      errorAlert("Invalid Credentials")
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50" style={bgStyle}>
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Login as Admin/Guest</h2>
          <p className="mt-2 text-sm text-gray-600">Enter credentials below</p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full"
            />
          </div>

          <Button onClick={submit} className="w-full">
            Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}

