import { atom } from 'recoil';

const loadState = atom({
  key: "loadState",
  default: true,
});

export { loadState };
