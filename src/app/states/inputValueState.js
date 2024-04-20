import { atom } from 'recoil';

// inputの値を取得する
export const inputValueState = atom({
  key: "inputValueState",
  default: "",
})