"use client";

import { Textarea } from "@/modules/components/textarea";
import { userInputStateAtom } from "@/utilities/recoil/atoms/no-storage";

import { useState } from "react";
import { useRecoilState } from "recoil";

export default function TextAreaComponent() {
  const [userInput, setUserInput] = useRecoilState(userInputStateAtom);
  const [pressEnter, setPressEnter] = useState(false);

  return (
    <Textarea
      autoFocus
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
      className="absolute bottom-4 w-[50vw] resize-none bg-zinc-200 transition-shadow
duration-300 focus-within:shadow-lg hover:shadow-lg"
    />
  );
}
