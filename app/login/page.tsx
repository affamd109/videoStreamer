"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

       const result =  await signIn("credentials" , {
            email,
            password,
            redirect: false
        })

        if(result?.error){
            console.log(result.error);
        }else{
            router.push("/"); 
        }

    }


  return (
    <div className="flex justify-center items-center min-h-screen text-black px-4">
      <form
        onSubmit={handleSubmit}

        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
            </label>
            <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors" > Sign In   </button>
      </form>
    </div>
  );
}