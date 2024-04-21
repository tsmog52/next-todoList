"use client"

import Link from 'next/link';
import PageTitle from '@/app/components/PageTitle';
import {  collection, onSnapshot, doc, deleteDoc, updateDoc, orderBy, query, } from "firebase/firestore";
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { db } from '../../../firebase';
import { useRecoilState } from 'recoil';
import { todosState } from '../states/todosState';
import { editTodoIdState, editTodoTitleState } from '../states/editTodoState';
import { todoStatusState } from '../states/todoStatusState';
import { useRouter } from 'next/navigation';

const Todos =  () => {
  //情報を保持するstateを用意する
  const [todos, setTodos] = useRecoilState(todosState)
  // editを押したIDを取得
  const [editTodoId, setEditTodoId] = useRecoilState(editTodoIdState)
  //completeを押したIDを取得
  const [todoStatus, setTodoStatus] = useRecoilState(todoStatusState)
  const [todoTitle, setTodoTitle] = useRecoilState(editTodoTitleState)
  const router = useRouter();

  // データを取得する
  useEffect(() => {
    //timestamp順にする
    const queryRef = query(collection(db, "todos"), orderBy("time", "desc"));
    onSnapshot(queryRef, (querySnapshot) => {
      const todo = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        status: doc.data().status,
        time: doc.data().time ? dayjs(doc.data().time.toDate()).format('YYYY/MM/DD') : null
      }))
      setTodos(todo)
      setTodoStatus(todo.status)
    });
  }, [])

  const handleEdit = (id, title) => {
    setEditTodoId(id)
    setTodoTitle(title)
    console.log(todoTitle);
    router.push("/todos/edit")
  }

  //特定の要素を削除する機能
    const handleDelete =  async (id) => {
        await deleteDoc(doc(db, "todos", id))
    };

    //statusをtrueに変更する
    const handleChangeStatus = async (id) => {
      try {
        const changeStatus = doc(db, "todos", id);
        await updateDoc(changeStatus, { status: true});
      } catch(error) {
        console.log(error.message);
      }
    }

    //statusをfalseに変更する
    const handleRemove = async (id) => {
      try {
        const changeStatus = doc(db, "todos", id);
        await updateDoc(changeStatus, { status: false});
      } catch(error) {
        console.log(error.message);
      }
    }

  return (
      <>
        <Link
          href='/todos/create'
          className='block w-30 absolute top-2 right-4 px-6 py-3  bg-gray-200 rounded-md text-gray-800 hover:bg-gray-500 hover:text-white '
          >
          TODOを追加
        </Link>
        <PageTitle
          title='TODO一覧'
          className='flex justify-center'
        />
          {todos.map((todo) => (
            <div key={todo.id}>
              <div
                className="flex w-full mx-auto  max-w-sm mb-10 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
              >
              <div className="flex items-center justify-center w-12 bg-emerald-500">
                {todo.status && (
                  <svg
                    className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                  </svg>
                )}
              </div>

              <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                  <p className="text-xl dark:text-gray-400">
                    { todo.title }
                  </p>
                  <div className='flex'>
                    <button
                      className='text-gray-600 pr-3 duration-100 hover:font-bold'
                      onClick={() => handleEdit(todo.id, todo.title)}
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className='text-gray-600 pr-3 duration-100 hover:font-bold'
                    >
                        Delete
                    </button>
                    {todo.status ? (
                      <button
                        className='text-gray-600 pr-4 visited:text-purple-600 duration-100
                        hover:font-bold'
                        onClick={() => handleRemove(todo.id)}
                      >
                        remove
                      </button>
                    ) : (
                      <button
                        className='text-gray-600 pr-4 visited:text-purple-600 duration-100
                        hover:font-bold'
                        onClick={() => handleChangeStatus(todo.id)}
                      >
                        complete
                      </button>
                    )}
                    <p className='block text-sm pt-1 text-gray-600'>{todo.time}</p>
                  </div>
                </div>
              </div>
            </div>
          <div>
        </div>
      </div>
    ))}
  </>
)
}

export default Todos
