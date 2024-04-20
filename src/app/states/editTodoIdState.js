import { atom } from 'recoil';

// idの値を保持する
export const editTodoIdState = atom({
  key: "editTodoIdState",
  default: "",
})