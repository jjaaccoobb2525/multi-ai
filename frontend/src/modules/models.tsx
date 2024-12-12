import { ResizableHandle, ResizablePanel } from "@/modules/components/resizable";

import Image from "next/image";

const models = [
  {
    id: 0,
    name: "ChatGPT",
    madeBy: "OpenAI",
    icon: "gpt.svg"
  },
  {
    id: 1,
    name: "Gemini",
    madeBy: "Google",
    icon: "gemini.svg"
  },
  {
    id: 2,
    name: "Claude",
    madeBy: "Anthropic",
    icon: "claude.svg"
  }
];

export default function ModelsArea() {
  return (
    <>
      {models.map(({ id, name, madeBy, icon }, index) => {
        return (
          <>
            <ResizablePanel
              className="flex items-start justify-center border-2 border-blue-200 pt-4"
            >
              <Image
                alt=""
                width={32}
                height={32}
                src={`/icons/${icon}`}
              />
              {`${madeBy}: ${name}`}
            </ResizablePanel>
            {index !== models.length - 1 && <ResizableHandle />}
          </>
        );
      })}
    </>
  );
}
