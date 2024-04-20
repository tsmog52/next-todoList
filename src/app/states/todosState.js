import { atom } from 'recoil';

// inputの値を取得する
export const todosState = atom({
  key: "todosState",
  default: [],
})