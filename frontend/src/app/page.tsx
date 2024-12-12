"use client";

import { ResizableHandle, ResizablePanelGroup } from "@/modules/components/resizable";
import ModelsArea from "@/modules/models";
import { ResizablePanelComponent } from "@/modules/resizable-panel";
import UserInputArea from "@/modules/user-input";

import { useState } from "react";

export default function MainPage() {
  const [userInput, setUserInput] = useState("");
  const [pressEnter, setPressEnter] = useState(false);

  return (
    <main className="absolute flex h-full w-full flex-col justify-center gap-8 p-8">
      <div className="flex h-full justify-between">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanelComponent>
            <UserInputArea
              userInput={userInput}
              setUserInput={setUserInput}
              pressEnter={pressEnter}
              setPressEnter={setPressEnter}
            />
          </ResizablePanelComponent>
          <ResizableHandle />
          <ModelsArea />
        </ResizablePanelGroup>
      </div>
      <div className="flex w-full justify-center"></div>
    </main>
  );
}
