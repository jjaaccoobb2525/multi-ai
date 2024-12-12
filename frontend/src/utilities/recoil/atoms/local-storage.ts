import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "localStorageAtom",
  storage: typeof window !== "undefined" ? window.localStorage : undefined
});
