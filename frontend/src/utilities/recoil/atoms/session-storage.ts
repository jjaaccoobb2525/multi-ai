import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorageAtom",
  storage: typeof window !== "undefined" ? window.sessionStorage : undefined
});
