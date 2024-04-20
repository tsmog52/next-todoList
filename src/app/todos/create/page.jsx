"use client"

import PageTitle from "@/app/components/PageTitle";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputValueState } from "@/app/states/inputValueState";
import { todosState } from "@/app/states/todosState";
import { db } from "../../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Link from 'next/link';

const page = () => {
  // inputの情報を取得する
  const [inputValue, setInputValue] = useRecoilState(inputValueState);
  // 一覧の取得
  const [todos] = useRecoilValue(todosState);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }
  
  // Firestoreのコレクションにデータを追加
  const dataToAdd = {
    title: inputValue,
    time: serverTimestamp(), //現在のサーバー側の時刻を取得
    status: false
  };

  // Q formとLinkどちらに設置するべきか
  const handleAddData = async (id) => {
      try {
        const docRef = await addDoc(collection(db, "todos"), dataToAdd);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setInputValue("")
  }

  return (
    <div>
      <PageTitle title='TODO作成FORM'/>
      <form onSubmit={(e) => {
        e.preventDefault() //必要か？
      }}>
        <input 
          type="text" 
          placeholder='新規TODOを作成' 
          value={inputValue}
          onChange={handleChange}
          // ref={inputRef}
          className="p-1 bg-gray-100 rounded-md mb-2 mr-3"
        />
        <Link href="/todos"
          className='p-3 bg-blue-400 rounded-md text-white hover:bg-blue-500'
          onClick={handleAddData}
        >
          Add
        </Link >
      </form>
    </div>
    )
  }

export default page
