import { atom } from 'recoil';

const collapsedTableState = atom({
  key: "collapsedTableState",
  default: false,
});

export { collapsedTableState };
