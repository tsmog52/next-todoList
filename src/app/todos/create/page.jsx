"use client"

import PageTitle from "@/app/components/PageTitle";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputValueState } from "@/app/states/inputValueState";
import { todosState } from "@/app/states/todosState";
import { db } from "../../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";


const Create = (props) => {
  // inputの情報を取得する
  const [inputValue, setInputValue] = useRecoilState(inputValueState);
  // 一覧の取得
  const [todos] = useRecoilValue(todosState);
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus()
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  // Firestoreのコレクションにデータを追加
  const dataToAdd = {
    title: inputValue,
    time: serverTimestamp(), //現在のサーバー側の時刻を取得
    status: false
  };

  const handleAddData = async (id) => {
      try {
        if(inputValue === "") {
          alert("入力してください")
          return
        }
        const docRef = await addDoc(collection(db, "todos"), dataToAdd);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setInputValue("")
      router.push("/todos")
  }

  return (
    <div>
      <PageTitle title='TODO作成FORM'/>
      <form
        onSubmit={(e) => {e.preventDefault()}}
      >
        <div className="flex justify-center">
          <input
            type="text"
            placeholder='新規TODOを作成'
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            className="p-2 bg-gray-100 rounded-md  mr-3"
          />
          <button
            text="Add"
            className="px-5 font-medium tracking-wide text-gray-800 capitalize transition-colors duration-300 transform bg-gray-400 rounded-lg hover:bg-gray-500 text-white focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            onClick={handleAddData}
          >
              Add
          </button>
        </div>
      </form>
    </div>
    )
  }

export default Create
