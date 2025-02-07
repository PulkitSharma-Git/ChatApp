"use client"
import { InputBox } from "@repo/ui/inputBox" //Card is actually a button
import { Button } from "@repo/ui/Button" //Button is actually a card
import { Card } from "@repo/ui/Card";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function Page() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
 
  return (
   <div className="flex items-center justify-center h-screen w-screen">
    <Button>


    <InputBox type="text" variant="first" placeholder="Email" onChange={ (e) => {
      setEmailInput(e.target.value)

    }}></InputBox>

    <InputBox type="password" variant="first" placeholder="Password" onChange={ (e) => {
      setPasswordInput(e.target.value)
    }}></InputBox>

    <Card onClick={ async ()=> {
        const response = await axios.post("http://localhost:3001/signin", {
            email: emailInput,
            password: passwordInput,
        })
      localStorage.setItem("token", response.data.token);
      router.push("/join");

    }} text="Sign In"></Card>
    </Button>
   </div>
  );
}
