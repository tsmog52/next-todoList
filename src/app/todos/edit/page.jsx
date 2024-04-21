"use client"

import { useEffect, useRef, useState } from "react"
import PageTitle from "@/app/components/PageTitle";
import { useRecoilValue } from 'recoil';
import { db } from "../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { editTodoIdState, editTodoTitleState } from "@/app/states/editTodoState";
import { useRouter } from "next/navigation";

const Edit = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const editTodoId = useRecoilValue(editTodoIdState);
  const todotitle = useRecoilValue(editTodoTitleState);
  //inputの値
  const [newInputValue, setNewInputValue] = useState(todotitle)

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
    router.push("/todos")
  }

  useEffect(() => {
    inputRef.current.focus()
  }, []);

  return (
    <div>
      <PageTitle title="TODO編集FORM" />
      <div className="flex justify-center">
        <input
          type="text"
          ref={inputRef}
          value={newInputValue}
          onChange={handleEdit}
          className="p-2 bg-gray-100 rounded-md  mr-2"
        />
        <button
          onClick={handleClick}
          text="Edit"
          className="px-5 font-medium tracking-wide text-gray-800 capitalize transition-colors duration-300 transform bg-gray-400 rounded-lg hover:bg-gray-500 text-white focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80"
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default Edit
