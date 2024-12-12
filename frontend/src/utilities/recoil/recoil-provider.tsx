"use client";

import type { ReactNode } from "react";
import { RecoilRoot } from "recoil";

export default function RecoilProvider({ children }: { readonly children: ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
