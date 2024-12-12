import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/modules/components/resizable";

import Image from "next/image";

const models = [
  {
    id: 0,
    name: "ChatGPT",
    madeBy: "OpenAI",
    icon: "/assets/gpt.svg"
  },
  {
    id: 1,
    name: "Gemini",
    madeBy: "Google",
    icon: "/assets/gpt.svg"
  }
];

export const Content = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      {models.map(({ id, name, madeBy, icon }, index) => {
        return (
          <>
            <ResizablePanel>{name}</ResizablePanel>

            {id !== 1 && <ResizableHandle withHandle />}
          </>
        );
      })}
    </ResizablePanelGroup>
  );
};
