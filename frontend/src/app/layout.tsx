import NextThemesProvider from "@/libs/next-themes/next-themes-provider";
import "@/styles/globals.css";
import RecoilProvider from "@/utilities/recoil/recoil-provider";

import type { ReactNode } from "react";

export { metadata } from "@/metadata/metadata";

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <RecoilProvider>
      <html lang="ko">
        <body className="h-screen w-screen">
          <NextThemesProvider>{children}</NextThemesProvider>
        </body>
      </html>
    </RecoilProvider>
  );
}
