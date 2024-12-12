import { ResizableHandle, ResizablePanel } from "@/modules/components/resizable";
import { gpt } from "@/server/gpt";

import Image from "next/image";

const models = [
  {
    id: 0,
    name: "ChatGPT",
    madeBy: "OpenAI",
    icon: "gpt.svg",
    func: "gpt"
  },
  {
    id: 1,
    name: "Gemini",
    madeBy: "Google",
    icon: "gemini.svg",
    func: "gemini"
  },
  {
    id: 2,
    name: "Claude",
    madeBy: "Anthropic",
    icon: "claude.svg",
    func: "claude"
  }
];

export default function ModelsArea() {
  return (
    <>
      {models.map(({ id, name, madeBy, icon, func }, index) => {
        return (
          <>
            <ResizablePanel className="flex flex-col items-center justify-start gap-4 pt-4">
              <div className="flex items-center">
                <Image
                  alt=""
                  width={32}
                  height={32}
                  src={`/icons/${icon}`}
                />
                <p>{`${madeBy}: ${name}`}</p>
              </div>
              <p className="w-full text-left">{func}</p>
            </ResizablePanel>
            {index !== models.length - 1 && <ResizableHandle />}
          </>
        );
      })}
    </>
  );
}
