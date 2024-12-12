"use client";

import { Textarea } from "@/modules/components/textarea";
import { userInputStateAtom } from "@/utilities/recoil/atoms/no-storage";

import Image from "next/image";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function UserInputArea() {
  const [userInput, setUserInput] = useRecoilState(userInputStateAtom);
  const [pressEnter, setPressEnter] = useState(false);

  return (
    <div className="flex w-[400px] flex-col justify-between rounded-lg bg-zinc-200 p-4">
      <div>
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
      </div>
      <Textarea
        onChange={(e) => pressEnter && setUserInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.shiftKey) {
              setPressEnter(false);

              return;
            }

            setPressEnter(true);
          } else {
            setPressEnter(false);
          }
        }}
        className="w-full resize-none transition-shadow duration-300 focus-within:shadow-lg
hover:shadow-lg"
      />
    </div>
  );
}
