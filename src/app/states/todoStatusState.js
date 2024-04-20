import { atom } from 'recoil';

// completeボタンのid値を取得する
export const todoStatusState = atom({
  key: "todoStatusState",
  default: [],
})