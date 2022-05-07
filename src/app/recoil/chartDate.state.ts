import { atom } from 'recoil'

const chartDateState = atom<Date | string>({
  key: "chartDateState",
  default: new Date(),
});

export { chartDateState };
