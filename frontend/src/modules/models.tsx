"use client";

import { cn } from "@/libs/shadcn/utils";
import { gpt } from "@/server/gpt";
import { userInputStateAtom } from "@/utilities/recoil/atoms/no-storage";

import Image from "next/image";
import { Draggable } from "react-drag-reorder";
import { Rnd } from "react-rnd";
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
    <div className="flex w-full items-center gap-2 rounded-lg bg-white p-2">
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
    <div className="flex w-full gap-8">
      {models.map(({ id, name, madeBy, icon, func }, index) => {
        return (
          <div
            key={id}
            className="h-full min-w-[300px]"
          >
            <Rnd
              disableDragging
              enableResizing={{
                right: true,
                left: false,
                top: false,
                bottom: false
              }}
              className={cn(
                "!static min-h-full min-w-full rounded-lg bg-zinc-200 p-4",
                userInput && "items-start"
              )}
            >
              {userInput ? (
                <div className="flex h-[44px] w-full items-center gap-4 rounded-lg bg-white p-2">
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
            </Rnd>
          </div>
        );
      })}
    </div>
  );
}
