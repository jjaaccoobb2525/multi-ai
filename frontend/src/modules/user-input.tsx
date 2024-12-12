"use client";

import { Textarea } from "@/modules/components/textarea";
import { userInputStateAtom } from "@/utilities/recoil/atoms/no-storage";

import Image from "next/image";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { useRecoilState } from "recoil";

export default function UserInputArea() {
  const [userInput, setUserInput] = useRecoilState(userInputStateAtom);
  const [pressEnter, setPressEnter] = useState(false);

  return (
    <div className="h-full">
      <Rnd
        disableDragging
        enableResizing={{
          right: true,
          left: false,
          top: false,
          bottom: false
        }}
        className="!static !flex min-h-full min-w-[300px] flex-col justify-start rounded-lg
bg-zinc-200 p-4"
      >
        {userInput && (
          <div
            className="flex items-center justify-start gap-4 rounded-lg bg-white p-2 text-right"
          >
            <div className="rounded-full border-2 border-black">
              <Image
                src="/assets/user.png"
                height={24}
                width={24}
                alt=""
              />
            </div>
            <p>{userInput}</p>
          </div>
        )}
        <Textarea
          onChange={(e) => pressEnter && setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.shiftKey) {
                setPressEnter(false);

                return;
              } else {
                setPressEnter(true);
              }
            } else {
              setPressEnter(false);
            }
          }}
          className="absolute bottom-4 w-[90%] resize-none transition-shadow duration-300
focus-within:shadow-lg hover:shadow-lg"
        />
      </Rnd>
    </div>
  );
}
