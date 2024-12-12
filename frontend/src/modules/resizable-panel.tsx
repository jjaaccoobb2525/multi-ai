import { ResizablePanel } from "@/modules/components/resizable";

import type { ReactNode } from "react";

export const ResizablePanelComponent = ({ children }: { readonly children: ReactNode }) => {
  return (
    <ResizablePanel className="flex flex-col justify-between border-2 border-blue-200 pt-4">
      {children}
    </ResizablePanel>
  );
};
