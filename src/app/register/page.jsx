"use client"

import { useRouter } from 'next/navigation'
import PageTitle from '../components/PageTitle';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

const Register = () => {
  const router = useRouter();
  //ユーザー
  const [registerUserName, setRegisterUserName] = useState("")
  //email
  const [registerEmail, setRegisterEmail] = useState("");
  //password
  const [registerPassword, setRegisterPassword] = useState("");

  const [user, setUser] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch(error) {
      alert("正しく入力してください")
    }
    router.push("/")
    setRegisterUserName("")
    setRegisterEmail("")
    setRegisterPassword("")
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);


  return (
    <>
      <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form
            className="w-full max-w-md"
            onSubmit={handleSubmit}
          >

        <div className="flex items-center justify-center mt-6">
          <PageTitle title="新規登録FORM" />
        </div>

        <div className="relative flex items-center mt-8">
          <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300
            dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          </span>

          <input
            type="text"
            name='name'
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Username"
            value={registerUserName}
            onChange={(e) => setRegisterUserName(e.target.value)}
          />
        </div>

        <div className="relative flex items-center mt-6">
          <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          </span>

          <input
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Email address"
          />
        </div>

        <div className="relative flex items-center mt-4">
          <span className="absolute">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
        </svg>
        </span>

          <input
            type="password"
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="Password" />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
            </svg>
            </span>

            <input
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirm Password"
            />
            </div>

            <div className="mt-6">
              <button
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                    新規登録
              </button>

              <div className="mt-6 text-center ">
                <button
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  ログインはこちら
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </>
  )
}

export default Register
