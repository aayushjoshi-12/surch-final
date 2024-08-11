"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useStateContext } from "@/contexts/ContextProvider";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import AnswerComponent from "./answerComponent";

export function PlaceholdersAndVanishInputDemo() {
  const [query, setQuery] = useState("");
  const { load, setLoad } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useUser();
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  useEffect(() => {
    setQuery(query)
  },[load])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    // e.preventDefault();
    setIsLoading(true);

    try {
      const payLoad = {
        query,
        userId: user?.id,
      }
      
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/`, payLoad)
      setLoad({query,data: res.data.answer});

    } catch (error: any) {
      console.log("Internal error")
    }
    setIsLoading(false)
    
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-6  text-xl text-center sm:text-5xl dark:text-white text-black font-extralight">
        Ask SurchAI anything!
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      {user ? (<AnswerComponent isLoading={isLoading} load={load}/>) : 
     <div className="text-center text-sm font-medium text-gray-600 mt-2 dark:text-gray-400">
       Please log in to chat with SurchAI.
     </div>}
      
    </div>
  );
}
