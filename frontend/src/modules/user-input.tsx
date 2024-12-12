"use client";

import { Textarea } from "@/modules/components/textarea";

import { useState } from "react";

export default function UserInputArea() {
  const [userInput, setUserInput] = useState("");
  const [pressEnter, setPressEnter] = useState(false);

  return (
    <>
      <p className="text-right">{userInput}</p>
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
    </>
  );
}
