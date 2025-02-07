"use client"
import { InputBox } from "@repo/ui/inputBox" //Card is actually a button
import { Button } from "@repo/ui/Button" //Button is actually a card
import { Card } from "@repo/ui/Card";
import { useState } from "react";
import axios from "axios";
import Link from 'next/link'



export default function Page() {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/signup",
        {
          name: nameInput,
          email: emailInput,
          password: passwordInput,
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed. Please try again.");
    }
  };
 
  return (
   <div className="flex items-center justify-center h-screen w-screen">
    <Button>

    <InputBox type="text" variant="first" placeholder="Name" onChange={ (e) => {
      setNameInput(e.target.value)

    }}></InputBox>

    <InputBox type="text" variant="first" placeholder="Email" onChange={ (e) => {
      setEmailInput(e.target.value)

    }}></InputBox>

    <InputBox type="password" variant="first" placeholder="Password" onChange={ (e) => {
      setPasswordInput(e.target.value)
    }}></InputBox>

    <Link href="/signin">
    <Card onClick={handleSignUp}text="Sign Up"></Card>
    </Link>
    </Button>
   </div>
  );
}
