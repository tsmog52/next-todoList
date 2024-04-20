"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link";
import PageTitle from "@/app/components/PageTitle";
import { useRecoilState, useRecoilValue } from 'recoil';
import { db } from "../../../../firebase"; 
import { doc, updateDoc } from "firebase/firestore";
import { editTodoIdState } from "@/app/states/editTodoIdState";

const page = () => {
  const inputRef = useRef(null);
  const editTodoId = useRecoilValue(editTodoIdState)
  //inputの値
  const [newInputValue, setNewInputValue] = useState("")
  
  const handleEdit = (e) => {
    setNewInputValue(e.target.value)
  }

  const dataToEdit = {
    title: newInputValue,
  };

  const handleClick = async () => { 
    try {
      const newTitle = doc(db, "todos", editTodoId);
      if(newInputValue !== "") {
        await updateDoc(newTitle, dataToEdit)
      } else {
        alert("入力してください")
      }
    } catch(error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, []);

  return (
    <div>
      <PageTitle title="TODO編集FORM" />
      <input 
        type="text" 
        ref={inputRef}
        value={newInputValue}
        onChange={handleEdit}
        className="p-1 bg-gray-100 rounded-md mb-2"
      />
      <Link 
        href="/todos"
        className="px-3 py-2 ml-2 bg-blue-400 rounded-md text-white hover:bg-blue-500"
        onClick={handleClick}
      >
        edit
      </Link>
    </div>

  )
}


export default page
