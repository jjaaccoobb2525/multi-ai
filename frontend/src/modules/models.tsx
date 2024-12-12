"use client";

import { cn } from "@/libs/shadcn/utils";
import { ResizableHandle, ResizablePanel } from "@/modules/components/resizable";
import { gpt } from "@/server/gpt";
import { userInputStateAtom } from "@/utilities/recoil/atoms/no-storage";

import Image from "next/image";
import { useRecoilState } from "recoil";

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

const AiProfile = ({ name, madeBy, icon }: { name: string; madeBy: string; icon: string }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg p-2">
      <Image
        alt=""
        width={32}
        height={32}
        src={`/icons/${icon}`}
      />
      <p>{`${madeBy}: ${name}`}</p>
    </div>
  );
};

export default function ModelsArea() {
  const [userInput, setUserInput] = useRecoilState(userInputStateAtom);

  return (
    <>
      {models.map(({ id, name, madeBy, icon, func }, index) => {
        return (
          <>
            <ResizablePanel
              className={cn(
                "flex min-w-[200px] flex-col items-center justify-start gap-4 bg-blue-200 pt-4",
                userInput && "items-start"
              )}
            >
              {userInput ? (
                <div
                  className="flex h-[44px] w-full items-center gap-4 rounded-lg bg-zinc-200 p-2"
                >
                  <Image
                    height={24}
                    width={24}
                    src={`/icons/${icon}`}
                    alt=""
                  />
                  <p className="w-full text-left">{func}</p>
                </div>
              ) : (
                <AiProfile
                  name={name}
                  madeBy={madeBy}
                  icon={icon}
                />
              )}
            </ResizablePanel>
            {index !== models.length - 1 && <ResizableHandle />}
          </>
        );
      })}
    </>
  );
}
