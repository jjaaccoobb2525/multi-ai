"use client";

import { userInputStateAtom } from "@/utilities/recoil/atoms/no-storage";

import Image from "next/image";
import { Rnd } from "react-rnd";
import { useRecoilState } from "recoil";

export default function UserInputArea() {
  const [userInput, setUserInput] = useRecoilState(userInputStateAtom);

  return (
    <div id="userInput">
      <Rnd
        disableDragging
        enableResizing={{
          right: true,
          left: false,
          top: false,
          bottom: false
        }}
        className="!static !flex min-w-[300px] flex-col justify-start rounded-lg bg-zinc-200
p-4"
      >
        {userInput ? (
          <div
            className="flex items-center justify-start gap-4 rounded-lg bg-white p-2
text-right"
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
        ) : (
          <div
            className="flex items-center justify-start gap-4 rounded-lg bg-white p-2
text-right"
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
      </Rnd>
    </div>
  );
}
