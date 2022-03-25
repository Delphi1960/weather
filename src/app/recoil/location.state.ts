import { atom } from 'recoil'

import { LocalStorageManager } from '../utils'

export const nameLocation = atom({
  key: "nameLocation",
  default: LocalStorageManager.getItem("location") ?? "Одесса",
});
